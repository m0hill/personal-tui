import { Box, Text } from 'ink'
import Section from '../common/Section.js'
import BorderedBox from '../common/BorderedBox.js'
import { theme } from '../../theme.js'

export default function Experience() {
  return (
    <Box flexDirection="column">
      <BorderedBox marginBottom={1}>
        <Section title="🏢 MONOLISIX株式会社 - Full-Stack & DevOps Engineer">
          <Text color={theme.fgMuted}>Oct 2023 - Present | Remote</Text>
          <Box flexDirection="column" marginTop={1}>
            <Text color={theme.secondary}>• Monorepo Architecture:</Text>
            <Text color={theme.fgDeep}>
              {' '}
              Created unified monorepo with Turborepo, improved CI/CD.
            </Text>
            <Text color={theme.secondary}>• Performance Optimization:</Text>
            <Text color={theme.fgDeep}> 75% faster startup, 5x faster builds with Vite.</Text>
            <Text color={theme.secondary}>• Vue.js Modernization:</Text>
            <Text color={theme.fgDeep}> Upgraded to Vue 2.7, implemented Composition API.</Text>
          </Box>
        </Section>
      </BorderedBox>
      <BorderedBox>
        <Section title="🏢 株式会社SIND - Tech Lead & Full-Stack Engineer">
          <Text color={theme.fgMuted}>Present | Remote</Text>
          <Box flexDirection="column" marginTop={1}>
            <Text color={theme.secondary}>• AI-Powered Audio Systems:</Text>
            <Text color={theme.fgDeep}> Built SageMaker endpoints, real-time transcription.</Text>
            <Text color={theme.secondary}>• Team Leadership:</Text>
            <Text color={theme.fgDeep}> Code reviews, ECS deployments, CI/CD automation.</Text>
          </Box>
        </Section>
      </BorderedBox>
    </Box>
  )
}
