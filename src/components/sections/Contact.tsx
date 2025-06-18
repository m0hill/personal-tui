import { Box, Text } from 'ink'
import Section from '../common/Section.js'
import BorderedBox from '../common/BorderedBox.js'
import { theme } from '../../theme.js'

export default function Contact() {
  return (
    <Box flexDirection="column">
      <BorderedBox marginBottom={1}>
        <Section title="📧 Get In Touch">
          <Box flexDirection="row" justifyContent="space-between" width="100%">
            <Box flexDirection="column">
              <Text color={theme.secondary}>Email:</Text>
              <Text color={theme.secondary}>Portfolio:</Text>
              <Text color={theme.secondary}>GitHub:</Text>
              <Text color={theme.secondary}>Mobile:</Text>
            </Box>
            <Box flexDirection="column" alignItems="flex-end">
              <Text color={theme.accent}>mohilg@outlook.com</Text>
              <Text color={theme.accent}>who.mohil.dev</Text>
              <Text color={theme.accent}>github.com/m0hill</Text>
              <Text color={theme.accent}>+81 80-9416-6969</Text>
            </Box>
          </Box>
        </Section>
      </BorderedBox>
      <BorderedBox>
        <Section title="👾 Available For">
          <Text color={theme.fgDeep}>• Full-stack development projects</Text>
          <Text color={theme.fgDeep}>• DevOps and cloud architecture consulting</Text>
          <Text color={theme.fgDeep}>• Open source collaboration</Text>
        </Section>
      </BorderedBox>
    </Box>
  )
}
