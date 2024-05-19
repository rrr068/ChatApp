import { Hono } from 'hono'
import { selectAllUsers } from './db/select'

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

export default app
