import React, { useState } from 'react'; // 1. useState import kiya
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import About from './Pages/About';
import Contact from './Pages/Contact';
import Navbar from './Component/Navbar';
import Home from './Pages/Home';
import Resume from './Pages/Resume';
import Project from './Pages/Project';
function App() {
  // 2. Menu ki state yahan rakhi taake Home page ko pata chal sakay kab blur hona hai
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
        {/* 3. Navbar ko state aur function dono pass kiye */}
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        
        <main>
          <Routes>
            {/* 4. Home ko 'isMenuOpen' pass kiya blur effect ke liye */}
            <Route path="/" element={<Home isMenuOpen={isOpen} />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Resume" element={<Resume/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;