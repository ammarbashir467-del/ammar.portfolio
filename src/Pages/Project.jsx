import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { ExternalLink, Layout, ShoppingCart, Utensils, Home, Palette, Zap } from 'lucide-react';

// --- IMAGES IMPORTS ---
import arshaImg from '../assets/arsha.jpg'; 
import coloshopImg from '../assets/coloshop.jpg';
import feaneImg from '../assets/feane.jpg';
import fruitablesImg from '../assets/fruitables.jpg';
import furniImg from '../assets/furni.jpg';
import portaImg from '../assets/porta.jpg';
import portfolioImg from '../assets/portfolio-home.jpg';
import shopmasterImg from '../assets/shopmaster.jpg';

const StarField = () => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 }));
  
  useFrame((state, delta) => {
    // Speed matched with About page for consistency
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
          sizeAttenuation 
          depthWrite={false} 
        />
      </Points>
    </group>
  );
};

const Projects = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projectList = [
    { title: "Arsha", desc: "Corporate Business Solutions", link: "https://arsha-website-flame.vercel.app/", icon: <Zap size={14}/>, img: arshaImg },
    { title: "ColoShop", desc: "Fashion E-commerce Store", link: "https://coloshop-master.vercel.app/", icon: <ShoppingCart size={14}/>, img: coloshopImg },
    { title: "Fruitables", desc: "Organic Grocery Shop", link: "https://fruitables-shop.vercel.app/", icon: <ShoppingCart size={14}/>, img: fruitablesImg },
    { title: "ShopMaster", desc: "Minimalist Furniture Decor", link: "https://shopmaster-two.vercel.app/", icon: <Home size={14}/>, img: shopmasterImg },
    { title: "Ammar Portfolio", desc: "Cyberpunk Personal Branding", link: "https://amarr-portfolio.vercel.app/", icon: <Palette size={14}/>, img: portfolioImg },
    { title: "Furni", desc: "Modern Interior Design Studio", link: "https://furni-shop-dun.vercel.app/", icon: <Home size={14}/>, img: furniImg },
    { title: "Porta", desc: "Creative Agency Portfolio", link: "https://porta-master.vercel.app/", icon: <Layout size={14}/>, img: portaImg },
    { title: "Feane", desc: "Fast Food Restaurant UI", link: "https://feane-web-delta.vercel.app/", icon: <Utensils size={14}/>, img: feaneImg },
  ];

  return (
    <div className="relative min-h-screen bg-[#030b1e] text-slate-400 selection:bg-blue-500/30 overflow-x-hidden font-sans flex flex-col items-center px-4">
      
      {/* 3D BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <StarField />
          </Suspense>
        </Canvas>
      </div>

      {/* MOUSE GLOW */}
      <div className="pointer-events-none fixed inset-0 z-10"
        style={{ background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.08), transparent 80%)` }}
      />

      {/* HEADER SECTION - Aesthetic & Simple */}
      <div className="relative z-20 text-center pt-32 mb-8">
        <h1 className="text-2xl md:text-4xl font-black text-white tracking-widest uppercase">
          CURATED <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]">EXHIBITION</span>
        </h1>
        <p className="text-[8px] font-bold tracking-[0.6em] text-slate-600 uppercase mt-3">
          Architecture of the digital age
        </p>
      </div>

      {/* PROJECTS GRID - Original Layout (gap-3, p-4) */}
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-6xl mb-20">
        {projectList.map((p, i) => (
          <a key={i} href={p.link} target="_blank" rel="noreferrer" 
             className="group relative bg-slate-900/20 border border-slate-800/40 rounded-2xl p-4 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/50 hover:bg-slate-900/40 hover:-translate-y-1 shadow-2xl overflow-hidden flex flex-col justify-between">
            
            {/* HOVER IMAGE */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <img src={p.img} alt={p.title} className="h-full w-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-[#030b1e]/40" />
            </div>

            {/* CARD CONTENT */}
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-3">
                <div className="p-1.5 bg-[#030b1e] border border-slate-800 rounded-lg text-blue-500 group-hover:scale-110 transition-transform duration-500">
                  {p.icon}
                </div>
                <ExternalLink size={12} className="text-slate-700 group-hover:text-blue-400 transition-colors" />
              </div>

              <div className="space-y-1">
                <h3 className="text-white font-bold text-xs tracking-tight group-hover:text-blue-400 transition-colors uppercase">
                  {p.title}
                </h3>
                <p className="text-[9px] text-slate-500 font-medium leading-tight">
                  {p.desc}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="h-[1px] flex-1 bg-slate-800 group-hover:bg-blue-900 transition-colors" />
                <span className="text-[7px] font-black tracking-[0.2em] text-slate-700 uppercase group-hover:text-blue-500">Explore</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* FOOTER */}
      <div className="relative z-20 mt-auto pb-12 text-center">
        <p className="text-[7px] uppercase tracking-[1.5em] text-slate-800">Sargodha • Punjab • Portfolio 2026</p>
      </div>

    </div>
  );
};

export default Projects;