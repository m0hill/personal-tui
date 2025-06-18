import { useState, useEffect } from 'react'
import { render, Box, Text } from 'ink'
import WelcomeScreen from './components/WelcomeScreen.js'
import MenuScreen from './components/MenuScreen.js'
import DisplayOnlyMenu from './components/DisplayOnlyMenu.js'
import { theme } from './theme.js'

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
}

type AppState = 'loading' | 'welcome' | 'menu'

function App() {
  const [state, setState] = useState<AppState>('loading')

  useEffect(() => {
    const timer = setTimeout(() => setState('welcome'), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleWelcomeComplete = () => {
    setState('menu')
  }

  if (state === 'loading') {
    return (
      <Box flexDirection="column" alignItems="center" justifyContent="center" height={10}>
        <Box borderStyle="round" borderColor={theme.primary} padding={1}>
          <Text color={theme.green}>◇ Initializing Portfolio System ◇</Text>
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

if (process.stdin.isTTY) {
  render(<App />, {
    exitOnCtrlC: true,
    patchConsole: false
  })
} else {
  render(<DisplayOnlyMenu />, {
    exitOnCtrlC: false,
    patchConsole: false
  })
}
