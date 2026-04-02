import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate import kiya

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

const About = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate(); // 2. Navigate hook initialize kiya

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#030b1e] text-white selection:bg-blue-600/30 overflow-hidden font-sans px-6 flex flex-col justify-center items-center">
      
      <div 
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.08), transparent 80%)`,
        }}
      />

      <div className="absolute inset-0 z-0 overflow-hidden">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <StarField />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center md:justify-between max-w-4xl w-full text-center h-auto md:h-[80vh] py-4 md:py-10 transform translate-y-4 md:translate-y-12">
        
        <div className="relative flex flex-col items-center justify-center w-full pt-4 md:pt-8 overflow-visible">
          
          <h2 className="absolute inset-0 flex items-center justify-center text-[20vw] md:text-[12vw] font-black tracking-tighter leading-none uppercase select-none z-0 pointer-events-none bg-gradient-to-b from-blue-300/[0.12] via-blue-500/[0.10] to-transparent bg-clip-text text-transparent transform -translate-y-10 md:-translate-y-6">
            AMMAR
          </h2>

          <h1 className="relative text-3xl md:text-6xl font-extrabold uppercase tracking-tight z-10 select-none">
            ABOUT <span className="text-[#3b82f6] drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">ME</span>
          </h1>

          <div className="flex items-center gap-4 mt-6 w-full justify-center">
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-blue-500 to-transparent"></div>
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.4em] text-slate-300">WHO I AM</span>
            <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-blue-500 to-transparent"></div>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-4 md:space-y-2 text-slate-400 text-[12px] sm:text-[13px] md:text-base leading-relaxed max-w-2xl px-4 font-normal mt-6 md:mt-0">
          <p>
            I am an <span className="text-white font-semibold">Expert Web Developer</span> specializing in architecting and deploying 
            scalable, high-performance digital platforms.
          </p>
          <p className="hidden sm:block">
            My methodology prioritizes performance optimization, immaculate code integrity, 
            and the development of user interfaces.
          </p>
        </div>

        <div className="mt-8 md:mt-0 pt-0 md:pt-0">
          {/* 3. Updated onClick to use navigate('/resume') for consistency */}
          <button 
            onClick={() => navigate('/resume')} 
            className="group relative px-10 md:px-12 py-3 bg-[#3b82f6] text-white text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full hover:bg-blue-600 transition-all shadow-[0_0_25px_rgba(59,130,246,0.4)] transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2 font-bold">
              MY CV
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default About;