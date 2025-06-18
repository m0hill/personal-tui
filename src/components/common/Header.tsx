import { useState, useEffect } from 'react'
import { Box, Text } from 'ink'
import { theme } from '../../theme.js'

const WAVE_FRAMES = ['◇', '◆', '◇', '◈']

export default function Header() {
  const [waveFrame, setWaveFrame] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setWaveFrame(prev => (prev + 1) % WAVE_FRAMES.length)
    }, 500)
    return () => clearInterval(timer)
  }, [])

  return (
    <Box
      borderStyle="double"
      borderColor={theme.secondary}
      paddingX={1}
      marginBottom={1}
      flexDirection="column"
      alignItems="center"
    >
      <Text color={theme.fg} bold>
        {WAVE_FRAMES[waveFrame]} MOHIL GARG - FULL-STACK ENGINEER {WAVE_FRAMES[waveFrame]}
      </Text>
      <Text color={theme.fgMuted}>Portfolio • mohil.dev • GitHub: mohilcode</Text>
    </Box>
  )
}
