import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'О нас', path: '/' },
    { name: 'Калькулятор', path: '/calculator' },
    { name: 'Контакты', path: '/contacts' },
  ];

  // Закрываем мобильное меню при переходе на другую страницу
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Блокируем скролл страницы, когда открыто мобильное меню
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* Логотип */}
          <Link to="/" className="flex items-center gap-2 z-50">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="font-black text-2xl tracking-tighter uppercase text-agatai-900"
            >
              Agatai <span className="text-agatai-primary font-light">Finance</span>
            </motion.div>
          </Link>
          
          {/* Десктопное меню */}
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

          {/* Кнопка "Бургер" для мобильных */}
          <div className="md:hidden flex items-center z-50">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-agatai-900 focus:outline-none p-2"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Мобильное выпадающее меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-20 bg-white/95 backdrop-blur-3xl z-40 md:hidden flex flex-col items-center justify-start pt-20 gap-8 border-t border-slate-100"
          >
            {links.map((link, i) => (
              <motion.div 
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  to={link.path} 
                  className={`text-lg font-black uppercase tracking-[0.2em] ${location.pathname === link.path ? 'text-agatai-primary' : 'text-agatai-900'}`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Link 
                to="/auth" 
                className="text-sm font-bold uppercase tracking-[0.15em] bg-agatai-900 text-white px-10 py-4 hover:bg-agatai-primary transition-colors duration-300"
              >
                Личный кабинет
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
