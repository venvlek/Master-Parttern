import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScrollToTop       from './components/ScrollToTop/ScrollToTop';
import Navbar            from './components/Navbar/Navbar';
import Footer            from './components/Footer/Footer';

import Hero              from './components/Hero/Hero';
import Ticker            from './components/Ticker/Ticker';
import Stats             from './components/Stats/Stats';
import About             from './components/About/About';
import Services          from './components/Services/Services';
import Projects          from './components/Projects/Projects';
import WhyUs             from './components/WhyUs/WhyUs';
import HealthSafety      from './components/HealthSafety/HealthSafety';
import Contact           from './components/Contact/Contact';
import BlogPreview       from './components/BlogPreview/BlogPreview';

import AboutPage         from './pages/About/AboutPage';
import ServicesPage      from './pages/Services/ServicesPage';
import ProjectsPage      from './pages/Projects/ProjectsPage';
import HealthSafetyPage  from './pages/HealthSafety/HealthSafetyPage';
import ContactPage       from './pages/Contact/ContactPage';
import QuotePage         from './pages/Quote/QuotePage';
import BlogPage          from './pages/Blog/BlogPage';
import BlogPost          from './pages/Blog/BlogPost';

import './styles/globals.css';

const Home = () => (
  <main>
    <Hero />
    <Ticker />
    <Stats />
    <About />
    <Services />
    <Projects />
    <WhyUs />
    <BlogPreview />
    <HealthSafety />
    <Contact />
  </main>
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"              element={<Home />}             />
        <Route path="/about"         element={<AboutPage />}        />
        <Route path="/services"      element={<ServicesPage />}     />
        <Route path="/projects"      element={<ProjectsPage />}     />
        <Route path="/health-safety" element={<HealthSafetyPage />} />
        <Route path="/contact"       element={<ContactPage />}      />
        <Route path="/quote"         element={<QuotePage />}        />
        <Route path="/blog"          element={<BlogPage />}         />
        <Route path="/blog/:slug"    element={<BlogPost />}         />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
