import {db, Space} from './schema'
import {eq} from 'drizzle-orm'

// SELECT
export const selectAllSpaces = async () => {
  return await db.select().from(Space)
}

export const selectSpaceById = async (id: number) => {
  return await db.select().from(Space).where(eq(Space.id, id))
}

export const selectSpaceByName = async (name: string) => {
  return await db.select().from(Space).where(eq(Space.name, name))
}

// INSERT
export const insertSpace = async (name: string) => {
  return await db.insert(Space).values({
    name,
    created_at: new Date(),
    updated_at: new Date()
  })
}

// UPDATE
export const updateSpaceName = async (id: number, name: string) => {
  return await db.update(Space).set({name}).where(eq(Space.id, id))
}

// DELETE
export const deleteSpaceById = async (id: number) => {
  return await db.delete(Space).where(eq(Space.id, id))
}
