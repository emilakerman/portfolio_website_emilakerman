import Navigation from '@/components/Navigation/Navigation';
import Hero from '@/components/Hero/Hero';
import Projects from '@/components/Projects/Projects';
import Skills from '@/components/Skills/Skills';
import ClaudeCode from '@/components/ClaudeCode/ClaudeCode';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <ClaudeCode />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
