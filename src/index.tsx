import { useState, useEffect } from 'react'
import { render, Box, Text } from 'ink'
import WelcomeScreen from './components/WelcomeScreen.js'
import MenuScreen from './components/MenuScreen.js'
import DisplayOnlyMenu from './components/DisplayOnlyMenu.js'

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
        <Box borderStyle="round" borderColor="#BF00FF" padding={2}>
          <Text color="#E6E6FA">◇ Initializing Portfolio System ◇</Text>
        </Box>
        <Box marginTop={1}>
          <Text color="#DDA0DD">Loading personal website...</Text>
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
