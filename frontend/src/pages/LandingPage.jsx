import React from 'react';
import Home from './Home.jsx'; 
import About from './About.jsx'; 
import Services from './Services.jsx';
import Projects from './Projects.jsx';
import Contact from './Contact.jsx';

function LandingPage() {
  return (
    <main className="scroll-smooth pt-20">
      <section id="home" className='md:scroll-mt-20 min-h-screen flex items-center justify-center'>
        <Home />
      </section>

      <section id="about" className='md:scroll-mt-20 min-h-screen flex items-center justify-center'>
        <About />
      </section>

      <section id="skills" className='md:scroll-mt-20 min-h-screen flex items-center justify-center'>
        <Services />
      </section>

      <section id="projects" className='md:scroll-mt-20 min-h-screen flex items-center justify-center'>
        <Projects/>
      </section>

      <section id="contact" className='min-h-screen flex items-center justify-center'>
        <Contact/>
      </section>
    </main>
  );
}

export default LandingPage;
