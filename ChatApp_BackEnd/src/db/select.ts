import { db, User, Space, Message, joinSpaceUser } from './schema'
import { eq } from 'drizzle-orm'

export const selectAllUsers = async () => {
  return await db.select().from(User)
}