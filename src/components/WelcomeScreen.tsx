import { useState, useEffect } from 'react'
import { Box, Text, useInput, useApp } from 'ink'

interface WelcomeScreenProps {
  onComplete: (name?: string) => void
  visitorCount: number
}

const BOOT_MESSAGES = [
  'Initializing system...',
  'Loading kernel modules...',
  'Starting network services...',
  'Mounting filesystems...',
  'Starting database engine...',
  'Preparing welcome interface...',
  'System ready!'
]

const ASCII_BANNER = `
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║    ██████╗ ███████╗██████╗ ███████╗ ██████╗ ███╗   ██╗ █████╗ ║
║    ██╔══██╗██╔════╝██╔══██╗██╔════╝██╔═══██╗████╗  ██║██╔══██╗║
║    ██████╔╝█████╗  ██████╔╝███████╗██║   ██║██╔██╗ ██║███████║║
║    ██╔═══╝ ██╔══╝  ██╔══██╗╚════██║██║   ██║██║╚██╗██║██╔══██║║
║    ██║     ███████╗██║  ██║███████║╚██████╔╝██║ ╚████║██║  ██║║
║    ╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝║
║                                                               ║
║                     T U I   W E B S I T E                     ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`

type ScreenState = 'booting' | 'banner' | 'nameInput' | 'welcome' | 'completed'

export default function WelcomeScreen({ onComplete, visitorCount }: WelcomeScreenProps) {
  const [state, setState] = useState<ScreenState>('booting')
  const [currentMessage, setCurrentMessage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [name, setName] = useState('')
  const [isInputMode, setIsInputMode] = useState(false)
  const { exit } = useApp()

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
    }, 400)

    return () => clearInterval(timer)
  }, [state])

  // Auto-transition from banner to name input
  useEffect(() => {
    if (state === 'banner') {
      const timer = setTimeout(() => {
        setState('nameInput')
        setIsInputMode(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [state])

  // Handle input
  useInput((input, key) => {
    if (input === 'q' || (key.ctrl && input === 'c')) {
      exit()
      return
    }

    if (state === 'nameInput') {
      if (key.return) {
        setIsInputMode(false)
        setState('welcome')
        // Auto-complete after showing welcome
        setTimeout(() => {
          setState('completed')
          onComplete(name.trim() || undefined)
        }, 2000)
      } else if (key.backspace || key.delete) {
        setName(prev => prev.slice(0, -1))
      } else if (input && !key.ctrl && !key.meta) {
        setName(prev => prev + input)
      }
    } else if (state === 'welcome' || state === 'completed') {
      setState('completed')
      onComplete(name.trim() || undefined)
    }
  })

  const renderBootScreen = () => (
    <Box flexDirection="column" alignItems="center">
      <Box marginBottom={2}>
        <Text color="cyan" bold>
          SYSTEM BOOT SEQUENCE
        </Text>
      </Box>

      <Box marginBottom={2}>
        <Text color="green">
          [{currentMessage >= 0 ? '✓' : ' '}] {BOOT_MESSAGES[0]}
        </Text>
      </Box>
      {BOOT_MESSAGES.slice(1, currentMessage + 1).map((message, index) => (
        <Box key={`boot-${index + 1}`} marginBottom={1}>
          <Text color="green">[✓] {message}</Text>
        </Box>
      ))}

      {currentMessage < BOOT_MESSAGES.length - 1 && (
        <Box marginTop={2}>
          <Text color="yellow">Loading... {Math.round(progress)}%</Text>
          <Box marginLeft={2}>
            <Text color="cyan">
              {'█'.repeat(Math.floor(progress / 5))}
              {'░'.repeat(20 - Math.floor(progress / 5))}
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  )

  const renderBanner = () => (
    <Box flexDirection="column" alignItems="center">
      <Text color="cyan">{ASCII_BANNER}</Text>
      <Box marginTop={2}>
        <Text color="green">Welcome to my personal TUI website!</Text>
      </Box>
      <Box marginTop={1}>
        <Text color="gray">Total visitors: {visitorCount}</Text>
      </Box>
    </Box>
  )

  const renderNameInput = () => (
    <Box flexDirection="column" alignItems="center">
      <Text color="cyan">{ASCII_BANNER}</Text>
      <Box marginTop={2} marginBottom={2}>
        <Text color="yellow">What's your name? (Press Enter to skip)</Text>
      </Box>
      <Box>
        <Text color="white">
          {'> '}
          <Text color="green">{name}</Text>
          {isInputMode && <Text color="cyan">█</Text>}
        </Text>
      </Box>
      <Box marginTop={2}>
        <Text color="gray">Press 'q' to quit</Text>
      </Box>
    </Box>
  )

  const renderWelcome = () => (
    <Box flexDirection="column" alignItems="center">
      <Text color="cyan">{ASCII_BANNER}</Text>
      <Box marginTop={2}>
        <Text color="green" bold>
          Welcome {name.trim() ? name.trim() : 'Guest'}!
        </Text>
      </Box>
      <Box marginTop={1}>
        <Text color="gray">You are visitor #{visitorCount + 1}</Text>
      </Box>
      <Box marginTop={2}>
        <Text color="yellow">Press any key to continue...</Text>
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
