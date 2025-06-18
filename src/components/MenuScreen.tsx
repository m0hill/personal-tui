import { useState, useEffect } from 'react'
import { Box, Text, useInput, useApp } from 'ink'

type Section =
  | 'home'
  | 'about'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'contact'
  | 'gallery'
  | 'terminal'
  | 'games'

const SECTIONS: { key: Section; label: string; hotkey: string }[] = [
  { key: 'home', label: 'Home', hotkey: 'h' },
  { key: 'about', label: 'About', hotkey: 'a' },
  { key: 'experience', label: 'Experience', hotkey: 'e' },
  { key: 'projects', label: 'Projects', hotkey: 'p' },
  { key: 'skills', label: 'Skills', hotkey: 's' },
  { key: 'gallery', label: 'Gallery', hotkey: 'g' },
  { key: 'terminal', label: 'Terminal', hotkey: 't' },
  { key: 'games', label: 'Games', hotkey: 'm' },
  { key: 'contact', label: 'Contact', hotkey: 'c' }
]

const WAVE_FRAMES = ['◇', '◆', '◇', '◈']
const RETRO_COLORS = {
  neonPink: '#FF10F0',
  neonCyan: '#10FFFF',
  neonGreen: '#39FF14',
  neonYellow: '#FFFF00',
  neonOrange: '#FF6600',
  neonPurple: '#BF00FF',
  retroBlue: '#0080FF',
  retroRed: '#FF0040',
  softPink: '#FFB3DA',
  softCyan: '#B3FFFF',
  softGreen: '#B3FFB3',
  darkPurple: '#4B0082',
  deepMagenta: '#8B008B',
  electricBlue: '#7DF9FF'
}

export default function MenuScreen() {
  const [currentSection, setCurrentSection] = useState<Section>('home')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [waveFrame, setWaveFrame] = useState(0)
  const [inputText, setInputText] = useState('')
  const [isSearchMode, setIsSearchMode] = useState(false)
  const { exit } = useApp()

  useEffect(() => {
    const timer = setInterval(() => {
      setWaveFrame(prev => (prev + 1) % WAVE_FRAMES.length)
    }, 500)
    return () => clearInterval(timer)
  }, [])

  // Auto-demo mode when input isn't available
  useEffect(() => {
    if (!process.stdin.isTTY) {
      const timer = setInterval(() => {
        setCurrentSection(prev => {
          const currentIndex = SECTIONS.findIndex(s => s.key === prev)
          const nextIndex = (currentIndex + 1) % SECTIONS.length
          return SECTIONS[nextIndex].key
        })
      }, 3000)
      return () => clearInterval(timer)
    }
  }, [])

  // Input handling for TTY environments
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
        setCurrentSection(section.key)
        setSelectedIndex(SECTIONS.findIndex(s => s.key === section.key))
      }
    }
  })

  const renderHeader = () => (
    <Box borderStyle="double" borderColor={RETRO_COLORS.neonPink} padding={1} marginBottom={1}>
      <Box flexDirection="column" alignItems="center">
        <Text color={RETRO_COLORS.neonGreen} bold>
          {WAVE_FRAMES[waveFrame]} MOHIL GARG - FULL-STACK ENGINEER {WAVE_FRAMES[waveFrame]}
        </Text>
        <Text color={RETRO_COLORS.electricBlue}>Portfolio • mohil.dev • GitHub: mohilcode</Text>
      </Box>
    </Box>
  )

  const renderNavigation = () => (
    <Box borderStyle="single" borderColor={RETRO_COLORS.neonCyan} padding={1} marginBottom={1}>
      <Box flexDirection="column">
        <Box flexDirection="row" justifyContent="space-between">
          {SECTIONS.slice(0, 5).map((section, index) => (
            <Box key={section.key} marginRight={1}>
              <Text
                color={
                  currentSection === section.key
                    ? RETRO_COLORS.neonPink
                    : selectedIndex === index
                      ? RETRO_COLORS.neonYellow
                      : RETRO_COLORS.softCyan
                }
                bold={currentSection === section.key}
              >
                [{section.hotkey}] {section.label}
              </Text>
            </Box>
          ))}
        </Box>
        <Box flexDirection="row" justifyContent="space-between" marginTop={1}>
          {SECTIONS.slice(5).map((section, index) => (
            <Box key={section.key} marginRight={1}>
              <Text
                color={
                  currentSection === section.key
                    ? RETRO_COLORS.neonPink
                    : selectedIndex === index + 5
                      ? RETRO_COLORS.neonYellow
                      : RETRO_COLORS.softCyan
                }
                bold={currentSection === section.key}
              >
                [{section.hotkey}] {section.label}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )

  const renderHome = () => (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor={RETRO_COLORS.neonPink} padding={2} marginBottom={1}>
        <Box flexDirection="column">
          <Text color={RETRO_COLORS.neonGreen} bold>
            💻 Welcome to My Digital Portfolio 💻
          </Text>
          <Box marginTop={1}>
            <Text color={RETRO_COLORS.electricBlue}>
              Full-Stack & DevOps Engineer specializing in modern web technologies
            </Text>
          </Box>
          <Box marginTop={1}>
            <Text color={RETRO_COLORS.neonCyan}>
              Currently working at MONOLISIX and SIND, building scalable solutions
            </Text>
          </Box>
        </Box>
      </Box>
      <Box borderStyle="single" borderColor={RETRO_COLORS.neonYellow} padding={1}>
        <Box flexDirection="column">
          <Text color={RETRO_COLORS.neonOrange} bold>
            Quick Links:
          </Text>
          <Text color={RETRO_COLORS.softCyan}>• Email: mohilg@outlook.com</Text>
          <Text color={RETRO_COLORS.softCyan}>• Portfolio: mohil.dev</Text>
          <Text color={RETRO_COLORS.softCyan}>• GitHub: mohilcode</Text>
          <Text color={RETRO_COLORS.softCyan}>• Mobile: 080-9416-6969</Text>
        </Box>
      </Box>
    </Box>
  )

  const renderAbout = () => (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor={RETRO_COLORS.neonPurple} padding={2} marginBottom={1}>
        <Box flexDirection="column">
          <Text color={RETRO_COLORS.neonYellow} bold>
            🎓 Education
          </Text>
          <Box marginTop={1}>
            <Text color={RETRO_COLORS.neonPink}>• Kumamoto University, Japan (2020-2024)</Text>
            <Text color={RETRO_COLORS.softPink}>
              {' '}
              Bachelor of Engineering - Electrical & Information Engineering
            </Text>
          </Box>
          <Box marginTop={1}>
            <Text color={RETRO_COLORS.neonPink}>
              • Tokyo University of Foreign Studies (2019-2020)
            </Text>
            <Text color={RETRO_COLORS.softPink}> MEXT Scholarship Pre-Undergraduate Studies</Text>
          </Box>
        </Box>
      </Box>
      <Box borderStyle="single" borderColor={RETRO_COLORS.neonOrange} padding={1}>
        <Box flexDirection="column">
          <Text color={RETRO_COLORS.neonCyan} bold>
            🏆 Achievements
          </Text>
          <Text color={RETRO_COLORS.softGreen}>
            • MEXT Scholarship recipient (1 of 4 from India, 2019)
          </Text>
          <Text color={RETRO_COLORS.softGreen}>
            • Specialized in modern web development and cloud architecture
          </Text>
          <Text color={RETRO_COLORS.softGreen}>• Built multiple production-scale applications</Text>
        </Box>
      </Box>
    </Box>
  )

  const renderExperience = () => (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor={RETRO_COLORS.neonGreen} padding={2} marginBottom={1}>
        <Box flexDirection="column">
          <Text color={RETRO_COLORS.neonPink} bold>
            🏢 MONOLISIX株式会社 - Full-Stack & DevOps Engineer
          </Text>
          <Text color={RETRO_COLORS.neonCyan}>Oct 2023 - Present | Remote</Text>
          <Box marginTop={1}>
            <Text color={RETRO_COLORS.neonYellow}>• Monorepo Architecture:</Text>
            <Text color={RETRO_COLORS.softGreen}>
              {' '}
              Created unified monorepo with Turborepo, improved CI/CD
            </Text>
            <Text color={RETRO_COLORS.neonYellow}>• Performance Optimization:</Text>
            <Text color={RETRO_COLORS.softGreen}>
              {' '}
              75% faster startup, 5x faster builds with Vite
            </Text>
            <Text color={RETRO_COLORS.neonYellow}>• Vue.js Modernization:</Text>
            <Text color={RETRO_COLORS.softGreen}>
              {' '}
              Upgraded to Vue 2.7, implemented Composition API
            </Text>
          </Box>
        </Box>
      </Box>
      <Box borderStyle="single" borderColor={RETRO_COLORS.neonOrange} padding={1}>
        <Box flexDirection="column">
          <Text color={RETRO_COLORS.neonPurple} bold>
            🏢 株式会社SIND - Tech Lead & Full-Stack Engineer
          </Text>
          <Text color={RETRO_COLORS.electricBlue}>Present | Remote</Text>
          <Box marginTop={1}>
            <Text color={RETRO_COLORS.neonCyan}>• AI-Powered Audio Systems:</Text>
            <Text color={RETRO_COLORS.softCyan}>
              {' '}
              Built SageMaker endpoints, real-time transcription
            </Text>
            <Text color={RETRO_COLORS.neonCyan}>• Team Leadership:</Text>
            <Text color={RETRO_COLORS.softCyan}>
              {' '}
              Code reviews, ECS deployments, CI/CD automation
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )

  const renderProjects = () => (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor={RETRO_COLORS.retroBlue} padding={2} marginBottom={1}>
        <Box flexDirection="column">
          <Text color={RETRO_COLORS.neonGreen} bold>
            🚀 Featured Projects
          </Text>
          <Box marginTop={1}>
            <Text color={RETRO_COLORS.neonPink}>• Entropy - Multi-Agent Coding System</Text>
            <Text color={RETRO_COLORS.electricBlue}>
              {' '}
              AI SDK, SQLite, Drizzle ORM | Automated development
            </Text>
            <Text color={RETRO_COLORS.neonPink}>• Starter-Flare - Full-Stack SaaS Boilerplate</Text>
            <Text color={RETRO_COLORS.electricBlue}> Cloudflare Workers, React Router, Hono</Text>
            <Text color={RETRO_COLORS.neonPink}>• GetMD - Website to Markdown Converter</Text>
            <Text color={RETRO_COLORS.electricBlue}> High-performance Rust server</Text>
          </Box>
        </Box>
      </Box>
      <Box borderStyle="single" borderColor={RETRO_COLORS.neonYellow} padding={1}>
        <Box flexDirection="column">
          <Text color={RETRO_COLORS.neonCyan} bold>
            📺 Personal TUI Website (This!)
          </Text>
          <Text color={RETRO_COLORS.softCyan}>Bun, Ink, TTYD | Interactive terminal portfolio</Text>
          <Text color={RETRO_COLORS.softCyan}>
            Accessible via who.mohil.dev and SSH at why.mohil.dev
          </Text>
        </Box>
      </Box>
    </Box>
  )

  const renderSkills = () => (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor={RETRO_COLORS.neonCyan} padding={2} marginBottom={1}>
        <Box flexDirection="column">
          <Text color={RETRO_COLORS.neonPink} bold>
            ⚙️ Technical Skills
          </Text>
          <Box marginTop={1}>
            <Text color={RETRO_COLORS.neonYellow}>Programming:</Text>
            <Text color={RETRO_COLORS.softGreen}>TypeScript, Python, Kotlin, Rust, C++, SQL</Text>
            <Text color={RETRO_COLORS.neonYellow}>Frameworks:</Text>
            <Text color={RETRO_COLORS.softGreen}>
              Next.js, FastAPI, Django, Vue.js, Express.js, tRPC
            </Text>
            <Text color={RETRO_COLORS.neonYellow}>ML/AI:</Text>
            <Text color={RETRO_COLORS.softGreen}>
              AWS SageMaker, AI SDK, Google Gemini API, TensorFlow
            </Text>
          </Box>
        </Box>
      </Box>
      <Box borderStyle="single" borderColor={RETRO_COLORS.retroRed} padding={1}>
        <Box flexDirection="column">
          <Text color={RETRO_COLORS.neonOrange} bold>
            ☁️ DevOps & Cloud:
          </Text>
          <Text color={RETRO_COLORS.neonCyan}>
            AWS (EC2, ECS, S3, CloudFront), Docker, CI/CD, Turborepo
          </Text>
          <Text color={RETRO_COLORS.neonOrange} bold>
            🗄️ Databases:
          </Text>
          <Text color={RETRO_COLORS.neonCyan}>PostgreSQL, MongoDB, SQLite, Drizzle ORM</Text>
        </Box>
      </Box>
    </Box>
  )

  const renderContact = () => (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor={RETRO_COLORS.neonPurple} padding={2} marginBottom={1}>
        <Box flexDirection="column">
          <Text color={RETRO_COLORS.neonGreen} bold>
            📧 Get In Touch
          </Text>
          <Box marginTop={1}>
            <Text color={RETRO_COLORS.neonPink}>Email:</Text>
            <Text color={RETRO_COLORS.electricBlue}>mohilg@outlook.com</Text>
            <Text color={RETRO_COLORS.neonPink}>Portfolio:</Text>
            <Text color={RETRO_COLORS.electricBlue}>mohil.dev</Text>
            <Text color={RETRO_COLORS.neonPink}>GitHub:</Text>
            <Text color={RETRO_COLORS.electricBlue}>github.com/mohilcode</Text>
            <Text color={RETRO_COLORS.neonPink}>Mobile:</Text>
            <Text color={RETRO_COLORS.electricBlue}>+81 80-9416-6969</Text>
          </Box>
        </Box>
      </Box>
      <Box borderStyle="single" borderColor={RETRO_COLORS.neonCyan} padding={1}>
        <Box flexDirection="column">
          <Text color={RETRO_COLORS.neonYellow} bold>
            👾 Available for:
          </Text>
          <Text color={RETRO_COLORS.softGreen}>• Full-stack development projects</Text>
          <Text color={RETRO_COLORS.softGreen}>• DevOps and cloud architecture consulting</Text>
          <Text color={RETRO_COLORS.softGreen}>• Technical leadership roles</Text>
          <Text color={RETRO_COLORS.softGreen}>• Open source collaboration</Text>
        </Box>
      </Box>
    </Box>
  )

  const renderGallery = () => (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor={RETRO_COLORS.neonYellow} padding={2} marginBottom={1}>
        <Box flexDirection="column">
          <Text color={RETRO_COLORS.neonGreen} bold>
            ASCII Art Gallery
          </Text>
          <Box marginTop={1}>
            <Text color={RETRO_COLORS.neonCyan}>
              {`    /\_/\  
   ( o.o ) 
    > ^ <`}
            </Text>
            <Text color={RETRO_COLORS.neonPink} marginLeft={10}>
              {`  ╔══════════╗
  ║ RETRO OS ║
  ╚══════════╝`}
            </Text>
            <Text color={RETRO_COLORS.neonOrange} marginTop={1}>
              {`┌─────────────────┐
│ LOADING...████  │
└─────────────────┘`}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box borderStyle="single" borderColor={RETRO_COLORS.darkPurple} padding={1}>
        <Box flexDirection="column">
          <Text color={RETRO_COLORS.retroBlue} bold>
            Terminal Vibes
          </Text>
          <Text color={RETRO_COLORS.softGreen}>• Classic 80s computing aesthetics</Text>
          <Text color={RETRO_COLORS.softGreen}>• Neon colors and retro styling</Text>
          <Text color={RETRO_COLORS.softGreen}>• Interactive terminal experience</Text>
        </Box>
      </Box>
    </Box>
  )

  const renderTerminal = () => (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor={RETRO_COLORS.neonGreen} padding={2} marginBottom={1}>
        <Box flexDirection="column">
          <Text color={RETRO_COLORS.neonCyan} bold>
            ~ Terminal Commands ~
          </Text>
          <Box marginTop={1}>
            <Text color={RETRO_COLORS.neonGreen}>$ whoami</Text>
            <Text color={RETRO_COLORS.softCyan}>mohil-garg</Text>
            <Text color={RETRO_COLORS.neonGreen}>$ pwd</Text>
            <Text color={RETRO_COLORS.softCyan}>/home/mohil/portfolio</Text>
            <Text color={RETRO_COLORS.neonGreen}>$ ls -la</Text>
            <Text color={RETRO_COLORS.softCyan}>drwxr-xr-x projects/</Text>
            <Text color={RETRO_COLORS.softCyan}>drwxr-xr-x experience/</Text>
            <Text color={RETRO_COLORS.softCyan}>-rw-r--r-- skills.txt</Text>
            <Text color={RETRO_COLORS.softCyan}>-rw-r--r-- about.md</Text>
          </Box>
        </Box>
      </Box>
      <Box borderStyle="single" borderColor={RETRO_COLORS.retroBlue} padding={1}>
        <Box flexDirection="column">
          <Text color={RETRO_COLORS.neonYellow} bold>
            System Info:
          </Text>
          <Text color={RETRO_COLORS.electricBlue}>OS: RetroLinux 2024</Text>
          <Text color={RETRO_COLORS.electricBlue}>Shell: /bin/zsh</Text>
          <Text color={RETRO_COLORS.electricBlue}>Uptime: ∞ hours (passion mode)</Text>
        </Box>
      </Box>
    </Box>
  )

  const renderGames = () => (
    <Box flexDirection="column">
      <Box borderStyle="round" borderColor={RETRO_COLORS.neonPurple} padding={2} marginBottom={1}>
        <Box flexDirection="column">
          <Text color={RETRO_COLORS.neonYellow} bold>
            Retro Games Corner
          </Text>
          <Box marginTop={1}>
            <Text color={RETRO_COLORS.neonPink}>🎮 Snake Game:</Text>
            <Text color={RETRO_COLORS.softPink}>▓▓▓▓▓▓▓▓▓▓</Text>
            <Text color={RETRO_COLORS.softPink}>▓ ▓</Text>
            <Text color={RETRO_COLORS.softPink}>▓ ████ ▓</Text>
            <Text color={RETRO_COLORS.softPink}>▓ ◉ ▓</Text>
            <Text color={RETRO_COLORS.softPink}>▓▓▓▓▓▓▓▓▓▓</Text>
            <Text color={RETRO_COLORS.neonOrange} marginTop={1}>
              🕹️ Pong:
            </Text>
            <Text color={RETRO_COLORS.neonCyan}>█ ◉ █</Text>
            <Text color={RETRO_COLORS.neonCyan}>█ █</Text>
            <Text color={RETRO_COLORS.neonCyan}>█ █</Text>
          </Box>
        </Box>
      </Box>
      <Box borderStyle="single" borderColor={RETRO_COLORS.deepMagenta} padding={1}>
        <Box flexDirection="column">
          <Text color={RETRO_COLORS.retroRed} bold>
            High Scores:
          </Text>
          <Text color={RETRO_COLORS.softGreen}>1. MOHIL .... 99999</Text>
          <Text color={RETRO_COLORS.softGreen}>2. GUEST .... 12345</Text>
          <Text color={RETRO_COLORS.softGreen}>3. USER ..... 00001</Text>
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
      case 'gallery':
        return renderGallery()
      case 'terminal':
        return renderTerminal()
      case 'games':
        return renderGames()
      case 'contact':
        return renderContact()
      default:
        return renderHome()
    }
  }

  const renderFooter = () => (
    <Box borderStyle="single" borderColor={RETRO_COLORS.neonCyan} padding={1} marginTop={1}>
      <Box flexDirection="row" justifyContent="space-between">
        <Text color={RETRO_COLORS.electricBlue}>
          Navigation: ↑↓ arrows, [hotkeys], Enter | Search: / | Exit: Esc
        </Text>
        {isSearchMode && (
          <Box>
            <Text color={RETRO_COLORS.neonPink}>Search: {inputText}</Text>
          </Box>
        )}
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
