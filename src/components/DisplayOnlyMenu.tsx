import { useState, useEffect } from 'react'
import { Box, Text } from 'ink'

type Section = 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact'

const SECTIONS: { key: Section; label: string; hotkey: string }[] = [
  { key: 'home', label: 'Home', hotkey: 'h' },
  { key: 'about', label: 'About', hotkey: 'a' },
  { key: 'experience', label: 'Experience', hotkey: 'e' },
  { key: 'projects', label: 'Projects', hotkey: 'p' },
  { key: 'skills', label: 'Skills', hotkey: 's' },
  { key: 'contact', label: 'Contact', hotkey: 'c' }
]

const WAVE_FRAMES = ['◇', '◆', '◇', '◈']

export default function DisplayOnlyMenu() {
  const [currentSection, setCurrentSection] = useState<Section>('home')
  const [waveFrame, setWaveFrame] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setWaveFrame(prev => (prev + 1) % WAVE_FRAMES.length)
    }, 500)
    return () => clearInterval(timer)
  }, [])

  // Auto-cycle through sections
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSection(prev => {
        const currentIndex = SECTIONS.findIndex(s => s.key === prev)
        const nextIndex = (currentIndex + 1) % SECTIONS.length
        return SECTIONS[nextIndex].key
      })
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const renderHeader = () => (
    <Box borderStyle="double" borderColor="#BF00FF" padding={1} marginBottom={1}>
      <Box flexDirection="column" alignItems="center">
        <Text color="#E6E6FA" bold>
          {WAVE_FRAMES[waveFrame]} MOHIL GARG - FULL-STACK ENGINEER {WAVE_FRAMES[waveFrame]}
        </Text>
        <Text color="#DDA0DD">Portfolio • mohil.dev • GitHub: mohilcode</Text>
      </Box>
    </Box>
  )

  const renderNavigation = () => (
    <Box borderStyle="single" borderColor="#4B0082" padding={1} marginBottom={1}>
      <Box flexDirection="row" justifyContent="space-between">
        {SECTIONS.map(section => (
          <Box key={section.key} marginRight={1}>
            <Text
              color={currentSection === section.key ? '#BF00FF' : '#DDA0DD'}
              bold={currentSection === section.key}
            >
              [{section.hotkey}] {section.label}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  )

  const renderHome = () => (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor="#8A2BE2" padding={2} marginBottom={1}>
        <Box flexDirection="column">
          <Text color="#E6E6FA" bold>
            Welcome to My Digital Portfolio
          </Text>
          <Box marginTop={1}>
            <Text color="#DDA0DD">
              Full-Stack & DevOps Engineer specializing in modern web technologies
            </Text>
          </Box>
          <Box marginTop={1}>
            <Text color="#DDA0DD">
              Currently working at MONOLISIX and SIND, building scalable solutions
            </Text>
          </Box>
        </Box>
      </Box>
      <Box borderStyle="single" borderColor="#4B0082" padding={1}>
        <Box flexDirection="column">
          <Text color="#8A2BE2">Quick Links:</Text>
          <Text color="#DDA0DD">• Email: mohilg@outlook.com</Text>
          <Text color="#DDA0DD">• Portfolio: mohil.dev</Text>
          <Text color="#DDA0DD">• GitHub: mohilcode</Text>
          <Text color="#DDA0DD">• Mobile: 080-9416-6969</Text>
        </Box>
      </Box>
    </Box>
  )

  const renderAbout = () => (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor="#8A2BE2" padding={2} marginBottom={1}>
        <Box flexDirection="column">
          <Text color="#E6E6FA" bold>
            Education
          </Text>
          <Box marginTop={1}>
            <Text color="#BF00FF">• Kumamoto University, Japan (2020-2024)</Text>
            <Text color="#DDA0DD">
              {' '}
              Bachelor of Engineering - Electrical & Information Engineering
            </Text>
          </Box>
          <Box marginTop={1}>
            <Text color="#BF00FF">• Tokyo University of Foreign Studies (2019-2020)</Text>
            <Text color="#DDA0DD"> MEXT Scholarship Pre-Undergraduate Studies</Text>
          </Box>
        </Box>
      </Box>
      <Box borderStyle="single" borderColor="#4B0082" padding={1}>
        <Box flexDirection="column">
          <Text color="#8A2BE2" bold>
            Achievements
          </Text>
          <Text color="#DDA0DD">• MEXT Scholarship recipient (1 of 4 from India, 2019)</Text>
          <Text color="#DDA0DD">
            • Specialized in modern web development and cloud architecture
          </Text>
          <Text color="#DDA0DD">• Built multiple production-scale applications</Text>
        </Box>
      </Box>
    </Box>
  )

  const renderExperience = () => (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor="#8A2BE2" padding={2} marginBottom={1}>
        <Box flexDirection="column">
          <Text color="#E6E6FA" bold>
            MONOLISIX株式会社 - Full-Stack & DevOps Engineer
          </Text>
          <Text color="#DDA0DD">Oct 2023 - Present | Remote</Text>
          <Box marginTop={1}>
            <Text color="#BF00FF">• Monorepo Architecture:</Text>
            <Text color="#DDA0DD"> Created unified monorepo with Turborepo, improved CI/CD</Text>
            <Text color="#BF00FF">• Performance Optimization:</Text>
            <Text color="#DDA0DD"> 75% faster startup, 5x faster builds with Vite</Text>
            <Text color="#BF00FF">• Vue.js Modernization:</Text>
            <Text color="#DDA0DD"> Upgraded to Vue 2.7, implemented Composition API</Text>
          </Box>
        </Box>
      </Box>
      <Box borderStyle="single" borderColor="#4B0082" padding={1}>
        <Box flexDirection="column">
          <Text color="#E6E6FA" bold>
            株式会社SIND - Tech Lead & Full-Stack Engineer
          </Text>
          <Text color="#DDA0DD">Present | Remote</Text>
          <Box marginTop={1}>
            <Text color="#BF00FF">• AI-Powered Audio Systems:</Text>
            <Text color="#DDA0DD"> Built SageMaker endpoints, real-time transcription</Text>
            <Text color="#BF00FF">• Team Leadership:</Text>
            <Text color="#DDA0DD"> Code reviews, ECS deployments, CI/CD automation</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )

  const renderProjects = () => (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor="#8A2BE2" padding={2} marginBottom={1}>
        <Box flexDirection="column">
          <Text color="#E6E6FA" bold>
            Featured Projects
          </Text>
          <Box marginTop={1}>
            <Text color="#BF00FF">• Entropy - Multi-Agent Coding System</Text>
            <Text color="#DDA0DD"> AI SDK, SQLite, Drizzle ORM | Automated development</Text>
            <Text color="#BF00FF">• Starter-Flare - Full-Stack SaaS Boilerplate</Text>
            <Text color="#DDA0DD"> Cloudflare Workers, React Router, Hono</Text>
            <Text color="#BF00FF">• GetMD - Website to Markdown Converter</Text>
            <Text color="#DDA0DD"> High-performance Rust server</Text>
          </Box>
        </Box>
      </Box>
      <Box borderStyle="single" borderColor="#4B0082" padding={1}>
        <Box flexDirection="column">
          <Text color="#8A2BE2" bold>
            Personal TUI Website (This!)
          </Text>
          <Text color="#DDA0DD">Bun, Ink, TTYD | Interactive terminal portfolio</Text>
          <Text color="#DDA0DD">Accessible via who.mohil.dev and SSH at why.mohil.dev</Text>
        </Box>
      </Box>
    </Box>
  )

  const renderSkills = () => (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor="#8A2BE2" padding={2} marginBottom={1}>
        <Box flexDirection="column">
          <Text color="#E6E6FA" bold>
            Technical Skills
          </Text>
          <Box marginTop={1}>
            <Text color="#BF00FF">Programming:</Text>
            <Text color="#DDA0DD">TypeScript, Python, Kotlin, Rust, C++, SQL</Text>
            <Text color="#BF00FF">Frameworks:</Text>
            <Text color="#DDA0DD">Next.js, FastAPI, Django, Vue.js, Express.js, tRPC</Text>
            <Text color="#BF00FF">ML/AI:</Text>
            <Text color="#DDA0DD">AWS SageMaker, AI SDK, Google Gemini API, TensorFlow</Text>
          </Box>
        </Box>
      </Box>
      <Box borderStyle="single" borderColor="#4B0082" padding={1}>
        <Box flexDirection="column">
          <Text color="#8A2BE2" bold>
            DevOps & Cloud:
          </Text>
          <Text color="#DDA0DD">AWS (EC2, ECS, S3, CloudFront), Docker, CI/CD, Turborepo</Text>
          <Text color="#8A2BE2" bold>
            Databases:
          </Text>
          <Text color="#DDA0DD">PostgreSQL, MongoDB, SQLite, Drizzle ORM</Text>
        </Box>
      </Box>
    </Box>
  )

  const renderContact = () => (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor="#8A2BE2" padding={2} marginBottom={1}>
        <Box flexDirection="column">
          <Text color="#E6E6FA" bold>
            Get In Touch
          </Text>
          <Box marginTop={1}>
            <Text color="#BF00FF">Email:</Text>
            <Text color="#DDA0DD">mohilg@outlook.com</Text>
            <Text color="#BF00FF">Portfolio:</Text>
            <Text color="#DDA0DD">mohil.dev</Text>
            <Text color="#BF00FF">GitHub:</Text>
            <Text color="#DDA0DD">github.com/mohilcode</Text>
            <Text color="#BF00FF">Mobile:</Text>
            <Text color="#DDA0DD">+81 80-9416-6969</Text>
          </Box>
        </Box>
      </Box>
      <Box borderStyle="single" borderColor="#4B0082" padding={1}>
        <Box flexDirection="column">
          <Text color="#8A2BE2">Available for:</Text>
          <Text color="#DDA0DD">• Full-stack development projects</Text>
          <Text color="#DDA0DD">• DevOps and cloud architecture consulting</Text>
          <Text color="#DDA0DD">• Technical leadership roles</Text>
          <Text color="#DDA0DD">• Open source collaboration</Text>
        </Box>
      </Box>
    </Box>
  )

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return renderHome()
      case 'about':
        return renderAbout()
      case 'experience':
        return renderExperience()
      case 'projects':
        return renderProjects()
      case 'skills':
        return renderSkills()
      case 'contact':
        return renderContact()
      default:
        return renderHome()
    }
  }

  const renderFooter = () => (
    <Box borderStyle="single" borderColor="#4B0082" padding={1} marginTop={1}>
      <Box flexDirection="row" justifyContent="center">
        <Text color="#DDA0DD">Auto-cycling through sections • Portfolio Demo Mode</Text>
      </Box>
    </Box>
  )

  return (
    <Box flexDirection="column" padding={1}>
      {renderHeader()}
      {renderNavigation()}
      <Box minHeight={15}>{renderContent()}</Box>
      {renderFooter()}
    </Box>
  )
}
