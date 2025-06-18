import { Box, type BoxProps, Text } from 'ink'
import { theme } from '../../theme.js'

interface BorderedBoxProps extends BoxProps {
  label?: string
  children: React.ReactNode
}

export default function BorderedBox({ label, children, ...props }: BorderedBoxProps) {
  return (
    <Box
      borderStyle="round"
      borderColor={theme.border}
      paddingX={2}
      paddingY={1}
      flexDirection="column"
      {...props}
    >
      {label && (
        <Box marginTop={-2} marginLeft={1} alignSelf="flex-start">
          <Text color={theme.fgMuted}> {label} </Text>
        </Box>
      )}
      {children}
    </Box>
  )
}
