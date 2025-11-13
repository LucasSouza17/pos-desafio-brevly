import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const urls = pgTable('urls', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  fullUrl: text('full_url').notNull(),
  shortUrl: text('short_url').notNull().unique(),
  entries: integer('entries').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
