import React from 'react';
import Home from './Home.jsx'; 
import About from './About.jsx'; 

function LandingPage() {
  return (
    <main className="scroll-smooth">
      <section id="home">
        <Home />
      </section>

      <section id="about">
        <About />
      </section>
    </main>
  );
}

export default LandingPage;
