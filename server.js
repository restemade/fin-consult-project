require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Telegraf } = require('telegraf');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5000;

// Инициализация API
const bot = new Telegraf(process.env.BOT_TOKEN);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;

app.use(cors());
app.use(express.json());

// Временное хранилище сессий и статуса ИИ
const userSessions = {}; 
const aiPaused = {};     

const SYSTEM_PROMPT = `Ты — Agatai AI, виртуальный финансовый консультант премиального брокерского сервиса "Agatai Finance" в Казахстане. ТВОЯ ЦЕЛЬ: Первичная консультация клиента. ПРАВИЛА: 1. Ты брокер на стороне клиента. 2. Тон деловой, экспертный. 3. Никогда не обещай 100% одобрения и не называй точные ставки. 4. Оперируй реалиями РК (ПКБ, ГЭСВ). 5. Возвращай к теме кредитования, если клиент отвлекся. Твоя задача — собрать анамнез (просрочки, доходы) и передать старшему брокеру Аслану для финального оформления.`;

// API для приема лидов
app.post('/api/lead', async (req, res) => {
  try {
    const { iin, amount, term, tgUserId, tgUsername } = req.body;

    const adminMsg = `🚨 <b>НОВАЯ ЗАЯВКА (Mini App)</b> 🚨\n\n👤 Клиент: @${tgUsername || 'Скрыт'} [ID:${tgUserId || 'нет'}]\n🪪 ИИН: <code>${iin}</code>\n💰 Сумма: ${amount.toLocaleString('ru-RU')} ₸ на ${term} мес.`;
    
    if (tgUserId) {
        aiPaused[tgUserId] = false; 
        await bot.telegram.sendMessage(ADMIN_CHAT_ID, adminMsg + '\n\n🤖 <i>ИИ-агент Аслана запущен.</i>', { 
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [[{ text: '🛑 Отключить ИИ и войти в чат', callback_data: `takeover_${tgUserId}` }]]
            }
        });

        const initialMessage = `Здравствуйте! Я виртуальный ассистент Agatai Finance. Вижу вашу заявку по ИИН ${iin} на сумму ${amount.toLocaleString()} ₸. Предварительный анализ показывает, что прямая подача заявок может снизить ваш рейтинг. Скажите, есть ли у вас действующие кредиты или просрочки?`;
        await bot.telegram.sendMessage(tgUserId, initialMessage);
        
        userSessions[tgUserId] = [
            { role: "user", parts: [{ text: `Мой ИИН: ${iin}, сумма: ${amount}` }] },
            { role: "model", parts: [{ text: initialMessage }] }
        ];
    } else {
        await bot.telegram.sendMessage(ADMIN_CHAT_ID, adminMsg, { parse_mode: 'HTML' });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Lead Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Перехват управления Асланом
bot.action(/takeover_(\d+)/, async (ctx) => {
    const clientId = ctx.match[1];
    aiPaused[clientId] = true; 
    await bot.telegram.sendMessage(clientId, "👤 <i>К диалогу подключился старший брокер Аслан.</i>", { parse_mode: 'HTML' });
    await ctx.answerCbQuery("ИИ отключен!");
    await ctx.reply(`✅ Вы вошли в чат с клиентом [ID:${clientId}]. Отвечайте через Reply.`);
});

// Чат-логика
bot.on('text', async (ctx) => {
    const userId = ctx.from.id;
    const text = ctx.message.text;

    if (userId.toString() === ADMIN_CHAT_ID) {
        if (ctx.message.reply_to_message && ctx.message.reply_to_message.text) {
            const match = ctx.message.reply_to_message.text.match(/\[ID:(\d+)\]/);
            if (match && match[1]) {
                await bot.telegram.sendMessage(match[1], `💼 **Старший брокер Аслан:**\n${text}`, { parse_mode: 'Markdown' });
            }
        }
        return; 
    }

    await bot.telegram.sendMessage(ADMIN_CHAT_ID, `💬 Клиент [ID:${userId}]:\n\n${text}`);

    if (aiPaused[userId]) return; 

    if (!userSessions[userId]) userSessions[userId] = [];

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: SYSTEM_PROMPT });
        const chat = model.startChat({ history: userSessions[userId] });
        const result = await chat.sendMessage(text);
        const responseText = result.response.text();

        userSessions[userId].push({ role: "user", parts: [{ text }] });
        userSessions[userId].push({ role: "model", parts: [{ text: responseText }] });
        
        await ctx.reply(responseText);
        await bot.telegram.sendMessage(ADMIN_CHAT_ID, `🤖 ИИ ответил:\n\n${responseText}`);
    } catch (error) {
        console.error("Gemini Error:", error);
        await ctx.reply("Секунду, сверяю данные с базами банков...");
    }
});

// Раздача статики React
app.use(express.static(path.join(__dirname, 'build')));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

bot.launch();
app.listen(port, () => console.log(`🚀 Сервер запущен на порту ${port}`));
