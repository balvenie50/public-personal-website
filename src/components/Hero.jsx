import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// const buttonClass =
//   'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105';

const iconButtonClass =
  'p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors duration-300';

const chevronClass = 'w-8 h-8 text-gray-400';

const Hero = () => {
  // const scrollToProjects = () => {
  //   document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  // };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8 animate-fade-in">
          <h3 className="text-5xl md:text-5xl font-bold text-gray-300 mb-8 max-w-2xl mx-auto">
            Hi, there <span className="text-white waving-hand">👋</span>
          </h3>
          <br />
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            I'm Andy Ahn
          </h1>
          <br />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-300 mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Full Stack Developer
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Building scalable web applications with React, Node.js, and modern
            cloud technologies. Passionate about clean code, user experience,
            and innovative solutions that solve real-world problems.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <div className="flex gap-4">
            <a
              href={import.meta.env.VITE_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={iconButtonClass}
            >
              <Github className="w-6 h-6 text-white" />
            </a>
            <a
              href={import.meta.env.VITE_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={iconButtonClass}
            >
              <Linkedin className="w-6 h-6 text-white" />
            </a>
            <a
              href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
              className={iconButtonClass}
            >
              <Mail className="w-6 h-6 text-white" />
            </a>
          </div>
        </div>
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button onClick={scrollToProjects} className={buttonClass}>
            View My Work
          </Button>
        </div> */}

      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className={chevronClass} />
      </div>
    </section>
  );
};

export default Hero;
