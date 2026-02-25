import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-sm bg-white p-12 shadow-glass border border-slate-100">
        <div className="mb-10">
          <h2 className="text-2xl font-black uppercase tracking-tight text-agatai-900">
            {isLogin ? 'Авторизация' : 'Регистрация'}
          </h2>
          <p className="text-xs text-slate-400 uppercase tracking-widest mt-2">Клиентский портал</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.form key={isLogin ? 'login' : 'register'} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Имя</label>
                <input type="text" className="w-full border-b border-slate-300 py-2 px-0 focus:outline-none focus:border-agatai-900 transition-colors text-sm font-medium" placeholder="Dnmhmmed" />
              </div>
            )}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">E-mail</label>
              <input type="email" className="w-full border-b border-slate-300 py-2 px-0 focus:outline-none focus:border-agatai-900 transition-colors text-sm font-medium" placeholder="mail@example.com" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Пароль</label>
              <input type="password" className="w-full border-b border-slate-300 py-2 px-0 focus:outline-none focus:border-agatai-900 transition-colors text-sm font-medium" placeholder="••••••••" />
            </div>
            
            <button type="button" className="w-full bg-agatai-900 text-white py-4 mt-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-agatai-primary transition-colors">
              {isLogin ? 'Войти' : 'Создать'}
            </button>
          </motion.form>
        </AnimatePresence>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-agatai-900 transition-colors">
            {isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт? Войти'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Auth;