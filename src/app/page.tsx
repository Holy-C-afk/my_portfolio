'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTheme, setCurrentTheme] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Définition des thèmes
  const themes = [
    {
      primary: 'from-blue-500 to-purple-500',
      secondary: 'from-purple-500 to-pink-500',
      accent: 'from-pink-500 to-blue-500',
      text: 'text-blue-400',
      hover: 'hover:text-blue-300',
      border: 'border-blue-500/20',
      bg: 'from-gray-800/50 to-gray-900/50'
    },
    {
      primary: 'from-green-500 to-teal-500',
      secondary: 'from-teal-500 to-emerald-500',
      accent: 'from-emerald-500 to-green-500',
      text: 'text-green-400',
      hover: 'hover:text-green-300',
      border: 'border-green-500/20',
      bg: 'from-gray-800/50 to-gray-900/50'
    },
    {
      primary: 'from-orange-500 to-red-500',
      secondary: 'from-red-500 to-yellow-500',
      accent: 'from-yellow-500 to-orange-500',
      text: 'text-orange-400',
      hover: 'hover:text-orange-300',
      border: 'border-orange-500/20',
      bg: 'from-gray-800/50 to-gray-900/50'
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Animation du thème
    const themeInterval = setInterval(() => {
      setCurrentTheme((prev) => (prev + 1) % themes.length);
    }, 8000); // Change de thème toutes les 8 secondes

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(themeInterval);
    };
  }, []);

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const currentThemeColors = themes[currentTheme];

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden cursor-none">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Base background */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(17, 24, 39, 0.8) 0%, rgba(0, 0, 0, 1) 100%)"
          }}
        />

        {/* Animated bubbles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full"
            style={{
              width: "20px",
              height: "20px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: "rgba(59, 130, 246, 0.3)",
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 1.5, 2, 0],
              opacity: [0, 0.5, 0.3, 0.1, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: "4px",
              height: "4px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: "rgba(147, 51, 234, 0.5)",
              boxShadow: "0 0 10px rgba(147, 51, 234, 0.5)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Glowing orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              width: "200px",
              height: "200px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: "rgba(59, 130, 246, 0.1)",
              filter: "blur(40px)",
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.1, 0.2, 0.1],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Custom cursor */}
      <motion.div
        className="fixed w-4 h-4 rounded-full border border-blue-500 pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 15, 
          mass: 0.1,
          restDelta: 0.001,
          scale: {
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-blue-500 pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: [1, 1.5, 1],
        }}
        transition={{ 
          type: "spring", 
          stiffness: 800, 
          damping: 20, 
          mass: 0.05,
          restDelta: 0.001,
          scale: {
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
      <motion.div
        className="fixed w-8 h-8 rounded-full border border-blue-500/30 pointer-events-none z-[100]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25, 
          mass: 0.2,
          restDelta: 0.001,
          scale: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          },
          opacity: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />

      {/* Content sections with proper z-index */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-[800px] h-[800px] rounded-full border border-blue-500/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="w-[600px] h-[600px] rounded-full border border-purple-500/20"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="w-[400px] h-[400px] rounded-full border border-pink-500/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center z-10 relative"
          >
            <motion.div
              className="mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-blue-500/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <motion.img 
                  src="profile.jpg" 
                  alt="Tachfine El farouki" 
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 z-10"></div>
              </motion.div>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.span 
                className="block text-transparent bg-clip-text"
                style={{
                  background: `linear-gradient(to right, ${currentThemeColors.primary.split(' ')[1]}, ${currentThemeColors.secondary.split(' ')[1]}, ${currentThemeColors.accent.split(' ')[1]})`,
                  backgroundSize: "200% auto"
                }}
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                TACHFINE
              </motion.span>
              <motion.span
                className="block text-5xl md:text-7xl mt-2 text-gray-300"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                EL FAROUKI
              </motion.span>
            </motion.h1>

            <motion.div
              className="mb-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-2xl md:text-3xl text-gray-400">
                <motion.span
                  className="inline-block text-blue-400"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  Ingénieur
                </motion.span>{" "}
                en MIAGE |{" "}
                <motion.span
                  className="inline-block text-purple-400"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  Développeur
                </motion.span>{" "}
                <motion.span
                  className="inline-block text-pink-400"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  Full Stack
                </motion.span>
              </p>
            </motion.div>

            <motion.div 
              className="flex justify-center gap-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.a
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(255, 255, 255, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-8 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Me Contacter</span>
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.a>
              <motion.a
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(255, 255, 255, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
                href="#projets"
                className="px-8 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Voir Mes Projets</span>
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center">
                <motion.div
                  className="w-1 h-3 bg-white/50 rounded-full mt-2"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 md:px-8 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              className="relative mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2 
                className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% auto" }}
              >
                À Propos de Moi
              </motion.h2>
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div 
                className="space-y-8"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.div
                  className="group relative bg-gradient-to-br backdrop-blur-sm p-6 rounded-2xl border overflow-hidden"
                  style={{
                    background: `linear-gradient(to bottom right, ${currentThemeColors.bg.split(' ')[1]}, ${currentThemeColors.bg.split(' ')[3]})`,
                    borderColor: currentThemeColors.border
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: `0 0 30px ${currentThemeColors.primary.split(' ')[1]}`
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-200"
                    style={{
                      background: `linear-gradient(to bottom right, ${currentThemeColors.primary.split(' ')[1]}, ${currentThemeColors.secondary.split(' ')[1]})`
                    }}
                  />
                  <motion.div
                    className="absolute -right-4 -top-4 text-5xl opacity-20 group-hover:opacity-30 transition-opacity"
                    animate={{ 
                      rotate: [0, 5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Add your icon here */}
                  </motion.div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Étudiant en 4ème année d'ingénierie à l'EMSI en option MIAGE (Méthodes Informatiques Appliquées à la Gestion des Entreprises). 
                    Passionné par le développement logiciel et les nouvelles technologies, je combine mes compétences techniques avec une approche 
                    orientée solutions pour répondre aux besoins des entreprises.
                  </p>
                </motion.div>

                <motion.div 
                  className="flex gap-8 justify-center"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                >
                  {[
                    { icon: <FaGithub />, href: "https://github.com/Holy-C-afk", color: "from-gray-700 to-gray-900" },
                    { icon: <FaLinkedin />, href: "https://linkedin.com", color: "from-blue-600 to-blue-800" },
                    { icon: <FaEnvelope />, href: "mailto:tachfineelfarouki76@gmail.com", color: "from-red-500 to-red-700" }
                  ].map((item, index) => (
                    <motion.a 
                      key={index}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 5,
                        boxShadow: "0 0 30px rgba(59, 130, 246, 0.4)"
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-3xl p-4 rounded-full bg-gradient-to-br ${item.color} hover:opacity-90 transition-all duration-200`}
                    >
                      {item.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div 
                className="space-y-8"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.h3 
                  className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  Compétences
                </motion.h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      title: "Développement Web",
                      skills: "React, Next.js, Node.js, Express",
                      icon: "🌐",
                      color: "from-blue-500 to-blue-700"
                    },
                    {
                      title: "Mobile",
                      skills: "Flutter, Dart, Android",
                      icon: "📱",
                      color: "from-green-500 to-green-700"
                    },
                    {
                      title: "Backend",
                      skills: "Python, Java, SQL, MongoDB",
                      icon: "⚙️",
                      color: "from-purple-500 to-purple-700"
                    },
                    {
                      title: "Data Science",
                      skills: "Machine Learning, Jupyter, Pandas",
                      icon: "📊",
                      color: "from-pink-500 to-pink-700"
                    },
                    {
                      title: "Cloud",
                      skills: "AWS, Azure, Cloud Computing",
                      icon: "☁️",
                      color: "from-yellow-500 to-yellow-700"
                    }
                  ].map((skill, index) => (
                    <motion.div 
                      key={index}
                      className="group relative bg-gradient-to-br backdrop-blur-sm p-6 rounded-xl border overflow-hidden"
                      style={{
                        background: `linear-gradient(to bottom right, ${currentThemeColors.bg.split(' ')[1]}, ${currentThemeColors.bg.split(' ')[3]})`,
                        borderColor: currentThemeColors.border
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: `0 0 30px ${currentThemeColors.primary.split(' ')[1]}`
                      }}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.1, 
                        ease: "easeOut",
                        type: "spring",
                        stiffness: 300
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-200"
                        style={{
                          background: `linear-gradient(to bottom right, ${currentThemeColors.primary.split(' ')[1]}, ${currentThemeColors.secondary.split(' ')[1]})`
                        }}
                      />
                      <motion.div
                        className="absolute -right-4 -top-4 text-5xl opacity-20 group-hover:opacity-30 transition-opacity"
                        animate={{ 
                          rotate: [0, 5, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {skill.icon}
                      </motion.div>
                      <h4 className="font-semibold mb-3 text-xl text-blue-400 group-hover:text-blue-300 transition-colors">
                        {skill.title}
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {skill.skills}
                      </p>
                      <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: "0%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 px-4 md:px-8 relative bg-transparent">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Formation
            </h2>
            <div className="space-y-8">
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
                }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-400">École Marocaine des Sciences de l'Ingénieur (EMSI)</h3>
                <p className="text-gray-300 mb-2">Cycle Ingénieur en MIAGE</p>
                <p className="text-gray-400">2021 - 2026</p>
                <ul className="mt-4 text-gray-300 list-disc list-inside">
                  <li>Spécialisation en Méthodes Informatiques Appliquées à la Gestion des Entreprises</li>
                  <li>Formation en développement logiciel, gestion de projet et systèmes d'information</li>
                  <li>Projets pratiques en entreprise et stages professionnels</li>
                  <li>Actuellement en 4ème année</li>
                </ul>
              </motion.div>

              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
                }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700/50"
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-400">Faculté des Sciences Juridiques, Économiques et Sociales (FSJES)</h3>
                <p className="text-gray-300 mb-2">Licence en Gestion</p>
                <p className="text-gray-400">2021 - 2024</p>
                <ul className="mt-4 text-gray-300 list-disc list-inside">
                  <li>Formation complète en gestion d'entreprise et management</li>
                  <li>Acquisition de compétences en comptabilité, finance et marketing</li>
                  <li>Double compétence : Gestion et Informatique</li>
                  <li>Diplôme obtenu avec mention</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Certifications Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              className={`text-4xl font-bold mb-12 text-center ${currentThemeColors.text}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Certifications
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Interactivity with JavaScript",
                  platform: "Coursera",
                  category: "Web Development",
                  url: "https://www.coursera.org/account/accomplishments/verify/3WD74WLR6NTD",
                  school: "University of Michigan"
                },
                {
                  title: "The Arduino Platform and C Programming",
                  platform: "Coursera",
                  category: "Hardware & Embedded Systems",
                  url: "https://www.coursera.org/account/accomplishments/verify/7QWFPZKW6QK7",
                  school: "University of California, Irvine"
                },
                {
                  title: "Introduction to Java and Object-Oriented Programming",
                  platform: "Coursera",
                  category: "Programming",
                  url: "https://www.coursera.org/account/accomplishments/verify/6JA53RWLPTQQ",
                  school: "University of Pennsylvania"
                },
                {
                  title: "Virtual Networks in Azure",
                  platform: "Coursera",
                  category: "Cloud Computing",
                  url: "https://www.coursera.org/account/accomplishments/verify/5ITG593XTX9D",
                  school: "Whizlabs"
                },
                {
                  title: "React Basics",
                  platform: "Coursera",
                  category: "Web Development",
                  url: "https://www.coursera.org/account/accomplishments/verify/Q6HXWYV5CGCX",
                  school: "Meta"
                },
                {
                  title: "Building Web Applications in PHP",
                  platform: "Coursera",
                  category: "Web Development",
                  url: "https://www.coursera.org/account/accomplishments/verify/3DLFT3KCAP5X",
                  school: "University of Michigan"
                },
                {
                  title: "Introduction à la programmation orientée objet (en C++)",
                  platform: "Coursera",
                  category: "Programming",
                  url: "https://www.coursera.org/account/accomplishments/verify/H8C2LNH3WLDB",
                  school: "École Polytechnique Fédérale de Lausanne"
                },
                {
                  title: "HTML, CSS, and Javascript for Web Developers",
                  platform: "Coursera",
                  category: "Web Development",
                  url: "https://www.coursera.org/account/accomplishments/verify/T7S7XTR4VSY7",
                  school: "Johns Hopkins University"
                },
                {
                  title: "Delivering Quality Work with Agility",
                  platform: "Coursera",
                  category: "Project Management",
                  url: "https://www.coursera.org/account/accomplishments/verify/6DDQZG8N5BJK",
                  school: "IBM"
                }
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-lg backdrop-blur-sm border ${currentThemeColors.border} bg-gradient-to-br ${currentThemeColors.bg} cursor-pointer`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => window.open(cert.url, '_blank')}
                >
                  <h3 className={`text-xl font-semibold mb-2 ${currentThemeColors.text}`}>{cert.title}</h3>
                  <p className="text-gray-400 mb-1">{cert.platform}</p>
                  <p className="text-gray-400 mb-2 text-sm italic">{cert.school}</p>
                  <span className="inline-block px-3 py-1 text-sm rounded-full bg-blue-500/20 text-blue-300">
                    {cert.category}
                  </span>
                  <div className="mt-4 flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                    <span className="text-sm">View Certificate</span>
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projets" className="py-20 px-4 md:px-8 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Mes Projets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Projets visibles initialement */}
              {[
                {
                  title: "BookCatalog",
                  description: "Application de gestion de catalogue de livres avec interface utilisateur moderne et fonctionnalités de recherche avancée.",
                  tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
                  github: "https://github.com/Holy-C-afk/BookCatalog"
                },
                {
                  title: "EcommerceDjango",
                  description: "Plateforme e-commerce complète développée avec Django, incluant gestion des produits, panier d'achat et paiement.",
                  tags: ["Python", "Django", "HTML", "CSS", "SQLite"],
                  github: "https://github.com/Holy-C-afk/EcommerceDjango"
                },
                {
                  title: "DiabeteBR",
                  description: "Application mobile pour le suivi et la gestion du diabète, avec fonctionnalités de monitoring et conseils personnalisés.",
                  tags: ["Java", "Android Studio", "XML", "SQLite"],
                  github: "https://github.com/Holy-C-afk/DiabeteBR"
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    y: -10,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 p-6"
                >
                  <h3 className="text-xl font-semibold mb-3 text-blue-400 group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm border border-blue-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <motion.a
                      whileHover={{ x: 5 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                    >
                      Voir le projet 
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      <FaGithub className="text-xl" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}

              {/* Projets supplémentaires */}
              {showAllProjects && [
                {
                  title: "OrganisationCharite",
                  description: "Plateforme web pour la gestion des organisations caritatives, facilitant la coordination des actions et le suivi des dons.",
                  tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
                  github: "https://github.com/Holy-C-afk/OrganisationCharite"
                },
                {
                  title: "CarRentalSystem",
                  description: "Système de gestion de location de voitures avec réservation en ligne et suivi des véhicules.",
                  tags: ["Java", "Swing", "MySQL", "JDBC"],
                  github: "https://github.com/Holy-C-afk/CarRentalSystem"
                },
                {
                  title: "ReservationHotel",
                  description: "Application de réservation d'hôtels avec gestion des chambres, des clients et des paiements.",
                  tags: ["Python", "Tkinter", "SQLite", "OOP"],
                  github: "https://github.com/Holy-C-afk/ReservationHotel"
                }
              ].map((project, index) => (
                <motion.div
                  key={index + 3}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700 p-6"
                >
                  <h3 className="text-xl font-semibold mb-3 text-blue-400 group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm border border-blue-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <motion.a
                      whileHover={{ x: 5 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
                    >
                      Voir le projet 
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      <FaGithub className="text-xl" />
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bouton Voir plus */}
            <motion.div 
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {showAllProjects ? "Voir moins" : "Voir plus"}
                </span>
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 md:px-8 relative min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto w-full"
          >
            <motion.div
              className="relative mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2 
                className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% auto" }}
              >
                Contactez-Moi
              </motion.h2>
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <motion.div
                  className="p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 40px rgba(59, 130, 246, 0.2)"
                  }}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-blue-400">Restons en Contact</h3>
                  <div className="space-y-6">
                    <motion.a
                      href="mailto:tachfineelfarouki76@gmail.com"
                      className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-colors group"
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                        <FaEnvelope className="text-2xl text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="font-medium">tachfineelfarouki76@gmail.com</p>
                      </div>
                    </motion.a>

                    <motion.a
                      href="https://github.com/Holy-C-afk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-colors group"
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                        <FaGithub className="text-2xl text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">GitHub</p>
                        <p className="font-medium">@Holy-C-afk</p>
                      </div>
                    </motion.a>

                    <motion.a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-gray-300 hover:text-blue-400 transition-colors group"
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                        <FaLinkedin className="text-2xl text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">LinkedIn</p>
                        <p className="font-medium">Tachfine El farouki</p>
                      </div>
                    </motion.a>
                  </div>
                </motion.div>

                <motion.div
                  className="p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 40px rgba(59, 130, 246, 0.2)"
                  }}
                >
                  <h3 className="text-2xl font-semibold mb-6 text-blue-400">Disponibilité</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-gray-300">Disponible pour de nouvelles opportunités</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                      <p className="text-gray-300">Temps de réponse rapide</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
                      <p className="text-gray-300">Flexible sur les horaires</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Interactive Contact Form */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50"
              >
                <h3 className="text-2xl font-semibold mb-6 text-blue-400">Envoyez-moi un message</h3>
                <div className="space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="email"
                      placeholder="Votre email"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative"
                  >
                    <textarea
                      placeholder="Votre message"
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </motion.div>
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Envoyer le message</span>
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Add global styles for cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        a, button, [role="button"] {
          cursor: none !important;
        }
      `}</style>

      {/* Add global styles for gradient animation */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 8s linear infinite;
        }
      `}</style>
    </main>
  );
} 