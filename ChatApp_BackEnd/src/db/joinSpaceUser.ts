import {db, joinSpaceUser} from './schema'
import {eq, and} from 'drizzle-orm'

// SELECT
export const selectAllJoinSpaceUsers = async () => {
  return await db.select().from(joinSpaceUser)
}

export const selectJoinSpaceUserBySpaceId = async (space_id: number) => {
  return await db.select().from(joinSpaceUser).where(eq(joinSpaceUser.space_id, space_id))
}

export const selectJoinSpaceUserByUserId = async (user_id: number) => {
  return await db.select().from(joinSpaceUser).where(eq(joinSpaceUser.user_id, user_id))
}

// INSERT
export const insertJoinSpaceUser = async (space_id: number, user_id: number) => {
  return await db.insert(joinSpaceUser).values({
    space_id,
    user_id,
    created_at: new Date(),
    updated_at: new Date()
  })
}

// DELETE
export const deleteJoinSpaceUserById = async (id: number) => {
  return await db.delete(joinSpaceUser).where(eq(joinSpaceUser.id, id))
}

export const deleteJoinSpaceUserBySpaceId = async (space_id: number) => {
  return await db.delete(joinSpaceUser).where(eq(joinSpaceUser.space_id, space_id))
}

export const deleteJoinSpaceUserByUserId = async (user_id: number) => {
  return await db.delete(joinSpaceUser).where(eq(joinSpaceUser.user_id, user_id))
}

export const deleteJoinSpaceUserBySpaceIdAndUserId = async (space_id: number, user_id: number) => {
  return await db.delete(joinSpaceUser).where(and(eq(joinSpaceUser.space_id, space_id), eq(joinSpaceUser.user_id, user_id)))
}

export const deleteJoinSpaceUserBySpaceIdAndUserIdArray = async (space_id: number, user_id: number[]) => {
  return await db.delete(joinSpaceUser).where(and(eq(joinSpaceUser.space_id, space_id), joinSpaceUser.user_id.in(user_id)))
}