import { Box, Text } from 'ink'
import { theme } from '../../theme.js'

interface SectionProps {
  title: string
  children: React.ReactNode
}

export default function Section({ title, children }: SectionProps) {
  return (
    <Box flexDirection="column" width="100%">
      <Box marginBottom={1}>
        <Text color={theme.primary} bold>
          {title}
        </Text>
      </Box>
      <Box flexDirection="column">{children}</Box>
    </Box>
  )
}
