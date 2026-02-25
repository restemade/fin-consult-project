import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import Calculator from './components/Calculator';
import Auth from './components/Auth';
import Apply from './pages/Apply';

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/apply" element={<Apply />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  // Инициализация Telegram Mini App
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready(); // Сообщаем Telegram, что приложение загрузилось
      tg.expand(); // Разворачиваем на весь экран телефона
      
      // Можно даже покрасить шапку Telegram в цвет нашего бренда!
      tg.setHeaderColor('#ffffff'); 
    }
  }, []);

  // Скрываем Navbar, если сайт открыт внутри Telegram (там своя навигация)
  const isTelegram = window.Telegram?.WebApp?.initData !== '';

  return (
    <Router>
      <div className="min-h-screen bg-[#F8FAFC] text-agatai-900 font-sans selection:bg-agatai-primary selection:text-white">
        {!isTelegram && <Navbar />} {/* В Telegram верхнее меню не нужно */}
        <main className={`max-w-7xl mx-auto px-6 pb-24 ${isTelegram ? 'pt-4' : 'pt-10'}`}>
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;