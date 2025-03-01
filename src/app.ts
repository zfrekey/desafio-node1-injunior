import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'
import { z } from 'zod'
import { userRoutes } from './http/controllers/users/routes'
import { postRoutes } from './http/controllers/posts/routes'
import { env } from './env'
import fastifyCors from '@fastify/cors'


export const app = fastify()

app.register(require('@fastify/jwt'), {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
})

app.register(fastifyCookie, {})

app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
})

app.register(userRoutes)
app.register(postRoutes)

app.setErrorHandler((error, request, reply) => {
    if (error instanceof z.ZodError) {
        return reply.status(400).send({ message: 'Validation error', issues: error.format() })
    }
    return reply.status(500).send({ message: 'Internal server error' })
})