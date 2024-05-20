import { db, User, Space, Message, joinSpaceUser } from './schema'
import { eq } from 'drizzle-orm'
import { hashPassword } from '../util/password'

// SELECT
export const selectAllUsers = async () => {
  return await db.select().from(User)
}

export const selectUserById = async (id: number) => {
  return await db.select().from(User).where(eq(User.id, id))
}

export const selectUserByName = async (name: string) => {
  return await db.select().from(User).where(eq(User.name, name))
}

// INSERT
export const insertUser = async (name: string, password: string) => {
  const {hashedPassword, salt} = await hashPassword(password)
  return await db.insert(User).values({
    name,
    password: hashedPassword,
    salt,
    created_at: new Date(),
    updated_at: new Date()
  })
}
