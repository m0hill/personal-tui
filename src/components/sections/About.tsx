import { Box, Text } from 'ink'
import Section from '../common/Section'
import BorderedBox from '../common/BorderedBox'
import { theme } from '../../theme'

export default function About() {
  return (
    <Box flexDirection="column">
      <BorderedBox marginBottom={1}>
        <Section title="🎓 Education">
          <Box flexDirection="column">
            <Text color={theme.secondary}>• Kumamoto University, Japan (2020-2024)</Text>
            <Text color={theme.fgMuted}>
              {'  '}Bachelor of Engineering - Electrical & Information Engineering
            </Text>
          </Box>
          <Box flexDirection="column" marginTop={1}>
            <Text color={theme.secondary}>• Tokyo University of Foreign Studies (2019-2020)</Text>
            <Text color={theme.fgMuted}> Japanese Language Studies</Text>
          </Box>
        </Section>
      </BorderedBox>
      <BorderedBox>
        <Section title="🏆 Achievements">
          <Text color={theme.fgDeep}>• MEXT Scholarship recipient (2019)</Text>
        </Section>
      </BorderedBox>
    </Box>
  )
}
