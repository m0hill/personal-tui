import { useState, useEffect } from 'react'
import { Box, Text, useInput } from 'ink'

interface WelcomeScreenProps {
  onComplete: () => void
}

const BOOT_MESSAGES = ['Loading personal data...', 'Portfolio ready for exploration!']

const ASCII_BANNER = `
   ╭─────────────────────────────────────────────────╮
   │    ███    ███  ██████  ██   ██ ██ ██           │
   │    ████  ████ ██    ██ ██   ██ ██ ██           │
   │    ██ ████ ██ ██    ██ ███████ ██ ██           │
   │    ██  ██  ██ ██    ██ ██   ██ ██ ██           │
   │    ██      ██  ██████  ██   ██ ██ ███████      │
   │                                                │
   │       ~ R E T R O   P O R T F O L I O ~         │
   ╰─────────────────────────────────────────────────╯`

const LOADING_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
const WAVE_FRAMES = ['~', '~~', '~~~', '~~~~', '~~~~~', '~~~~~~', '~~~~~~~']
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

type ScreenState = 'booting' | 'banner' | 'welcome' | 'completed'

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [state, setState] = useState<ScreenState>('booting')
  const [currentMessage, setCurrentMessage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [loadingFrame, setLoadingFrame] = useState(0)
  const [waveFrame, setWaveFrame] = useState(0)

  // Loading animation
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingFrame(prev => (prev + 1) % LOADING_FRAMES.length)
      setWaveFrame(prev => (prev + 1) % WAVE_FRAMES.length)
    }, 150)
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
    }, 800)

    return () => clearInterval(timer)
  }, [state])

  // Auto-transition from banner to welcome
  useEffect(() => {
    if (state === 'banner') {
      const timer = setTimeout(() => {
        setState('welcome')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [state])

  // Auto-advance for non-TTY environments
  useEffect(() => {
    if (!process.stdin.isTTY && state === 'welcome') {
      const timer = setTimeout(() => {
        setState('completed')
        onComplete()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [state, onComplete])

  // Handle input for TTY environments
  useInput((input, key) => {
    if (input === 'q' || input === 'Q' || key.escape || (key.ctrl && input === 'c')) {
      setTimeout(() => {
        process.exit(0)
      }, 100)
      return
    }

    if (state === 'welcome') {
      setState('completed')
      setTimeout(() => {
        onComplete()
      }, 500)
    }
  })

  const renderBootScreen = () => (
    <Box
      flexDirection="column"
      alignItems="center"
      borderStyle="round"
      borderColor={RETRO_COLORS.neonCyan}
      padding={2}
    >
      <Box marginBottom={2}>
        <Text color={RETRO_COLORS.neonPink} bold>
          ◆ PORTFOLIO SYSTEM BOOT SEQUENCE ◆
        </Text>
      </Box>

      <Box flexDirection="column" width={50}>
        {BOOT_MESSAGES.slice(0, currentMessage + 1).map((message, index) => (
          <Box key={`boot-message-${message.slice(0, 15)}`} marginBottom={1}>
            <Text color={RETRO_COLORS.neonGreen}>
              [{index === currentMessage ? LOADING_FRAMES[loadingFrame] : '●'}]
            </Text>
            <Box marginLeft={1}>
              <Text
                color={index === currentMessage ? RETRO_COLORS.neonYellow : RETRO_COLORS.softCyan}
              >
                {message}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>

      {currentMessage < BOOT_MESSAGES.length - 1 && (
        <Box marginTop={3} flexDirection="column" alignItems="center">
          <Text color={RETRO_COLORS.neonCyan}>System Loading: {Math.round(progress)}%</Text>
          <Box marginTop={1}>
            <Text color={RETRO_COLORS.neonPink}>
              {'█'.repeat(Math.floor(progress / 2.5))}
              <Text color={RETRO_COLORS.neonGreen}>
                {'▓'.repeat(Math.floor((100 - progress) / 10))}
                {'░'.repeat(
                  Math.max(0, 40 - Math.floor(progress / 2.5) - Math.floor((100 - progress) / 10))
                )}
              </Text>
            </Text>
          </Box>
        </Box>
      )}
    </Box>
  )

  const renderBanner = () => (
    <Box flexDirection="column" alignItems="center">
      <Box borderStyle="double" borderColor={RETRO_COLORS.neonYellow} padding={1}>
        <Text color={RETRO_COLORS.neonCyan}>{ASCII_BANNER}</Text>
      </Box>
      <Box marginTop={2}>
        <Text color={RETRO_COLORS.neonPink}>
          {WAVE_FRAMES[waveFrame]} Welcome to Mohil's Portfolio {WAVE_FRAMES[waveFrame]}
        </Text>
      </Box>
      <Box marginTop={1}>
        <Text color={RETRO_COLORS.electricBlue}>
          Full-stack developer • DevOps engineer • AI enthusiast
        </Text>
      </Box>
    </Box>
  )

  const renderWelcome = () => (
    <Box flexDirection="column" alignItems="center">
      <Box borderStyle="double" borderColor={RETRO_COLORS.neonPink} padding={1}>
        <Text color={RETRO_COLORS.neonGreen}>{ASCII_BANNER}</Text>
      </Box>

      <Box marginTop={3} borderStyle="round" borderColor={RETRO_COLORS.neonCyan} padding={2}>
        <Box flexDirection="column" alignItems="center">
          <Text color={RETRO_COLORS.neonYellow} bold>
            ◆ PORTFOLIO SYSTEM READY ◆
          </Text>
          <Box marginTop={1}>
            <Text color={RETRO_COLORS.neonPink} bold>
              Welcome to Mohil Garg's Digital Portfolio
            </Text>
          </Box>
          <Box marginTop={1}>
            <Text color={RETRO_COLORS.electricBlue}>
              Full-Stack & DevOps Engineer • Ready for exploration
            </Text>
          </Box>
        </Box>
      </Box>

      <Box marginTop={2}>
        <Text color={RETRO_COLORS.neonOrange}>
          {WAVE_FRAMES[waveFrame]} Loading main interface {WAVE_FRAMES[waveFrame]}
        </Text>
      </Box>

      <Box marginTop={2}>
        <Text color={RETRO_COLORS.softCyan}>Press any key to continue...</Text>
      </Box>
    </Box>
  )

  switch (state) {
    case 'booting':
      return renderBootScreen()
    case 'banner':
      return renderBanner()
    case 'welcome':
    case 'completed':
      return renderWelcome()
    default:
      return null
  }
}
