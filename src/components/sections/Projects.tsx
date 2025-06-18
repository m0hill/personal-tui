import { Box, Text } from 'ink'
import Section from '../common/Section.js'
import BorderedBox from '../common/BorderedBox.js'
import { theme } from '../../theme.js'

export default function Projects() {
  return (
    <Box flexDirection="column">
      <BorderedBox marginBottom={1}>
        <Section title="🚀 Featured Projects">
          <Text color={theme.secondary}>• Entropy - Multi-Agent Coding System</Text>
          <Text color={theme.fgMuted}> AI SDK, SQLite, Drizzle ORM | Automated development</Text>
          <Box marginTop={1}>
            <Text color={theme.secondary}>• Starter-Flare - Full-Stack SaaS Boilerplate</Text>
          </Box>
          <Text color={theme.fgMuted}> Cloudflare Workers, React Router, Hono</Text>
          <Box marginTop={1}>
            <Text color={theme.secondary}>• GetMD - Website to Markdown Converter</Text>
          </Box>
          <Text color={theme.fgMuted}> High-performance Rust server</Text>
        </Section>
      </BorderedBox>
      <BorderedBox>
        <Section title="📺 Personal TUI Website (This!)">
          <Text color={theme.fgDeep}>Bun, Ink, TTYD | Interactive terminal portfolio</Text>
          <Text color={theme.fgMuted}>Accessible via who.mohil.dev and SSH at why.mohil.dev</Text>
        </Section>
      </BorderedBox>
    </Box>
  )
}
