import { db, Message } from './schema'
import { eq } from 'drizzle-orm'

// SELECT
export const selectAllMessages = async () => {
  return await db.select().from(Message)
}

export const selectMessageBySpaceId = async (space_id: number) => {
  return await db.select().from(Message).where(eq(Message.space_id, space_id))
}

export const selectMessageByUserId = async (user_id: number) => {
  return await db.select().from(Message).where(eq(Message.user_id, user_id))
}

// INSERT
export const insertMessage = async (space_id: number, user_id: number, content: string) => {
  return await db.insert(Message).values({
    space_id,
    user_id,
    content,
    created_at: new Date(),
    updated_at: new Date()
  })
}

// UPDATE
export const updateMessageContent = async (id: number, content: string) => {
  return await db.update(Message).set({content}).where(eq(Message.id, id))
}

// DELETE
export const deleteMessageById = async (id: number) => {
  return await db.delete(Message).where(eq(Message.id, id))
}

export const deleteMessageBySpaceId = async (space_id: number) => {
  return await db.delete(Message).where(eq(Message.space_id, space_id))
}
