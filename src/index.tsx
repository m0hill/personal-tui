import { useState, useEffect } from 'react'
import { render, Box, Text } from 'ink'
import WelcomeScreen from './components/WelcomeScreen.js'
import MenuScreen from './components/MenuScreen.js'
import DisplayOnlyMenu from './components/DisplayOnlyMenu.js'

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

// Initialize stdin for proper input handling
if (process.stdin.isTTY && process.stdin.setRawMode) {
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
}

type AppState = 'loading' | 'welcome' | 'menu'

function App() {
  const [state, setState] = useState<AppState>('loading')

  useEffect(() => {
    const timer = setTimeout(() => {
      setState('welcome')
    }, 1500)

    return () => clearInterval(timer)
  }, [])

  const handleWelcomeComplete = () => {
    setState('menu')
  }

  if (state === 'loading') {
    return (
      <Box flexDirection="column" alignItems="center" justifyContent="center" height={10}>
        <Box borderStyle="round" borderColor={RETRO_COLORS.neonPink} padding={2}>
          <Text color={RETRO_COLORS.neonGreen}>◇ Initializing Portfolio System ◇</Text>
        </Box>
        <Box marginTop={1}>
          <Text color={RETRO_COLORS.neonCyan}>Loading personal website...</Text>
        </Box>
      </Box>
    )
  }

  if (state === 'welcome') {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />
  }

  if (state === 'menu') {
    return <MenuScreen />
  }

  return null
}

// Use display-only version for non-TTY environments
if (!process.stdin.isTTY) {
  render(<DisplayOnlyMenu />, {
    exitOnCtrlC: false,
    patchConsole: false
  })
} else {
  render(<App />, {
    exitOnCtrlC: true,
    patchConsole: false
  })
}
