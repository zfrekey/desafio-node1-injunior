import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { PrismaPostsRepository } from "@/repositories/prisma/prismaPostsRepository"
import { ListPostUseCase } from "@/use-cases/listPostsUseCase"

export async function list(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaPostRepository = new PrismaPostsRepository()
        const listPostsUseCase = new ListPostUseCase(prismaPostRepository)
        const post = await listPostsUseCase.execute()

        return reply.status(200).send({ post })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: "Post não encontrado" })
        }
    }
}