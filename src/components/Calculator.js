import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Calculator = () => {
  const [amount, setAmount] = useState(5000000);
  const [term, setTerm] = useState(24);
  const [monthly, setMonthly] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Реальная средняя ставка в РК: Номинал 19%
    const rate = 0.19 / 12;
    const pay = amount * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    setMonthly(Math.round(pay));
  }, [amount, term]);

  const handleApply = () => {
    // Передаем выбранные данные на страницу скоринга
    navigate('/apply', { state: { amount, term, monthly } });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto my-10 grid md:grid-cols-5 gap-0 shadow-glass bg-white"
    >
      {/* Левая часть: Ползунки */}
      <div className="md:col-span-3 p-10 md:p-14 border-b md:border-b-0 md:border-r border-slate-100">
        <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Калькулятор займа</h2>
        <div className="mb-12">
            <p className="text-slate-500 text-sm">Официальная ставка Нацбанка РК</p>
            <p className="text-xs font-bold uppercase tracking-widest text-agatai-primary mt-1">Номинальная: 19% | ГЭСВ: от 21.2%*</p>
        </div>

        <div className="space-y-12">
          <div className="relative">
            <div className="flex justify-between items-end mb-4">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Сумма (₸)</label>
              <motion.span key={amount} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-light tracking-tighter">
                {amount.toLocaleString()}
              </motion.span>
            </div>
            <input type="range" min="100000" max="10000000" step="100000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} 
              className="w-full h-[2px] bg-slate-200 appearance-none cursor-pointer accent-agatai-900" />
          </div>

          <div className="relative">
            <div className="flex justify-between items-end mb-4">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Срок (мес.)</label>
              <motion.span key={term} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-light tracking-tighter">
                {term}
              </motion.span>
            </div>
            <input type="range" min="6" max="60" step="6" value={term} onChange={(e) => setTerm(Number(e.target.value))} 
              className="w-full h-[2px] bg-slate-200 appearance-none cursor-pointer accent-agatai-900" />
          </div>
        </div>
      </div>

      {/* Правая часть: Результат */}
      <div className="md:col-span-2 bg-agatai-900 text-white p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-agatai-primary/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Ежемесячный платеж</p>
          <motion.div key={monthly} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-8">
            {monthly.toLocaleString()} ₸
          </motion.div>

          <div className="space-y-4 pt-8 border-t border-slate-800">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Основной долг:</span>
              <span>{amount.toLocaleString()} ₸</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Сумма переплаты:</span>
              <span className="text-agatai-accent">{(monthly * term - amount).toLocaleString()} ₸</span>
            </div>
          </div>
        </div>

        <div>
          <button 
            onClick={handleApply}
            className="w-full mt-10 border border-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-agatai-900 transition-colors duration-300 relative z-10"
          >
            Оформить заявку
          </button>
          <p className="text-[9px] text-slate-500 mt-4 text-center leading-tight">
            *Предельная ГЭСВ по РК составляет 46%. Финальная ставка зависит от кредитной истории.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Calculator;