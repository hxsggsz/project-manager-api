import bootstrap from '../app'

const app = bootstrap()
const random = Math.floor(Math.random() * 1000)

describe('auth route', () => {
  it('should create a new unique user', async () => {
    const res = await app.inject({
      url: '/signup',
      method: 'POST',
      payload: {
        name: 'test name',
        username: `unique username ${random}`,
        email: `${random}@gmail.com`,
        password: 'password test',
        samePassword: 'password test',
      },
    })

    expect(res.json()).toEqual({ message: 'user created successfully' })
    expect(res.statusCode).toEqual(200)
  })

  it('should get an "email already in use" error', async () => {
    const res = await app.inject({
      url: '/signup',
      method: 'POST',
      payload: {
        name: 'test name',
        username: `unique username ${random}`,
        email: 'test@gmail.com', // email registered before
        password: 'password test',
        samePassword: 'password test',
      },
    })

    expect(res.json()).toEqual({ message: 'email already exists' })
    expect(res.statusCode).toEqual(400)
  })

  it('should get an "username already registered" error', async () => {
    const res = await app.inject({
      url: '/signup',
      method: 'POST',
      payload: {
        name: 'test name',
        username: 'test', // username registered before
        email: `test${random}@gmail.com`,
        password: 'password test',
        samePassword: 'password test',
      },
    })

    expect(res.json()).toEqual({ message: 'username already in use' })
    expect(res.statusCode).toEqual(400)
  })

  it('should get an "different passwords" error', async () => {
    const res = await app.inject({
      url: '/signup',
      method: 'POST',
      payload: {
        name: 'test name',
        username: `test${random}`,
        email: `test${random}@gmail.com`,
        password: 'correct password',
        samePassword: 'wrong password',
      },
    })

    expect(res.statusCode).toEqual(500)
  })
})
