import { useState, useEffect } from 'react'
import { render, Text, Box, useInput } from 'ink'

process.stdin.setRawMode?.(true)
process.stdin.resume()
process.stdin.setEncoding('utf8')

const App = () => {
  const [counter, setCounter] = useState(0)
  const [inputText, setInputText] = useState('')
  const [lastKey, setLastKey] = useState('none')
  const [keyPressCount, setKeyPressCount] = useState(0)

  useInput((input, key) => {
    setKeyPressCount(prev => prev + 1)
    setLastKey(input || 'special key')

    if (input && input.length === 1 && input !== 'q') {
      setInputText(prev => prev + input)
    }

    if (key.backspace) {
      setInputText(prev => prev.slice(0, -1))
    }

    if (key.return) {
      setInputText('')
    }

    console.log('Key pressed:', { input, key, count: keyPressCount + 1 })

    if (input === 'q' || input === 'Q' || key.escape || (key.ctrl && input === 'c')) {
      console.log('Exit command detected, closing...')

      setTimeout(() => {
        process.exit(0)
      }, 100)
    }
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(prevCounter => prevCounter + 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Box borderStyle="round" borderColor="green" padding={2}>
      <Text>
        <Text color="cyan">Hello from your TUI Website!</Text>
        {'\n'}
        This is running on Bun + Ink via ttyd.
        {'\n\n'}
        Uptime: <Text color="yellow">{counter} seconds</Text>
        {'\n'}
        Key presses detected: <Text color="magenta">{keyPressCount}</Text>
        {'\n'}
        Last key: <Text color="blue">{lastKey}</Text>
        {'\n\n'}
        <Text color="white">Type something: </Text>
        <Text color="green" backgroundColor="black">
          {inputText || ' '}
        </Text>
        {'\n\n'}
        <Text color="gray">Press 'q' or Ctrl+C to quit.</Text>
        {'\n'}
        <Text color="gray">Press Enter to clear input.</Text>
        {'\n'}
        <Text color="gray">Running in: {process.env.TERM || 'unknown terminal'}</Text>
      </Text>
    </Box>
  )
}

render(<App />)
