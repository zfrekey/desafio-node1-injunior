import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository"
import { PrismaPostsRepository } from "@/repositories/prisma/prismaPostsRepository"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { DeleteUserUseCase } from "@/use-cases/deleteUserUseCase"

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    
    const deleteBodySchema = z.object({
        userId: z.string().uuid(),
    })

    const {userId} = deleteBodySchema.parse(request.params)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const prismaPostsRepository = new PrismaPostsRepository()
        const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository)
        const user = await deleteUserUseCase.execute({
            userId
        })

        return reply.status(200).send({ user })

    } catch (err) {
        if(err instanceof ResourceNotFoundError){
            return reply.status(404).send({ message: "Usuário não encontrado" })
        }
    
    }

}