import { Box, Text } from 'ink'
import Section from '../common/Section.js'
import BorderedBox from '../common/BorderedBox.js'
import { theme } from '../../theme.js'

export default function Home() {
  return (
    <Box flexDirection="column">
      <BorderedBox marginBottom={1}>
        <Section title="💻 Welcome to My Digital Portfolio">
          <Text color={theme.fgDeep}>
            Full-Stack & DevOps Engineer specializing in modern web technologies.
          </Text>
          <Box marginTop={1}>
            <Text color={theme.fgMuted}>
              Currently working at MONOLISIX and SIND, building scalable solutions.
            </Text>
          </Box>
        </Section>
      </BorderedBox>
      <BorderedBox>
        <Section title="🔗 Quick Links">
          <Box flexDirection="row" justifyContent="space-between" width="100%">
            <Box flexDirection="column">
              <Text color={theme.secondary}>• Email:</Text>
              <Text color={theme.secondary}>• Portfolio:</Text>
              <Text color={theme.secondary}>• GitHub:</Text>
              <Text color={theme.secondary}>• Mobile:</Text>
            </Box>
            <Box flexDirection="column" alignItems="flex-end">
              <Text color={theme.accent}>mohilg@outlook.com</Text>
              <Text color={theme.accent}>who.mohil.dev</Text>
              <Text color={theme.accent}>m0hill</Text>
              <Text color={theme.accent}>080-9416-6969</Text>
            </Box>
          </Box>
        </Section>
      </BorderedBox>
    </Box>
  )
}
