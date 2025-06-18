import { useState, useEffect } from 'react'
import { Box, Text, useInput, useApp } from 'ink'

interface MenuScreenProps {
  userName?: string
}

const WAVE_FRAMES = ['~', '~~', '~~~', '~~~~', '~~~~~', '~~~~~~', '~~~~~~~']
const PULSE_FRAMES = ['◇', '◆', '◇', '◈']

export default function MenuScreen({ userName }: MenuScreenProps) {
  const [waveFrame, setWaveFrame] = useState(0)
  const [pulseFrame, setPulseFrame] = useState(0)
  const { exit } = useApp()

  // Animation effects
  useEffect(() => {
    const timer = setInterval(() => {
      setWaveFrame(prev => (prev + 1) % WAVE_FRAMES.length)
      setPulseFrame(prev => (prev + 1) % PULSE_FRAMES.length)
    }, 200)
    return () => clearInterval(timer)
  }, [])

  useInput((input, key) => {
    if (input === 'q' || (key.ctrl && input === 'c')) {
      exit()
      return
    }
  })

  const displayName = userName ? userName : 'Guest User'

  return (
    <Box flexDirection="column" alignItems="center" paddingTop={2}>
      {/* Header */}
      <Box borderStyle="double" borderColor="#4682B4" padding={2} marginBottom={2}>
        <Box flexDirection="column" alignItems="center">
          <Text color="#B0E0E6" bold>
            {PULSE_FRAMES[pulseFrame]} MOHIL'S DEVELOPMENT ENVIRONMENT {PULSE_FRAMES[pulseFrame]}
          </Text>
          <Text color="#708090">~ Surfing Entropy States ~</Text>
        </Box>
      </Box>

      {/* Welcome Message */}
      <Box borderStyle="round" borderColor="#B0C4DE" padding={3} marginBottom={3}>
        <Box flexDirection="column" alignItems="center">
          <Text color="#4682B4" bold>
            {WAVE_FRAMES[waveFrame]} Hello, {displayName}! {WAVE_FRAMES[waveFrame]}
          </Text>
          <Box marginTop={1}>
            <Text color="#FFFAFA">
              Welcome to the development workspace
            </Text>
          </Box>
          <Box marginTop={1}>
            <Text color="#708090">
              All systems operational, ready for coding
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Status Panel */}
      <Box borderStyle="single" borderColor="#708090" padding={2} marginBottom={2}>
        <Box flexDirection="column">
          <Box>
            <Text color="#B0C4DE">Session Status: </Text>
            <Text color="#4682B4" bold>ACTIVE</Text>
          </Box>
          <Box marginTop={1}>
            <Text color="#B0C4DE">Environment: </Text>
            <Text color="#B0E0E6">DEVELOPMENT</Text>
          </Box>
          <Box marginTop={1}>
            <Text color="#B0C4DE">User: </Text>
            <Text color="#FFFAFA">{displayName}</Text>
          </Box>
        </Box>
      </Box>

      {/* Navigation Hint */}
      <Box marginTop={2}>
        <Text color="#708090">
          [Main interface coming soon... Press 'q' to disconnect]
        </Text>
      </Box>

      {/* Footer Animation */}
      <Box marginTop={3}>
        <Text color="#B0C4DE">
          {WAVE_FRAMES[waveFrame]} {WAVE_FRAMES[(waveFrame + 3) % WAVE_FRAMES.length]} {WAVE_FRAMES[(waveFrame + 6) % WAVE_FRAMES.length]}
        </Text>
      </Box>
    </Box>
  )
}