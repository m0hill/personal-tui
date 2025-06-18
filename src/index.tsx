import { useState, useEffect } from 'react'
import { render, Box, Text } from 'ink'
import WelcomeScreen from './components/WelcomeScreen.js'
import MenuScreen from './components/MenuScreen.js'

type AppState = 'loading' | 'welcome' | 'menu'

function App() {
  const [state, setState] = useState<AppState>('loading')
  const [userName, setUserName] = useState<string | undefined>()

  useEffect(() => {
    // Simulate initialization delay
    const timer = setTimeout(() => {
      setState('welcome')
    }, 1500)

    return () => clearInterval(timer)
  }, [])

  const handleWelcomeComplete = (name?: string) => {
    setUserName(name)
    setState('menu')
  }

  if (state === 'loading') {
    return (
      <Box flexDirection="column" alignItems="center" justifyContent="center" height={10}>
        <Box borderStyle="round" borderColor="#B0C4DE" padding={2}>
          <Text color="#B0E0E6">◇ Initializing Digital Consciousness ◇</Text>
        </Box>
        <Box marginTop={1}>
          <Text color="#708090">Connecting to entropy matrix...</Text>
        </Box>
      </Box>
    )
  }

  if (state === 'welcome') {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />
  }

  if (state === 'menu') {
    return <MenuScreen userName={userName} />
  }

  return null
}

render(<App />)
