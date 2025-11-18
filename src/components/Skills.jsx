
import { Code, Server, Database, Globe, Cloud, Cog } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Frontend",
      skills: ["JavaScript","React", "TypeScript", "Next.js", "Tailwind CSS"]
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Backend",
      skills: ["Node.js", "Express.js","Nginx", "Python"]
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Database",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"]
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud & DevOps",
      skills: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Other Web Technologies",
      skills: ["REST APIs", "Jest", "Mocha","WebSockets", "Microservices", "OAuth"]
    },
    {
      icon: <Cog className="w-8 h-8" />,
      title: "Tools & Others",
      skills: ["Git", "Linux", "Windows Server", "Active Directory"]
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Expertise across the full technology stack with focus on modern, scalable solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg text-white mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm hover:bg-gray-600/50 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
