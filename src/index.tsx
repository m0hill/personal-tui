import { useState, useEffect } from 'react'
import { render, Box, Text } from 'ink'
import WelcomeScreen from './components/WelcomeScreen'
import { initializeDatabase, trackVisitor, getTotalVisitorCount } from './database/db'

type AppState = 'loading' | 'welcome' | 'main'

function App() {
  const [state, setState] = useState<AppState>('loading')
  const [visitorCount, setVisitorCount] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function initialize() {
      try {
        // Initialize database
        initializeDatabase()

        // Get current visitor count
        const count = await getTotalVisitorCount()
        setVisitorCount(count)

        setState('welcome')
      } catch (err) {
        console.error('Initialization error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    }

    initialize()
  }, [])

  const handleWelcomeComplete = async (name?: string) => {
    try {
      // Track the visitor
      await trackVisitor(name)

      // Update visitor count
      const count = await getTotalVisitorCount()
      setVisitorCount(count)

      setState('main')
    } catch (err) {
      console.error('Error tracking visitor:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  if (error) {
    return (
      <Box flexDirection="column" alignItems="center" marginTop={2}>
        <Text color="red" bold>
          Error: {error}
        </Text>
        <Text color="gray">Please check your setup and try again.</Text>
      </Box>
    )
  }

  if (state === 'loading') {
    return (
      <Box flexDirection="column" alignItems="center" marginTop={2}>
        <Text color="cyan">Initializing database...</Text>
      </Box>
    )
  }

  if (state === 'welcome') {
    return <WelcomeScreen onComplete={handleWelcomeComplete} visitorCount={visitorCount} />
  }

  // Main application screen (placeholder for now)
  return (
    <Box flexDirection="column" alignItems="center" marginTop={2}>
      <Text color="green" bold>
        🎉 Welcome to the main application!
      </Text>
      <Text color="gray">This is where your TUI website content will go.</Text>
      <Text color="gray">Total visitors: {visitorCount}</Text>
      <Box marginTop={2}>
        <Text color="yellow">Press Ctrl+C to exit</Text>
      </Box>
    </Box>
  )
}

render(<App />)
