import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { PrismaPostsRepository } from "@/repositories/prisma/prismaPostsRepository"
import { DeletePostUseCase } from "@/use-cases/deletePostUseCase"


export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
    
    const deleteBodySchema = z.object({
        postId : z.string().uuid(),
    })

    const {postId} = deleteBodySchema.parse(request.params)

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const deletePostUseCase = new DeletePostUseCase(prismaPostsRepository)
        const post = await deletePostUseCase.execute({
            postId
        })

        return reply.status(200).send({ post })

    } catch (err) {
        if(err instanceof ResourceNotFoundError){
            return reply.status(404).send({ message: "Post não encontrado" })
        }
    
    }

}