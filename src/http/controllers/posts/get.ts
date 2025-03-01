import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { PrismaPostsRepository } from "@/repositories/prisma/prismaPostsRepository"
import { GetPostUseCase } from "@/use-cases/getPostUseCase"

export async function getById(request: FastifyRequest, reply: FastifyReply) {
    
    const getBodySchema = z.object({
        postId : z.string().uuid(),
    })

    const {postId} = getBodySchema.parse(request.params)

    try {
        const prismaPostRepository = new PrismaPostsRepository()
        const getPostUseCase = new GetPostUseCase(prismaPostRepository)
        const post = await getPostUseCase.execute({
            postId
        })

        return reply.status(200).send({ post })

    } catch (err) {
        if(err instanceof ResourceNotFoundError){
            return reply.status(404).send({ message: "Usuário não encontrado" })
        }
    
    }

}