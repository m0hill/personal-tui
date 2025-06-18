import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { eq, sql } from 'drizzle-orm'
import { visitors, type Visitor, type NewVisitor } from './schema'

const sqlite = new Database('visitors.db')
export const db = drizzle(sqlite)

// Initialize database
export function initializeDatabase() {
  // Create table if it doesn't exist
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      first_visit INTEGER NOT NULL DEFAULT (unixepoch()),
      last_visit INTEGER NOT NULL DEFAULT (unixepoch()),
      visit_count INTEGER NOT NULL DEFAULT 1
    )
  `)
}

export async function trackVisitor(name?: string): Promise<Visitor> {
  try {
    if (name) {
      // Check if visitor exists
      const existing = await db.select().from(visitors).where(eq(visitors.name, name)).limit(1)

      if (existing.length > 0) {
        // Update existing visitor
        const updated = await db
          .update(visitors)
          .set({
            lastVisit: new Date(),
            visitCount: sql`${visitors.visitCount} + 1`
          })
          .where(eq(visitors.name, name))
          .returning()
        return updated[0]
      }
    }

    // Create new visitor
    const newVisitor: NewVisitor = {
      name: name || null,
      firstVisit: new Date(),
      lastVisit: new Date(),
      visitCount: 1
    }

    const created = await db.insert(visitors).values(newVisitor).returning()
    return created[0]
  } catch (error) {
    console.error('Error tracking visitor:', error)
    throw error
  }
}

export async function getTotalVisitorCount(): Promise<number> {
  try {
    const result = await db.select({ count: sql<number>`count(*)` }).from(visitors)
    return result[0].count
  } catch (error) {
    console.error('Error getting visitor count:', error)
    return 0
  }
}
