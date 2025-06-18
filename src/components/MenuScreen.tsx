import { useState, useEffect } from 'react'
import { Box, Text, useInput, useApp } from 'ink'
import { theme } from '../theme.js'
import Header from './common/Header.js'
import Footer from './common/Footer.js'
import Home from './sections/Home.js'
import About from './sections/About.js'
import Experience from './sections/Experience.js'
import Projects from './sections/Projects.js'
import Skills from './sections/Skills.js'
import Contact from './sections/Contact.js'

type Section = 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact'

const SECTIONS: { key: Section; label: string; hotkey: string }[] = [
  { key: 'home', label: 'Home', hotkey: 'h' },
  { key: 'about', label: 'About', hotkey: 'a' },
  { key: 'experience', label: 'Experience', hotkey: 'e' },
  { key: 'projects', label: 'Projects', hotkey: 'p' },
  { key: 'skills', label: 'Skills', hotkey: 's' },
  { key: 'contact', label: 'Contact', hotkey: 'c' }
]

export default function MenuScreen() {
  const [currentSection, setCurrentSection] = useState<Section>('home')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [inputText, setInputText] = useState('')
  const [isSearchMode, setIsSearchMode] = useState(false)
  const { exit } = useApp()

  useEffect(() => {
    setCurrentSection(SECTIONS[selectedIndex].key)
  }, [selectedIndex])

  useInput((input, key) => {
    if (key.escape || (key.ctrl && input === 'c')) {
      if (isSearchMode) {
        setIsSearchMode(false)
        setInputText('')
      } else {
        exit()
      }
      return
    }

    if (isSearchMode) {
      if (key.return) {
        setIsSearchMode(false)
        setInputText('')
      } else if (key.backspace || key.delete) {
        setInputText(prev => prev.slice(0, -1))
      } else if (input && input.length === 1) {
        setInputText(prev => prev + input)
      }
      return
    }

    if (key.upArrow) {
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : SECTIONS.length - 1))
    } else if (key.downArrow) {
      setSelectedIndex(prev => (prev + 1) % SECTIONS.length)
    } else if (key.return) {
      setCurrentSection(SECTIONS[selectedIndex].key)
    } else if (input === '/') {
      setIsSearchMode(true)
    } else {
      const section = SECTIONS.find(s => s.hotkey === input.toLowerCase())
      if (section) {
        const newIndex = SECTIONS.findIndex(s => s.key === section.key)
        setSelectedIndex(newIndex)
      }
    }
  })

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
      <Box>
        <Box
          flexDirection="column"
          borderStyle="single"
          borderColor={theme.border}
          paddingX={2}
          marginRight={2}
        >
          {SECTIONS.map((section, index) => (
            <Text
              key={section.key}
              color={
                currentSection === section.key
                  ? theme.primary
                  : selectedIndex === index
                    ? theme.accent
                    : theme.fgMuted
              }
              bold={currentSection === section.key}
            >
              {selectedIndex === index ? '>> ' : '   '}[{section.hotkey}] {section.label}
            </Text>
          ))}
        </Box>
        <Box flexGrow={1} minHeight={20}>
          {renderContent()}
        </Box>
      </Box>
      <Footer isSearchMode={isSearchMode} inputText={inputText} />
    </Box>
  )
}
