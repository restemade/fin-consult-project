import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const links = [
    { name: 'О нас', path: '/' },
    { name: 'Калькулятор', path: '/calculator' },
    { name: 'Контакты', path: '/contacts' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="font-black text-2xl tracking-tighter uppercase text-agatai-900"
          >
            Agatai <span className="text-agatai-primary font-light">Finance</span>
          </motion.div>
        </Link>
        
        <div className="hidden md:flex items-center gap-10">
          {links.map((link, i) => (
            <motion.div key={link.path} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link 
                to={link.path} 
                className={`text-xs font-bold uppercase tracking-[0.15em] relative group ${location.pathname === link.path ? 'text-agatai-primary' : 'text-slate-500 hover:text-agatai-900 transition-colors'}`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 h-[2px] bg-agatai-primary transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            </motion.div>
          ))}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
            <Link to="/auth" className="text-xs font-bold uppercase tracking-[0.15em] border border-slate-300 px-6 py-3 hover:bg-agatai-900 hover:text-white hover:border-agatai-900 transition-all duration-300">
              Кабинет
            </Link>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;