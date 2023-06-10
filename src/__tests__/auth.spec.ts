import bootstrap from '../app'

const app = bootstrap()
const random = Math.floor(Math.random() * 1000)

describe('Signup controller', () => {
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
    expect(res.statusCode).toEqual(201)
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

describe('Login controller', () => {
  it('should login with the user', async () => {
    const res = await app.inject({
      url: '/login',
      method: 'POST',
      payload: {
        email: `testemail@gmail.com`,
        password: 'correct password',
      },
    })

    expect(res.statusCode).toEqual(200)
  })

  it('should return "email not found" error', async () => {
    const res = await app.inject({
      url: '/login',
      method: 'POST',
      payload: {
        email: `email-not-registered@gmail.com`,
        password: 'correct password',
      },
    })

    expect(res.statusCode).toEqual(400)
    expect(res.json()).toEqual({
      message: 'there is no account with this email',
    })
  })

  it('should return "password incorrect" error', async () => {
    const res = await app.inject({
      url: '/login',
      method: 'POST',
      payload: {
        email: `testemail@gmail.com`,
        password: 'wrong password',
      },
    })

    expect(res.statusCode).toEqual(400)
    expect(res.json()).toEqual({
      message: 'there is no account with this password',
    })
  })

  describe('github controller', () => {
    it('should return an error with wrong code', async () => {
      const res = await app.inject({
        url: '/github',
        method: 'POST',
        payload: {
          code: 'wrong password',
        },
      })

      expect(res.statusCode).toEqual(500)
    })
  })

  describe('linkedin controller', () => {
    it('should return an error with wrong code', async () => {
      const res = await app.inject({
        url: '/linkedin',
        method: 'POST',
        payload: {
          code: 'wrong password',
        },
      })

      expect(res.statusCode).toEqual(500)
    })
  })
})
