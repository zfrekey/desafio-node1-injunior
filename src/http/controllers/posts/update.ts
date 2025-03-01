
import { PrismaPostsRepository } from "@/repositories/prisma/prismaPostsRepository"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { UpdatePostUseCase } from "@/use-cases/updatePostUseCase"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function update(request: FastifyRequest, reply: FastifyReply) {
    
    const updateParamsSchema = z.object({
        postId : z.string().uuid(),
    })

    const updateBodySchema = z.object({
        title: z.string().optional(),
        content: z.string().email().optional(),
        created_at: z.coerce.date().optional(),
    })

    const {postId} = updateParamsSchema.parse(request.params)
    const {title, content, created_at} = updateBodySchema.parse(request.body)

    try {
        const prismaPostsRepository = new PrismaPostsRepository()
        const updatePostUseCase = new UpdatePostUseCase(prismaPostsRepository)
        const post = await updatePostUseCase.execute({
            postId,
            data: {
                title,
                content,
                created_at
            }
        })

        return reply.status(200).send({ post })

    } catch (err) {
        if(err instanceof ResourceNotFoundError){
            return reply.status(404).send({ message: "Post não encontrado" })
        }
    
    }

}