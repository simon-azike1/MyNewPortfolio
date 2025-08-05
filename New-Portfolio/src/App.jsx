import React from 'react';
import Navbar from './Pages/Components/Navbar/Navbar';
import Hero from './Pages/Components/HeroSection/Hero';
import Skill from './Pages/Components/Skills/Skill';
import Project from './Pages/Components/Projects/Projects';
import Contact from './Pages/Contact/Contact';
import Footer from './Pages/Components/Footer/Footer';

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Skill />
      <Project />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
