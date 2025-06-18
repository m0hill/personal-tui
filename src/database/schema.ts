import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const visitors = sqliteTable('visitors', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  firstVisit: integer('first_visit', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  lastVisit: integer('last_visit', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  visitCount: integer('visit_count').notNull().default(1)
})

export type Visitor = typeof visitors.$inferSelect
export type NewVisitor = typeof visitors.$inferInsert
