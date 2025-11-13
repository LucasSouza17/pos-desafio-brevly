import type { Config } from 'drizzle-kit'
import { env } from '@/env'

const host =
  process.env.DATABASE_HOST ||
  (process.env.NODE_ENV === 'production' ? 'pg' : 'localhost')

export default {
  dbCredentials: {
    url: `postgresql://${env.DATABASE_USER}:${env.DATABASE_PASSWORD}@${host}:${env.DATABASE_PORT}/${env.DATABASE_NAME}`,
  },
  dialect: 'postgresql',
  schema: 'src/infra/db/schemas/*',
  out: 'src/infra/db/migrations',
} satisfies Config
