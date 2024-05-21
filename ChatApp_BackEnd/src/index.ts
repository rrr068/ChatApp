import { Hono } from 'hono'
import { authUser, insertUser, selectAllUsers } from './db/user'
import { User } from './db/schema';

const app = new Hono()

app.get('/', (c) => {
  console.log('Hello Hono!!!');
  
  return c.text('Hello Hono!!!')
})

app.get('/user', async (c) => {
  // 
  try {
    const users = await selectAllUsers()
    if ((users).length === 0) {
      return c.text('No users')
    } else {
      return c.json(users)
    }
  } catch (e) {
    return c.text('Error')
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
  const pw = params.password
  if (!name || !pw) {
    return c.text('Invalid params')
  }
  try {
    const {isMatch, user} = await authUser(name, pw)
    if (isMatch && user !== null) {
      return c.text(`Success: [id: ${user.id}, name: ${user.name}]`)
    } else {
      return c.text('Failed')
    }
  } catch (e) {
    return c.text(`Error: ${e}`)
  }
})

export default app
