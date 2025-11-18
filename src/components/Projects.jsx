
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, inventory management, and admin dashboard.",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe", "Docker"],
      github: "https://github.com",
      live: "https://example.com",
      featured: true
    },
    {
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates, file sharing, and team communication features. Built with modern web technologies.",
      tech: ["Next.js", "TypeScript", "Prisma", "WebSockets", "AWS"],
      github: "https://github.com",
      live: "https://example.com",
      featured: true
    },
    {
      title: "AI-Powered Analytics Dashboard",
      description: "Data visualization platform with machine learning insights, real-time charts, and predictive analytics for business intelligence.",
      tech: ["Vue.js", "Python", "TensorFlow", "D3.js", "Redis"],
      github: "https://github.com",
      live: "https://example.com",
      featured: false
    },
    {
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication, transaction history, and budget tracking features.",
      tech: ["React Native", "Firebase", "Node.js", "JWT", "Expo"],
      github: "https://github.com",
      live: "https://example.com",
      featured: false
    }
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A selection of my recent work showcasing different technologies and problem-solving approaches
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300 ${
                project.featured ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <div className="flex gap-2">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Button 
                  asChild
                  className="bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 group"
                >
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    View Project
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
