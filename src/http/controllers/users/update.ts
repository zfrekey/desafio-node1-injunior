import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { UpdateUserUseCase } from "@/use-cases/updateUserUseCase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function update(request: FastifyRequest, reply: FastifyReply) {
    
    const updateParamsSchema = z.object({
        userId : z.string().uuid(),
    })

    const updateBodySchema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().min(6).optional(),
        photo: z.string().optional()
    })

    const {userId} = updateParamsSchema.parse(request.params)
    const {name, email, password, photo} = updateBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository)
        const user = await updateUserUseCase.execute({
            userId,
            data: {
                name,
                email,
                password,
                photo
            }
        })

        return reply.status(200).send({ user })

    } catch (err) {
        if(err instanceof ResourceNotFoundError){
            return reply.status(404).send({ message: "Usuário não encontrado" })
        }
    
    }

}