import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

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
        <PointMaterial 
          transparent 
          color="#a3c4f7" 
          size={0.003} 
          sizeAttenuation={true} 
          depthWrite={false} 
        />
      </Points>
    </group>
  );
};

const Home = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030b1e] text-white selection:bg-blue-600/30 overflow-hidden font-sans flex items-center justify-center">
      
      {/* MOUSE GLOW LAYER */}
      <div 
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.08), transparent 80%)`,
        }}
      />

      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <StarField />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center w-full px-4 text-center pb-5 md:pt-20">
        
        {/* HEADER SECTION */}
        <div className="relative flex flex-col items-center justify-center w-full py-10 overflow-visible">
          
          {/* WATERMARK - Adjusted gradient and translate to match mobile with desktop effect */}
          <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[78%] md:-translate-y-[75%] text-[17vw] md:text-[12vw] font-black tracking-tighter leading-none uppercase select-none z-0 pointer-events-none bg-gradient-to-b from-blue-300/[0.12] via-blue-500/[0.10] to-transparent bg-clip-text text-transparent whitespace-nowrap">
            DEVELOPER
          </h2>

          <h1 className="relative text-4xl md:text-6xl font-extrabold uppercase tracking-tight z-10 select-none">
            HI, I'M <span className="text-[#3b82f6] drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]">AMMAR</span>
          </h1>
        </div>

        {/* SUBTITLE SECTION */}
        <div className="flex items-center gap-3 md:gap-6 mb-5 w-full max-w-[95%] sm:max-w-2xl justify-center">
          <div className="flex-1 h-[1px] bg-gradient-to-l from-blue-500 to-transparent shadow-[0_0_12px_rgba(59,130,246,0.8)] blur-[0.5px]"></div>
          <p className="text-[10px] md:text-xs font-semibold md:font-medium uppercase tracking-[0.2em] md:tracking-[0.4em] text-slate-300 whitespace-nowrap">
            FULL STACK DEVELOPER
          </p>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-blue-500 to-transparent shadow-[0_0_12px_rgba(59,130,246,0.8)] blur-[0.5px]"></div>
        </div>

        {/* DESCRIPTION SECTION */}
        <div className="text-slate-400 text-[11px] md:text-sm mb-7 leading-relaxed font-normal mx-auto">
          <p className="md:hidden">
            With <span className="text-white font-bold">1 year of professional experience</span>, I craft <br />
            high-performance web applications, specializing <br />
            in clean frontend and scalable backend logic.
          </p>
          
          <p className="hidden md:block max-w-xl">
            With <span className="text-white font-bold">1 year of professional experience</span>, I craft high-performance <br />
            web applications, specializing in clean frontend and scalable backend logic.
          </p>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
          <button 
            onClick={() => window.location.href = '/projects'}
            className="w-36 lg:w-44 px-6 md:px-10 py-3 bg-[#3b82f6] text-white text-[9px] md:text-xs font-black uppercase tracking-widest rounded-full hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.6)] transform hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            VIEW PROJECTS
          </button>
          
          <button 
            onClick={() => window.location.href = '/contact'}
            className="w-28 sm:w-auto px-6 md:px-10 py-3 bg-transparent border border-slate-600 text-white text-[9px] md:text-xs font-black uppercase tracking-widest rounded-full hover:border-white transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            HIRE ME
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;