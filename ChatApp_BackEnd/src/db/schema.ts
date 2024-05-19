import { drizzle } from 'drizzle-orm/postgres-js'
import { pgTable, serial, text, varchar, integer, timestamp } from 'drizzle-orm/pg-core'
import { InferSelectModel } from 'drizzle-orm'
const { default: postgres } = await import('postgres')

export const User = pgTable (
  'user',
  {
    id : serial('id').primaryKey(),
    name : text('name').notNull().unique(),
    password: varchar('password', {length: 64}).notNull(),
    salt: varchar('salt', {length: 64}).notNull(),
    created_at: timestamp('created_at').notNull(),
    updated_at: timestamp('updated_at').notNull()
  }
)

export const Space = pgTable (
  'space',
  {
    id : serial('id').primaryKey(),
    name : text('name').notNull().unique(),
    created_at: timestamp('created_at').notNull(),
    updated_at: timestamp('updated_at').notNull()
  }
)

export const Message = pgTable (
  'message',
  {
    id : serial('id').primaryKey(),
    space_id : integer('space_id').notNull().references(() => Space.id),
    user_id : integer('user_id').notNull().references(() => User.id),
    content : varchar('content', {length: 256}).notNull(),
    created_at: timestamp('created_at').notNull(),
    updated_at: timestamp('updated_at').notNull()
  }
)

export const joinSpaceUser = pgTable (
  'join_space_user',
  {
    id : serial('id').primaryKey(),
    space_id : integer('space_id').notNull().references(() => Space.id),
    user_id : integer('user_id').notNull().references(() => User.id),
    created_at: timestamp('created_at').notNull(),
    updated_at: timestamp('updated_at').notNull()
  }
)

export type UserType = InferSelectModel<typeof User>
export type SpaceType = InferSelectModel<typeof Space>
export type MessageType = InferSelectModel<typeof Message>
export type JoinSpaceUserType = InferSelectModel<typeof joinSpaceUser>

export const db = drizzle(
  postgres(
    '',
    {
      host: 'postgresql',
      port: 5432,
      database: 'postgres',
      username: 'admin',
      password: 'postgres'  // 後で.envに移す
    }
  )
)
