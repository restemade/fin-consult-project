import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowLeft, ShieldCheck, AlertTriangle, Fingerprint, Activity } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Apply = () => {
  const location = useLocation();
  const { amount = 5000000, term = 24 } = location.state || {};
  
  const [iin, setIin] = useState('');
  const [status, setStatus] = useState('input'); // input -> scoring -> results

  // Ультра-надежные аватарки банков в их фирменных цветах
  const banks = [
    { 
      name: 'Halyk Bank', 
      prob: 94, 
      color: 'bg-[#007a5a]', 
      logo: 'https://ui-avatars.com/api/?name=Halyk+Bank&background=007a5a&color=fff&bold=true&font-size=0.4'
    },
    { 
      name: 'Kaspi Bank', 
      prob: 88, 
      color: 'bg-[#f14635]', 
      logo: 'https://ui-avatars.com/api/?name=Kaspi+Bank&background=f14635&color=fff&bold=true&font-size=0.4'
    },
    { 
      name: 'ForteBank', 
      prob: 82, 
      color: 'bg-[#962364]', 
      logo: 'https://ui-avatars.com/api/?name=Forte+Bank&background=962364&color=fff&bold=true&font-size=0.4'
    },
    { 
      name: 'CenterCredit', 
      prob: 65, 
      color: 'bg-[#f5a623]', 
      logo: 'https://ui-avatars.com/api/?name=Center+Credit&background=f5a623&color=fff&bold=true&font-size=0.4'
    },
    { 
      name: 'Jusan Bank', 
      prob: 25, 
      color: 'bg-[#ff5a00]', 
      logo: 'https://ui-avatars.com/api/?name=Jusan+Bank&background=ff5a00&color=fff&bold=true&font-size=0.4'
    },
    { 
      name: 'Евразийский', 
      prob: 15, 
      color: 'bg-[#2d2d2d]', 
      logo: 'https://ui-avatars.com/api/?name=Eurasian+Bank&background=2d2d2d&color=fff&bold=true&font-size=0.4'
    },
  ];

  const handleStartScoring = () => {
    if (iin.length !== 12) return;
    setStatus('scoring');
    setTimeout(() => {
      setStatus('results');
    }, 3500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto my-10 px-4 md:px-0">
      
      <Link to="/calculator" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-agatai-900 transition-colors mb-8">
        <ArrowLeft size={16} /> Назад к калькулятору
      </Link>

      <div className="bg-white p-8 md:p-12 shadow-glass border border-slate-100 rounded-3xl relative overflow-hidden">
        
        <div className="flex justify-between items-center pb-8 border-b border-slate-100 mb-8 relative z-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Сумма займа</p>
            <p className="text-2xl font-black tracking-tight text-agatai-900">{amount.toLocaleString()} ₸</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Срок</p>
            <p className="text-2xl font-black tracking-tight text-agatai-900">{term} мес.</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          
          {status === 'input' && (
            <motion.div key="input" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-slate-50 text-agatai-primary rounded-2xl shadow-sm"><Fingerprint size={32} strokeWidth={1.5} /></div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-agatai-900">Идентификация</h2>
                  <p className="text-sm text-slate-500">Введите ИИН для запуска скоринга</p>
                </div>
              </div>

              <div className="mt-10 relative">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2 ml-1">Индивидуальный номер (ИИН)</label>
                <input 
                  type="text" 
                  maxLength="12"
                  value={iin}
                  onChange={(e) => setIin(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 text-3xl font-light tracking-[0.15em] focus:outline-none focus:border-agatai-primary focus:bg-white transition-all placeholder:text-slate-300 text-agatai-900"
                  placeholder="000000000000"
                />
                {iin.length === 12 && <ShieldCheck className="absolute right-6 top-[42px] text-emerald-500" size={24} />}
              </div>

              <button 
                onClick={handleStartScoring}
                disabled={iin.length !== 12}
                className="w-full mt-10 bg-agatai-900 text-white py-5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-agatai-primary hover:shadow-float transition-all disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none active:scale-[0.98]"
              >
                Запустить проверку
              </button>
            </motion.div>
          )}

          {status === 'scoring' && (
            <motion.div key="scoring" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-24 flex flex-col items-center justify-center text-center relative z-10">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="mb-8 relative">
                <div className="absolute inset-0 bg-agatai-primary/20 blur-xl rounded-full"></div>
                <Loader2 size={56} className="text-agatai-primary relative z-10" strokeWidth={1.5} />
              </motion.div>
              <h3 className="text-xl font-black uppercase tracking-tight text-agatai-900 mb-2">Анализ профиля</h3>
              <p className="text-slate-500 text-sm">Связываемся с базами данных банков...</p>
            </motion.div>
          )}

          {status === 'results' && (
            <motion.div key="results" initial="hidden" animate="show" variants={containerVariants} className="relative z-10">
              <div className="flex items-start gap-4 mb-10">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl shadow-sm"><Activity size={32} strokeWidth={1.5} /></div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-agatai-900">Результат</h2>
                  <p className="text-sm text-slate-500">Вероятность одобрения по ИИН {iin}</p>
                </div>
              </div>

              <div className="space-y-8 mb-12">
                {banks.map((bank, i) => (
                  <motion.div key={i} variants={itemVariants} className="relative group">
                    <div className="flex justify-between items-center mb-3 relative z-10">
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white p-2 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center group-hover:border-slate-300 transition-colors">
                          <img 
                            src={bank.logo} 
                            alt={bank.name} 
                            className="w-full h-full object-contain rounded-lg shadow-sm" 
                          />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest text-agatai-900">{bank.name}</span>
                      </div>

                      <span className={`text-2xl font-black tracking-tight ${bank.prob > 50 ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {bank.prob}%
                      </span>
                    </div>

                    <div className="w-full h-3 bg-slate-100 rounded-full relative overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${bank.prob}%` }} 
                        transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.3 + 0.5 }}
                        className={`absolute top-0 left-0 h-full rounded-full ${bank.color} shadow-sm`} 
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="p-8 bg-agatai-900 text-white rounded-3xl relative overflow-hidden shadow-float">
                <div className="absolute top-0 right-0 w-64 h-64 bg-agatai-primary blur-[100px] rounded-full opacity-40 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4 text-amber-400">
                    <AlertTriangle size={24} strokeWidth={1.5} />
                    <span className="text-xs font-bold uppercase tracking-widest">Важно к прочтению</span>
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight mb-3 leading-none">Повысьте шансы до 99%</h4>
                  <p className="text-slate-300 text-sm mb-8 leading-relaxed max-w-md">
                    Прямая подача заявок в банки с низким скорингом (красная зона) приведет к отказам и ухудшит кредитную историю. Брокеры <span className="text-white font-bold">Agatai Finance</span> знают внутренние регламенты банков и помогут получить одобрение.
                  </p>
                  <button className="bg-white text-agatai-900 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-agatai-primary hover:text-white transition-all hover:shadow-lg active:scale-[0.98] w-full sm:w-auto">
                    Связаться с брокером
                  </button>
                </div>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-agatai-primary/0 via-agatai-primary/10 to-agatai-primary/0 pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

export default Apply;