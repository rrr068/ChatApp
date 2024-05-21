import { db, User, Space, Message, joinSpaceUser } from './schema'
import { eq } from 'drizzle-orm'
import { hashPassword, verifyPassword } from '../util/password'
import { password } from 'bun'

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

// AUTH
export const authUser = async (name: string, pw: string) => {
  const user = await db.select().from(User).where(eq(User.name, name))
  if (user.length === 0) {
    return {isMatch: false, user: null}
  }
  const isMatch = await verifyPassword(pw, user[0].salt, user[0].password)
  if (!isMatch) {
    return {isMatch: false, user: null}
  }
  return {isMatch, user: user[0]}
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

// UPDATE
export const updateUserName = async (id: number, name: string) => {
  return await db.update(User).set({name}).where(eq(User.id, id))
}

export const updateUserPassword = async (id: number, password: string) => {
  const {hashedPassword, salt} = await hashPassword(password)
  return await db.update(User).set({password: hashedPassword, salt}).where(eq(User.id, id))
}

// DELETE
export const deleteUserById = async (id: number) => {
  return await db.delete(User).where(eq(User.id, id))
}
