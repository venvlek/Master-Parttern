import React from 'react';

import Navbar        from './components/Navbar/Navbar';
import Hero          from './components/Hero/Hero';
import Ticker        from './components/Ticker/Ticker';
import Stats         from './components/Stats/Stats';
import About         from './components/About/About';
import Services      from './components/Services/Services';
import Projects      from './components/Projects/Projects';
import WhyUs         from './components/WhyUs/WhyUs';
import HealthSafety  from './components/HealthSafety/HealthSafety';
import Contact       from './components/Contact/Contact';
import Footer        from './components/Footer/Footer';

import './styles/globals.css';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Stats />
        <About />
        <Services />
        <Projects />
        <WhyUs />
        <HealthSafety />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
