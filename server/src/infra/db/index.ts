import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from '@/env'
import { schema } from './schemas'

const {
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_NAME,
} = env

const host =
  process.env.DATABASE_HOST ||
  (process.env.NODE_ENV === "production" ? "pg" : "localhost");

export const DATABASE_URL = `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${host}:${DATABASE_PORT}/${DATABASE_NAME}`;

export const pg = postgres(DATABASE_URL)
export const db = drizzle(pg, { schema: schema })
