import { useState, useEffect } from 'react'
import { Box, Text, useInput } from 'ink'
import { theme } from '../theme.js'

interface WelcomeScreenProps {
  onComplete: () => void
}

const BOOT_MESSAGES = [
  'Initializing Retro-Encabulator...',
  'Calibrating Flux Capacitor...',
  'Authenticating with Skynet...',
  'Loading Personal Data Matrix...',
  'Portfolio ready for exploration!'
]

const LOADING_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [loadingFrame, setLoadingFrame] = useState(0)
  const [bootComplete, setBootComplete] = useState(false)

  useEffect(() => {
    const frameTimer = setInterval(() => {
      setLoadingFrame(prev => (prev + 1) % LOADING_FRAMES.length)
    }, 100)
    return () => clearInterval(frameTimer)
  }, [])

  useEffect(() => {
    if (currentMessageIndex < BOOT_MESSAGES.length) {
      const messageTimer = setTimeout(
        () => {
          setCurrentMessageIndex(prev => prev + 1)
        },
        currentMessageIndex === BOOT_MESSAGES.length - 1 ? 1000 : 500
      )
      return () => clearTimeout(messageTimer)
    }
    setBootComplete(true)
  }, [currentMessageIndex])

  useEffect(() => {
    if (bootComplete) {
      const completionTimer = setTimeout(onComplete, 1000)
      return () => clearTimeout(completionTimer)
    }
  }, [bootComplete, onComplete])

  useInput((input, key) => {
    if (key.return || key.escape || (key.ctrl && input === 'c')) {
      onComplete()
    }
  })

  return (
    <Box flexDirection="column" alignItems="center" justifyContent="center" height={15} padding={2}>
      <Box
        borderStyle="double"
        borderColor={theme.primary}
        padding={2}
        flexDirection="column"
        alignItems="center"
      >
        <Text color={theme.secondary} bold>
          ◆ PORTFOLIO SYSTEM BOOT SEQUENCE ◆
        </Text>
        <Box flexDirection="column" marginTop={1}>
          {BOOT_MESSAGES.slice(0, currentMessageIndex).map(message => (
            <Text key={message} color={theme.green}>
              [✓] {message}
            </Text>
          ))}
          {currentMessageIndex < BOOT_MESSAGES.length && (
            <Text color={theme.yellow}>
              [{LOADING_FRAMES[loadingFrame]}] {BOOT_MESSAGES[currentMessageIndex]}
            </Text>
          )}
        </Box>
        {bootComplete && (
          <Box marginTop={1}>
            <Text color={theme.accent} bold>
              Press Enter to continue...
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}
