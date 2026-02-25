import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import Calculator from './components/Calculator';
import Auth from './components/Auth';
import Apply from './pages/Apply'; // Импортируем новую страницу

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/apply" element={<Apply />} /> {/* Добавленный маршрут */}
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F8FAFC] text-agatai-900 font-sans selection:bg-agatai-primary selection:text-white">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 pt-10 pb-24 min-h-[calc(100vh-80px)]">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;