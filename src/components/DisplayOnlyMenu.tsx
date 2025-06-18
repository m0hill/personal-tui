import { useState, useEffect } from 'react'
import { Box } from 'ink'
import Header from './common/Header.js'
import Home from './sections/Home.js'
import About from './sections/About.js'
import Experience from './sections/Experience.js'
import Projects from './sections/Projects.js'
import Skills from './sections/Skills.js'
import Contact from './sections/Contact.js'

const SECTIONS = ['home', 'about', 'experience', 'projects', 'skills', 'contact'] as const
type Section = (typeof SECTIONS)[number]

export default function DisplayOnlyMenu() {
  const [currentSection, setCurrentSection] = useState<Section>('home')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSection(prev => {
        const currentIndex = SECTIONS.indexOf(prev)
        const nextIndex = (currentIndex + 1) % SECTIONS.length
        return SECTIONS[nextIndex]
      })
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return <Home />
      case 'about':
        return <About />
      case 'experience':
        return <Experience />
      case 'projects':
        return <Projects />
      case 'skills':
        return <Skills />
      case 'contact':
        return <Contact />
      default:
        return <Home />
    }
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Header />
      <Box minHeight={20}>{renderContent()}</Box>
    </Box>
  )
}
