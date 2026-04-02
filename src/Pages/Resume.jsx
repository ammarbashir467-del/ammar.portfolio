import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Printer, ArrowLeft, Terminal, Code2, Briefcase, GraduationCap } from 'lucide-react';

const Resume = () => {
  // 1. CURSOR GLOW STATE
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePrint = () => window.print();
  const handleBack = () => window.history.back();

  const skills = ["JavaScript (ES6+)", "React.js", "Tailwind CSS", "Node.js", "MySQL", "Git", "Bootstrap"];

  return (
    <div className="relative min-h-screen bg-[#030b1e] text-slate-400 font-sans selection:bg-blue-600/30 overflow-x-hidden">
      
      {/* 2. CURSOR GLOW EFFECT */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-50 print:hidden transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.06), transparent 80%)`,
        }}
      />

      {/* BACK BUTTON - Hidden on Print */}
      <nav className="fixed top-28 left-6 md:top-32 md:left-10 z-[60] print:hidden">
        <button 
          onClick={handleBack} 
          style={{ WebkitTapHighlightColor: 'transparent' }} 
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-all group outline-none focus:outline-none focus:ring-0 active:bg-transparent touch-none select-none"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:inline">Back</span>
        </button>
      </nav>

      {/* CV CONTAINER */}
      <div className="relative z-10 max-w-4xl mx-auto pt-40 md:pt-32 pb-20 px-6 md:px-8 print:pt-0">
        
        {/* HEADER */}
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">AMMAR</h1>
          <p className="text-blue-500 text-[10px] font-bold tracking-[0.4em] uppercase mt-2 md:mt-1">Frontend Web Developer</p>
          
          <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-start gap-4 md:gap-6 mt-8 text-[11px] text-slate-500 font-medium border-b border-slate-800 pb-10 print:border-slate-200">
            <span className="flex items-center justify-center gap-2 uppercase tracking-widest">
              <MapPin size={12} className="text-blue-500"/> Sargodha, PK
            </span>
            <span className="flex items-center justify-center gap-2 uppercase tracking-widest break-all">
              <Mail size={12} className="text-blue-500"/> ammarbashir467@gmail.com
            </span>
          </div>
        </header>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-20">
          
          {/* LEFT COLUMN */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="flex items-center gap-3 text-white text-[11px] font-black uppercase tracking-[0.3em] mb-8 opacity-80">
                <Briefcase size={14} className="text-blue-500" /> Experience
              </h2>
              <div className="space-y-10 pl-5 border-l border-slate-800 print:border-slate-200">
                <div className="relative">
                  <div className="flex flex-col sm:flex-row justify-between items-baseline mb-2 gap-1">
                    <h3 className="text-sm font-bold text-slate-200">Frontend Developer</h3>
                    <span className="text-[9px] font-mono text-slate-600 uppercase tracking-tighter">2025 - Present</span>
                  </div>
                  <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mb-4 italic">JavaScript & React Ecosystem</p>
                  <ul className="text-[11px] space-y-3 leading-relaxed text-slate-500">
                    <li className="flex gap-2"><span>•</span> Advanced UI logic with <span className="text-slate-300 font-medium">JavaScript (ES6+)</span> and React.</li>
                    <li className="flex gap-2"><span>•</span> Developing responsive, lightweight designs using <span className="text-slate-300 font-medium">Tailwind CSS</span>.</li>
                    <li className="flex gap-2"><span>•</span> Full-stack capability with <span className="text-slate-300 font-medium">Node.js and MySQL</span>.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="flex items-center gap-3 text-white text-[11px] font-black uppercase tracking-[0.3em] mb-8 opacity-80">
                <GraduationCap size={14} className="text-blue-500" /> Education
              </h2>
              <div className="pl-5 border-l border-slate-800 print:border-slate-200">
                <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Intermediate in CS (ICS)</h3>
                <p className="text-[10px] text-slate-600 font-bold mt-1 uppercase tracking-widest">Graduated 2026 • Sargodha, Pakistan</p>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-12">
            <section>
              <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-2 opacity-80">
                <Terminal size={14} className="text-blue-500" /> Technical
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-[#040d26] border border-slate-800 text-[9px] text-slate-400 font-bold uppercase tracking-tighter print:border-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div>
                <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-3 flex items-center gap-2 opacity-80">
                  <Code2 size={14} className="text-blue-500" /> Context
                </h3>
                <p className="text-[10px] leading-relaxed italic text-slate-500 uppercase tracking-tight">
                  Analytical mindset from competitive gaming. Expert in persistence-based <span className="text-slate-300 font-medium">problem solving</span>.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* PRINT BUTTON */}
        <div className="flex justify-center pt-8 pb-12 border-t border-slate-900 print:hidden">
          <button 
            onClick={handlePrint}
            style={{ WebkitTapHighlightColor: 'transparent' }}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-blue-500 transition-all group outline-none focus:outline-none"
          >
            <Printer size={16} className="group-hover:scale-110 transition-transform" />
            <span>Export to PDF</span>
          </button>
        </div>

        {/* FOOTER */}
        <footer className="text-center text-[9px] uppercase tracking-[0.6em] text-slate-800">
          AMMAR &copy; 2026 • PORTFOLIO CV
        </footer>
      </div>

      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          nav, .print\\:hidden { display: none !important; }
          .text-white, .text-slate-200, .text-slate-400, .text-slate-500, .text-slate-600 { color: black !important; }
          .text-blue-500 { color: #2563eb !important; }
          .border-slate-800, .border-slate-900 { border-color: #eee !important; }
          @page { margin: 1cm; }
          .pt-40, .pt-32 { pt: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default Resume;