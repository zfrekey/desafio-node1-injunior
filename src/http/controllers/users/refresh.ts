import { FastifyRequest, FastifyReply } from "fastify"

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
     await request.jwtVerify({ onlyCookie: true })

     const token = await reply.jwtSign({}, {
          sign: {
               sub: request.user.sub
          }
     })

     const refreshToken = await reply.jwtSign({}, {
          sign: {
               sub: request.user.sub,
               expiresIn: '7d'
          }
     })

     return reply
         .status(200)
          .setCookie('refreshToken', refreshToken, {
               path: '/',
               secure: true, //frontend não vai conseguir ler este cookie
               sameSite: true, //esse cookie só vai ser acessivel dentro do mesmo site
               httpOnly: true, //esse cookie so vai conseguir ser acessado pelo backend e não pelo frontend
          })
          .send({ token })
}