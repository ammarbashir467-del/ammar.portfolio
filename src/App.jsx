import React, { useState } from 'react';
// BrowserRouter ki jagah HashRouter import kiya
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import About from './Pages/About';
import Contact from './Pages/Contact';
import Navbar from './Component/Navbar';
import Home from './Pages/Home';
import Resume from './Pages/Resume';
import Project from './Pages/Project';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router> {/* Ye ab HashRouter ki tarah behave karega */}
      <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        
        <main>
          <Routes>
            <Route path="/" element={<Home isMenuOpen={isOpen} />} />
            <Route path="/projects" element={<Project />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;