import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { RegisterUseCase } from "@/use-cases/registerUseCase"
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository"
import { UserAlreadyExists } from "@/use-cases/errors/userAlreadyExists"

export async function register(request: FastifyRequest, reply: FastifyReply) {
    
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        photo: z.string().optional()
    })

    const {name,email,password, photo} = registerBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)
        await registerUseCase.execute({
            name,
            email,
            password,
            photo
        })
    } catch (err) {
        if (err instanceof UserAlreadyExists) {
            return reply.status(409).send({ message: err.message })
        }
        throw err
    }
    
    return reply.status(201).send("Usuário criado com sucesso")
}