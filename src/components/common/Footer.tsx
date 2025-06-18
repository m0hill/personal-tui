import { Box, Text } from 'ink'
import { theme } from '../../theme'

interface FooterProps {
  isSearchMode: boolean
  inputText: string
}

export default function Footer({ isSearchMode, inputText }: FooterProps) {
  return (
    <Box
      borderStyle="single"
      borderColor={theme.border}
      paddingX={1}
      marginTop={1}
      justifyContent="space-between"
    >
      <Text color={theme.fgMuted}>
        Navigate: ↑↓ arrows, [hotkeys], Enter | Search: / | Exit: Esc
      </Text>
      {isSearchMode && (
        <Box>
          <Text color={theme.accent}>Search: {inputText}_</Text>
        </Box>
      )}
    </Box>
  )
}
