import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { PrismaPostsRepository } from "@/repositories/prisma/prismaPostsRepository"
import { ListPostByUserIdUseCase } from "@/use-cases/listPostsByUserUseCase"
import { z } from "zod"

export async function listByUser(request: FastifyRequest, reply: FastifyReply) {

    const getBodySchema = z.object({
            userId : z.string().uuid(),
        })
    
    const {userId} = getBodySchema.parse(request.params)

    try {
        const prismaPostRepository = new PrismaPostsRepository()
        const listPostsByIdUseCase = new ListPostByUserIdUseCase(prismaPostRepository)
        const post = await listPostsByIdUseCase.execute({userId})

        return reply.status(200).send({ post })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: "Post não encontrado" })
        }
    }
}