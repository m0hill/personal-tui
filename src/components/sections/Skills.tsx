import { Box, Text } from 'ink'
import Section from '../common/Section.js'
import BorderedBox from '../common/BorderedBox.js'
import { theme } from '../../theme.js'

export default function Skills() {
  return (
    <Box flexDirection="column">
      <BorderedBox marginBottom={1}>
        <Section title="⚙️ Technical Skills">
          <Text color={theme.secondary}>Programming:</Text>
          <Text color={theme.fgDeep}> TypeScript, Python, Kotlin, Rust, C++, SQL</Text>

          <Box marginTop={1}>
            <Text color={theme.secondary}>Frameworks:</Text>
          </Box>
          <Text color={theme.fgDeep}> Next.js, FastAPI, Django, Vue.js, Express.js, tRPC</Text>
          <Box marginTop={1}>
            <Text color={theme.secondary}>ML/AI:</Text>
          </Box>
          <Text color={theme.fgDeep}> AWS SageMaker, TensorFlow</Text>
        </Section>
      </BorderedBox>
      <BorderedBox>
        <Section title="☁️ DevOps & Cloud">
          <Text color={theme.fgDeep}>AWS, Docker, CI/CD, Turborepo</Text>
        </Section>
        <Box marginTop={1}>
          <Section title="🗄️ Databases">
            <Text color={theme.fgDeep}>PostgreSQL, MongoDB</Text>
          </Section>
        </Box>
      </BorderedBox>
    </Box>
  )
}
