import React from 'react';
import Hero from '../components/landing-page/hero'
import About from '../components/landing-page/about'
import Footer from "../components/landing-page/footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Footer />
    </main>
  );
}