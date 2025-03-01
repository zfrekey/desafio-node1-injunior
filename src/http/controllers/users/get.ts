import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository"
import { GetUserUseCase } from "@/use-cases/getUserUseCase"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"

export async function get(request: FastifyRequest, reply: FastifyReply) {
    
    const getBodySchema = z.object({
        userId : z.string().uuid(),
    })

    const {userId} = getBodySchema.parse(request.params)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const getUserUseCase = new GetUserUseCase(prismaUsersRepository)
        const user = await getUserUseCase.execute({
            userId
        })

        return reply.status(200).send({ user })

    } catch (err) {
        if(err instanceof ResourceNotFoundError){
            return reply.status(404).send({ message: "Usuário não encontrado" })
        }
    
    }

}