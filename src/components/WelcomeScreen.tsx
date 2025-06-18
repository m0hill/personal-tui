import { useState, useEffect } from 'react'
import { Box, Text, useInput } from 'ink'

// Initialize stdin for proper input handling
process.stdin.setRawMode?.(true)
process.stdin.resume()
process.stdin.setEncoding('utf8')

interface WelcomeScreenProps {
  onComplete: (name?: string) => void
}

const BOOT_MESSAGES = [
  'Initializing kernel modules...',
  'Loading device drivers...',
  'Starting network services...',
  'Mounting filesystems...',
  'Loading development environment...',
  'Initializing package managers...',
  'Starting code servers...',
  'System ready for development!'
]

const ASCII_BANNER = `
╔═══════════════════════════════════════════════════════════════════════╗
║                                                                       ║
║  ███╗   ███╗ ██████╗ ██╗  ██╗██╗██╗         ████████╗██╗   ██╗██╗     ║
║  ████╗ ████║██╔═══██╗██║  ██║██║██║         ╚══██╔══╝██║   ██║██║     ║
║  ██╔████╔██║██║   ██║███████║██║██║            ██║   ██║   ██║██║     ║
║  ██║╚██╔╝██║██║   ██║██╔══██║██║██║            ██║   ██║   ██║██║     ║
║  ██║ ╚═╝ ██║╚██████╔╝██║  ██║██║███████╗       ██║   ╚██████╔╝██║     ║
║  ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝       ╚═╝    ╚═════╝ ╚═╝     ║
║                                                                       ║
║                   ~ S U R F I N G   E N T R O P Y   S T A T E S ~     ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝`

const LOADING_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
const WAVE_FRAMES = ['~', '~~', '~~~', '~~~~', '~~~~~', '~~~~~~', '~~~~~~~']

type ScreenState = 'booting' | 'banner' | 'nameInput' | 'welcome' | 'completed'

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [state, setState] = useState<ScreenState>('booting')
  const [currentMessage, setCurrentMessage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [name, setName] = useState('')
  const [isInputMode, setIsInputMode] = useState(false)
  const [loadingFrame, setLoadingFrame] = useState(0)
  const [waveFrame, setWaveFrame] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  // Loading animation
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingFrame(prev => (prev + 1) % LOADING_FRAMES.length)
      setWaveFrame(prev => (prev + 1) % WAVE_FRAMES.length)
    }, 150)
    return () => clearInterval(timer)
  }, [])

  // Cursor blinking
  useEffect(() => {
    const timer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(timer)
  }, [])

  // Boot animation
  useEffect(() => {
    if (state !== 'booting') return

    const timer = setInterval(() => {
      setCurrentMessage(prev => {
        const next = prev + 1
        if (next >= BOOT_MESSAGES.length) {
          setState('banner')
          return prev
        }
        return next
      })
      setProgress(prev => Math.min(prev + 100 / BOOT_MESSAGES.length, 100))
    }, 600)

    return () => clearInterval(timer)
  }, [state])

  // Auto-transition from banner to name input
  useEffect(() => {
    if (state === 'banner') {
      const timer = setTimeout(() => {
        setState('nameInput')
        setIsInputMode(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [state])

  // Handle input with improved logic
  useInput((input, key) => {
    if (input === 'q' || input === 'Q' || key.escape || (key.ctrl && input === 'c')) {
      setTimeout(() => {
        process.exit(0)
      }, 100)
      return
    }

    if (state === 'nameInput') {
      if (key.return) {
        setIsInputMode(false)
        setState('welcome')
        setTimeout(() => {
          setState('completed')
          onComplete(name.trim() || undefined)
        }, 2500)
      } else if (key.backspace) {
        setName(prev => prev.slice(0, -1))
      } else if (input && input.length === 1 && input !== 'q' && input !== 'Q') {
        setName(prev => prev + input)
      }
    } else if (state === 'welcome' || state === 'completed') {
      setState('completed')
      onComplete(name.trim() || undefined)
    }
  })

  const renderBootScreen = () => (
    <Box flexDirection="column" alignItems="center" borderStyle="round" borderColor="#B0C4DE" padding={2}>
      <Box marginBottom={2}>
        <Text color="#B0E0E6" bold>
          ◆ DEVELOPMENT SYSTEM BOOT SEQUENCE ◆
        </Text>
      </Box>

      <Box flexDirection="column" width={50}>
        {BOOT_MESSAGES.slice(0, currentMessage + 1).map((message, index) => (
          <Box key={`boot-message-${message.slice(0, 15)}`} marginBottom={1}>
            <Text color="#4682B4">
              [{index === currentMessage ? LOADING_FRAMES[loadingFrame] : '●'}]
            </Text>
            <Box marginLeft={1}>
              <Text color={index === currentMessage ? "#B0E0E6" : "#708090"}>
                {message}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>

      {currentMessage < BOOT_MESSAGES.length - 1 && (
        <Box marginTop={3} flexDirection="column" alignItems="center">
          <Text color="#B0E0E6">
            System Loading: {Math.round(progress)}%
          </Text>
          <Box marginTop={1}>
            <Text color="#4682B4">
              {'█'.repeat(Math.floor(progress / 2.5))}
              <Text color="#B0C4DE">
                {'▓'.repeat(Math.floor((100 - progress) / 10))}
                {'░'.repeat(Math.max(0, 40 - Math.floor(progress / 2.5) - Math.floor((100 - progress) / 10)))}
              </Text>
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  )

  const renderBanner = () => (
    <Box flexDirection="column" alignItems="center">
      <Box borderStyle="double" borderColor="#4682B4" padding={1}>
        <Text color="#B0E0E6">{ASCII_BANNER}</Text>
      </Box>
      <Box marginTop={2}>
        <Text color="#B0E0E6">
          {WAVE_FRAMES[waveFrame]} Welcome to Mohil's Development Environment {WAVE_FRAMES[waveFrame]}
        </Text>
      </Box>
      <Box marginTop={1}>
        <Text color="#708090">Full-stack developer • System architect • Code craftsman</Text>
      </Box>
    </Box>
  )

  const renderNameInput = () => (
    <Box flexDirection="column" alignItems="center">
      <Box borderStyle="round" borderColor="#B0C4DE" padding={1}>
        <Text color="#B0E0E6">{ASCII_BANNER}</Text>
      </Box>

      <Box marginTop={3} marginBottom={2} borderStyle="single" borderColor="#708090" padding={1}>
        <Text color="#4682B4">◇ USER AUTHENTICATION PROTOCOL ◇</Text>
      </Box>

      <Box marginBottom={2}>
        <Text color="#B0E0E6">Enter your username for personalized experience:</Text>
      </Box>

      <Box borderStyle="round" borderColor="#4682B4" padding={1} width={40}>
        <Text color="#708090">$ </Text>
        <Text color="#FFFAFA">{name}</Text>
        {isInputMode && showCursor && <Text color="#B0E0E6">█</Text>}
        {!isInputMode && <Text color="#708090"> (processing...)</Text>}
      </Box>

      <Box marginTop={2} flexDirection="column" alignItems="center">
        <Text color="#708090">Press ENTER to continue • Leave empty for guest access</Text>
        <Text color="#708090">Press 'q' or Ctrl+C to exit</Text>
      </Box>
    </Box>
  )

  const renderWelcome = () => (
    <Box flexDirection="column" alignItems="center">
      <Box borderStyle="double" borderColor="#4682B4" padding={1}>
        <Text color="#B0E0E6">{ASCII_BANNER}</Text>
      </Box>

      <Box marginTop={3} borderStyle="round" borderColor="#B0E0E6" padding={2}>
        <Box flexDirection="column" alignItems="center">
          <Text color="#4682B4" bold>
            ◆ SESSION INITIALIZED SUCCESSFULLY ◆
          </Text>
          <Box marginTop={1}>
            <Text color="#FFFAFA" bold>
              Welcome, {name.trim() ? name.trim() : 'Guest User'}!
            </Text>
          </Box>
          <Box marginTop={1}>
            <Text color="#708090">
              Development environment ready for exploration
            </Text>
          </Box>
        </Box>
      </Box>

      <Box marginTop={2}>
        <Text color="#B0C4DE">
          {WAVE_FRAMES[waveFrame]} Loading main interface {WAVE_FRAMES[waveFrame]}
        </Text>
      </Box>

      <Box marginTop={2}>
        <Text color="#708090">Press any key to continue...</Text>
      </Box>
    </Box>
  )

  switch (state) {
    case 'booting':
      return renderBootScreen()
    case 'banner':
      return renderBanner()
    case 'nameInput':
      return renderNameInput()
    case 'welcome':
    case 'completed':
      return renderWelcome()
    default:
      return null
  }
}