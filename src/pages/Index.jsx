
import Hero from '../components/Hero';
import Skills from '../components/Skills';
// import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Hero />
      <Skills />
      {/* <Projects /> */}
      <Contact />
    </div>
  );
};

export default Index;
