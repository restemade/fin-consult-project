import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, ShieldCheck, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

const Home = () => {
  const services = [
    { title: 'Аудит и Стратегия', desc: 'Глубокий анализ финансовых потоков вашего бизнеса.', icon: <TrendingUp size={28} strokeWidth={1.5} /> },
    { title: 'Займы до 10 млн ₸', desc: 'Структурирование сделок и одобрение на лучших условиях.', icon: <Briefcase size={28} strokeWidth={1.5} /> },
    { title: 'Безопасность', desc: 'Полное юридическое сопровождение сделок в г. Актау.', icon: <ShieldCheck size={28} strokeWidth={1.5} /> }
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" exit={{ opacity: 0, y: -20 }} className="pb-20">
      <div className="min-h-[60vh] flex flex-col justify-center pt-10">
        <motion.p variants={item} className="text-agatai-primary font-bold tracking-[0.3em] uppercase text-xs mb-6">
          Независимый консалтинг
        </motion.p>
        <motion.h1 variants={item} className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-agatai-900 leading-[1.1] mb-8 max-w-4xl">
          Точность в каждой <br/> <span className="text-slate-400 font-light">финансовой детали</span>
        </motion.h1>
        <motion.div variants={item} className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <p className="text-lg text-slate-500 max-w-lg leading-relaxed border-l-2 border-agatai-primary pl-6">
            Персональный подход к капиталу. Мы помогаем привлекать финансирование и оптимизировать кредитную нагрузку.
          </p>
          <Link to="/calculator" className="flex items-center gap-4 bg-agatai-900 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-agatai-primary transition-colors duration-300 group">
            Рассчитать <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <motion.div variants={container} className="grid md:grid-cols-3 gap-1 mt-20 bg-slate-200 p-[1px]">
        {services.map((srv, i) => (
          <motion.div key={i} variants={item} className="bg-white p-10 hover:shadow-float transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-agatai-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            <div className="text-slate-400 group-hover:text-agatai-primary transition-colors mb-6">{srv.icon}</div>
            <h3 className="text-xl font-bold uppercase tracking-tight mb-4">{srv.title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm">{srv.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Home;