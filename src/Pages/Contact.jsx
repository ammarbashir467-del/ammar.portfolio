import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { Send, Linkedin, Instagram, Facebook, Globe, Award, Music } from 'lucide-react';

const StarField = () => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 }));
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3}>
        <PointMaterial transparent color="#a3c4f7" size={0.003} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
};

const Contact = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('userMessages') || '[]');
    const newMessage = { ...formData, id: Date.now(), date: new Date().toISOString() };
    localStorage.setItem('userMessages', JSON.stringify([...existing, newMessage]));
    setStatus('SENT ✅');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setStatus(''), 3000);
  };

  const socials = [
    { icon: <Linkedin size={16}/>, link: "https://www.linkedin.com/in/amar-bashir-976b953a9/", color: "hover:text-[#0077b5]" },
    { icon: <Instagram size={16}/>, link: "https://www.instagram.com/webb.developerr/", color: "hover:text-[#e1306c]" },
    { icon: <Music size={16}/>, link: "https://www.tiktok.com/@webb.developerr", color: "hover:text-[#ff0050]" },
    { icon: <Facebook size={16}/>, link: "https://www.facebook.com/profile.php?id=61587797823351/", color: "hover:text-[#1877f2]" },
    { icon: <Globe size={16}/>, link: "https://www.upwork.com/freelancers/~0111c232fe5f458dcc", color: "hover:text-[#14a800]" },
    { icon: <Award size={16}/>, link: "https://www.fiverr.com/ammarahmad321", color: "hover:text-[#1dbf73]" },
  ];

  return (
    <div className="relative min-h-screen bg-[#030b1e] text-slate-400 selection:bg-blue-500/30 overflow-hidden font-sans flex flex-col items-center justify-center p-4">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}><StarField /></Suspense>
        </Canvas>
      </div>

      <div className="pointer-events-none fixed inset-0 z-10"
        style={{ background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.08), transparent 80%)` }}
      />

      <div className="relative z-20 w-full max-w-md text-center space-y-4 mt-12 md:mt-16">
        
        <div className="space-y-1">
          <h1 className="text-xl md:text-3xl font-black text-white tracking-tighter uppercase">
            HAVE A <span className="text-blue-500">PROJECT?</span>
          </h1>
          <p className="text-[8px] font-bold tracking-[0.4em] text-slate-700 uppercase">Let's build the future</p>
        </div>

        <div className="bg-slate-900/10 border border-slate-800/40 rounded-[1.2rem] backdrop-blur-2xl p-5 md:p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input required type="text" placeholder="NAME" value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#030b1e]/60 border border-slate-800 rounded-lg px-3 py-2.5 text-[9px] font-bold focus:border-blue-500/40 outline-none text-white placeholder:text-slate-800" />
              
              <input required type="email" placeholder="EMAIL" value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-[#030b1e]/60 border border-slate-800 rounded-lg px-3 py-2.5 text-[9px] font-bold focus:border-blue-500/40 outline-none text-white placeholder:text-slate-800" />
            </div>
            
            <textarea required rows="2" placeholder="MESSAGE" value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full bg-[#030b1e]/60 border border-slate-800 rounded-lg px-3 py-2.5 text-[9px] font-bold focus:border-blue-500/40 outline-none resize-none text-white placeholder:text-slate-800" />

            <button type="submit" 
              className="w-full py-2.5 bg-white hover:bg-blue-600 text-black hover:text-white font-black text-[8px] tracking-[0.4em] rounded-lg transition-all active:scale-[0.97] flex items-center justify-center gap-2">
              {status || 'TRANSMIT'} <Send size={10} />
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-800/30">
            <div className="flex justify-center gap-2">
              {socials.map((s, i) => (
                <a key={i} href={s.link} target="_blank" rel="noreferrer" 
                   className={`w-8 h-8 flex items-center justify-center rounded-lg bg-slate-900/40 border border-slate-800 transition-all duration-300 ${s.color}`}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="text-[6px] uppercase tracking-[1.2em] text-slate-800">Sargodha • Punjab • Ammar</p>
      </div>
    </div>
  );
};

export default Contact;