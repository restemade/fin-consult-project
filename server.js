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

const userSessions = {};
const SYSTEM_PROMPT = `Ты — Agatai AI, виртуальный финансовый консультант премиального брокерского сервиса "Agatai Finance" в Казахстане. ТВОЯ ЦЕЛЬ: Первичная консультация клиента. ПРАВИЛА: 1. Ты брокер на стороне клиента. 2. Тон деловой, экспертный. 3. Никогда не обещай 100% одобрения и не называй точные ставки. 4. Оперируй реалиями РК (ПКБ, ГЭСВ). 5. Возвращай к теме кредитования, если клиент отвлекся. Твоя задача — собрать анамнез (просрочки, доходы) и передать брокеру для финального оформления.`;

// API Endpoint для приема заявок с сайта
app.post('/api/lead', async (req, res) => {
  try {
    const { iin, amount, term, tgUserId, tgUsername } = req.body;

    const adminMsg = `🚨 <b>НОВАЯ ЗАЯВКА (Mini App)</b> 🚨\n\n👤 <b>Клиент:</b> @${tgUsername || 'Скрыт'} (ID: ${tgUserId})\n🪪 <b>ИИН:</b> <code>${iin}</code>\n💰 <b>Сумма:</b> ${amount.toLocaleString('ru-RU')} ₸ на ${term} мес.\n🤖 <i>ИИ-агент начал первичный опрос.</i>`;
    await bot.telegram.sendMessage(ADMIN_CHAT_ID, adminMsg, { parse_mode: 'HTML' });

    if (tgUserId) {
        const initialMessage = `Здравствуйте! Я виртуальный ассистент Agatai Finance. Вижу вашу заявку по ИИН ${iin} на сумму ${amount.toLocaleString()} ₸. Предварительный анализ показывает, что прямая подача заявок может снизить ваш рейтинг. Моя задача — подготовить профиль для брокера. Скажите, есть ли у вас действующие кредиты или просрочки?`;
        await bot.telegram.sendMessage(tgUserId, initialMessage);
        userSessions[tgUserId] = [
            { role: "user", parts: [{ text: `Привет. Я оставил заявку на кредит. Мой ИИН: ${iin}, сумма: ${amount}` }] },
            { role: "model", parts: [{ text: initialMessage }] }
        ];
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Ошибка создания лида:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Обработка диалогов с ИИ в Telegram
bot.on('text', async (ctx) => {
    const userId = ctx.from.id;
    const text = ctx.message.text;

    if (userId.toString() === ADMIN_CHAT_ID) return;
    if (!userSessions[userId]) userSessions[userId] = [];

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: SYSTEM_PROMPT });
        const chat = model.startChat({ history: userSessions[userId] });
        const result = await chat.sendMessage(text);
        const responseText = result.response.text();

        userSessions[userId].push({ role: "user", parts: [{ text }] });
        userSessions[userId].push({ role: "model", parts: [{ text: responseText }] });
        await ctx.reply(responseText);
    } catch (error) {
        console.error("Gemini AI Error:", error);
        await ctx.reply("Прошу прощения, система анализирует данные. Живой брокер скоро подключится к диалогу.");
    }
});

// === РАЗДАЧА REACT-САЙТА (FULL-STACK МАГИЯ) ===
// Сервер отдает папку build, которую создает React
app.use(express.static(path.join(__dirname, 'build')));

// Все остальные пути, не относящиеся к API, отдаются React-роутеру
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

bot.launch();
app.listen(port, () => console.log(`🚀 Full-Stack сервер Agatai Finance запущен на порту ${port}`));

process.once('SIGINT', () => bot.stop('SIGINT'));

process.once('SIGTERM', () => bot.stop('SIGTERM'));
