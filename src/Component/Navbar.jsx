import React, { useState, useEffect } from 'react'; 
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isOpen, setIsOpen }) => { 
  const location = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { id: 1, name: 'Home', path: '/' },
    { id: 2, name: 'Projects', path: '/projects' },
    { id: 3, name: 'About', path: '/about' },
    { id: 4, name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-8 w-full flex justify-center z-[100] px-4">
      {/* 1. BACKDROP BLUR OVERLAY (Mirror Effect) */}
      {/* Jab menu open hoga, ye div poori screen par blur apply kar degi */}
      <div 
        className={`fixed inset-0 min-h-screen w-screen transition-all duration-500 ease-in-out lg:hidden
          ${isOpen ? 'bg-black/20 backdrop-blur-md visible opacity-100' : 'invisible opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)} // Khali jagah par click karne se menu band ho jaye
      ></div>

      <style>
        {`
          @keyframes firstPulse {
            0%, 100% { opacity: 0.8; transform: scaleX(1); }
            50% { opacity: 1; transform: scaleX(1.15); }
          }
          .animate-first-pulse {
            animation: firstPulse 2s ease-in-out infinite;
          }
        `}
      </style>

      <nav className={`relative flex items-center h-16 bg-slate-900 border border-slate-800 rounded-full px-8 transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] 
        ${isOpen || isInitialLoad ? 'w-full rounded-2xl' : 'w-full lg:w-1/2 lg:hover:w-full'} 
        shadow-2xl cursor-pointer group justify-between lg:justify-center`}
      >
        
        {/* LOGO SECTION */}
        <div className="lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center lg:pointer-events-none flex items-center">
          <div className="relative flex items-center justify-center gap-6"> 
            <div className={`hidden lg:block w-24 transition-all duration-500 pointer-events-none animate-first-pulse
              ${(isOpen || isInitialLoad) ? 'opacity-0 scale-x-0' : 'opacity-100 group-hover:opacity-0 group-hover:scale-x-0'}
            `}>
              <div className="h-[1px] w-full bg-gradient-to-l from-blue-500 to-transparent shadow-[0_0_12px_rgba(59,130,246,0.8)] blur-[0.5px]"></div>
            </div>

            <Link to="/" className="pointer-events-auto flex items-center justify-center">
              <span className={`text-xl font-bold tracking-tighter text-white transition-all duration-700 ease-in-out
                ${(isOpen || isInitialLoad) ? 'lg:-translate-x-[42vw] text-blue-500' : 'lg:group-hover:-translate-x-[42vw] lg:group-hover:text-blue-500'}
              `}>
                AMMAR
              </span>
            </Link>

            <div className={`hidden lg:block w-24 transition-all duration-500 pointer-events-none animate-first-pulse
              ${(isOpen || isInitialLoad) ? 'opacity-0 scale-x-0' : 'opacity-100 group-hover:opacity-0 group-hover:scale-x-0'}
            `}>
              <div className="h-[1px] w-full bg-gradient-to-r from-blue-500 to-transparent shadow-[0_0_12px_rgba(59,130,246,0.8)] blur-[0.5px]"></div>
            </div>
          </div>
        </div>

        {/* DESKTOP NAV LINKS */}
        <div className={`hidden lg:flex flex-1 justify-center items-center transition-all duration-500 delay-200
          ${(isOpen || isInitialLoad) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
        `}>
          <ul className="flex items-center gap-12">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.id} className="relative group/item px-4 py-2 flex items-center justify-center">
                  <div className={`absolute inset-0 bg-blue-500/30 blur-2xl rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(59,130,246,0.4)] pointer-events-none
                    ${isActive ? 'opacity-100 scale-125' : 'opacity-0 group-hover/item:opacity-100 scale-100 group-hover/item:scale-125'}`}>
                  </div>
                  <Link to={item.path} className={`relative z-10 font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover/item:text-white'}`}>
                    {item.name}
                  </Link>
                  <span className={`absolute bottom-0 left-0 h-[0.5px] bg-blue-500 transition-all duration-300 shadow-[0_0_10px_#3b82f6,0_0_20px_#3b82f6] ${isActive ? 'w-full' : 'w-0 group-hover/item:w-full'}`}></span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* MOBILE BUTTON */}
        <button 
          onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} 
          className="lg:hidden z-[110] flex flex-col gap-1.5 p-2"
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* MOBILE MENU DROPDOWN */}
        <div className={`lg:hidden absolute top-[75px] left-0 w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-8 transition-all duration-500 shadow-2xl z-[105] backdrop-blur-xl
          ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-5 invisible'}`}
        >
          <ul className="flex flex-col gap-8 items-center">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.id} onClick={() => setIsOpen(false)} className="relative flex items-center justify-center px-6 py-2">
                  <div className={`absolute inset-0 bg-blue-500/30 blur-2xl rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(59,130,246,0.4)] pointer-events-none
                    ${isActive ? 'opacity-100 scale-125' : 'opacity-0'}`}>
                  </div>
                  <Link to={item.path} className={`relative z-10 font-medium text-xs tracking-[0.2em] uppercase transition-all duration-300 
                    ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {item.name}
                  </Link>
                  <span className={`absolute bottom-0 left-0 h-[0.5px] bg-blue-500 transition-all duration-300 shadow-[0_0_10px_#3b82f6,0_0_20px_#3b82f6] 
                    ${isActive ? 'w-full' : 'w-0'}`}></span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Balance Line */}
        <div className={`hidden lg:block w-20 transition-opacity duration-700
          ${(isOpen || isInitialLoad) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
        `}>
          <div className="h-[1px] w-full bg-gradient-to-r from-blue-500 to-transparent shadow-[0_0_10px_#3b82f6]"></div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;