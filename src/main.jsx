import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Navbar from './navbar/navbar.jsx'
import HeroSection from './introsection/introsection.jsx'
import AboutSection from './aboutsection/aboutsection.jsx'
import ImpactSection from './impactsection/impactsection.jsx'
import NeedsSection from './needssection/needssection.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ImpactSection />
    <NeedsSection />
  </StrictMode>,
)
