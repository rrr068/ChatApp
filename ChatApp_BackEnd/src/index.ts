import { Hono } from 'hono'
import { authUser, insertUser, selectAllUsers, selectUserById, updateUserName, deleteUserById } from './db/user'
import { User } from './db/schema';

const app = new Hono()

/* 
Routing
[user, space, message, joinSpaceUser]

/user
  GET /user
  GET /user/:id
  POST /user
  POST /user/login
  PUT /user
  DELETE /user/:id

/space
  GET /space
  GET /space/:id
  POST /space
  PUT /space
  DELETE /space/:id

/message
  GET /message
  GET /message/:id
  POST /message
  PUT /message
  DELETE /message/:id

/join
  GET /join
  GET /join/:id
  GET /join/space/:space_id
  GET /join/user/:user_id
  POST /join
  PUT /join
  DELETE /join/:id
  DELETE /join/space/:space_id
  DELETE /join/user/:user_id
*/

app.get('/', (c) => {
  console.log('Hello Hono!!!');
  
  return c.text('Hello Hono!!!')
})

app.get('/user', async (c) => {
  // 
  try {
    const users = await selectAllUsers()
    if ((users).length === 0) {
      return c.text(`404 Not Found: No users found`)
    } else {
      return c.json(users)
    }
  } catch (e) {
    return c.text(`Error: ${e}`)
  }
})

app.get('/user/:id', async (c) => {
  const params = await c.req.json<typeof User.$inferSelect>()
  const id = params.id
  if (!id) {
    return c.text('Invalid id')
  }
  try {
    const user = await selectUserById(id)
    if (!user) {
      return c.text(`404 Not Found: User id ${id} not found`)
    } else {
      return c.json(user)
    }
  } catch (e) {
    return c.text(`Error: ${e}`)
  }
})

app.post('/user', async (c) => {
  console.log(`c.req: ${JSON.stringify(c.req.json())}`)
  const params = await c.req.json<typeof User.$inferInsert>()
  const name = params.name
  const password = params.password
  if (!name || !password) {
    return c.text('Invalid params')
  }
  try {
    await insertUser(name, password)
    return c.text('Success')
  } catch (e) {
    return c.text(`Error: ${e}`)
  }
})

app.post('/user/login', async (c) => {
  const params = await c.req.json<typeof User.$inferSelect>()
  const name = params.name
  const password = params.password
  if (!name || !password) {
    return c.text('Invalid params')
  }
  try {
    const user = await authUser(name, password)
    if (!user) {
      return c.text(`404 Not Found: User ${name} not found`)
    } else {
      return c.json(user)
    }
  } catch (e) {
    return c.text(`Error: ${e}`)
  }
})

app.put('/user', async (c) => {
  const params = await c.req.json<typeof User.$inferSelect>()
  const id = params.id
  const name = params.name
  if (!id || !name) {
    return c.text(`Invalid params`)
  }
  try {
    await updateUserName(id, name)
    return c.text('Success')
  } catch (e) {
    return c.text(`Error: ${e}`)
  }
})

app.delete('/user/:id', async (c) => {
  const params = await c.req.json<typeof User.$inferSelect>()
  const id = params.id
  if (!id) {
    return c.text('Invalid id')
  }
  try {
    await deleteUserById(id)
    return c.text('Success')
  } catch (e) {
    return c.text(`Error: ${e}`)
  }
})

export default app
