import React from 'react';
import { motion } from 'framer-motion';

const Contacts = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-10">
    <div className="grid md:grid-cols-2 gap-0 shadow-glass bg-white max-w-5xl mx-auto">
      <div className="p-12 md:p-20 flex flex-col justify-center">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Связь с нами</h1>
        <div className="space-y-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Локация</p>
            <p className="text-lg font-medium text-agatai-900">г. Актау, 14 мкр, БЦ "Звезда"</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Телефон</p>
            <p className="text-2xl font-light tracking-tight text-agatai-900">+7 (707) 100 20 30</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">E-mail</p>
            <p className="text-lg font-medium text-agatai-900">office@agatai.kz</p>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-100 min-h-[400px] flex items-center justify-center relative border-l border-slate-200">
        <div className="text-center">
          <div className="w-16 h-16 border border-slate-300 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-2 h-2 bg-agatai-primary rounded-full"></div>
          </div>
          <span className="font-bold text-slate-400 uppercase tracking-widest text-xs">Интеграция карты API</span>
        </div>
      </div>
    </div>
  </motion.div>
);

export default Contacts;