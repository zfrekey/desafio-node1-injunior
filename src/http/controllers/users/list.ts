import { FastifyReply, FastifyRequest } from "fastify"
import { ResourceNotFoundError } from "@/use-cases/errors/resourceNotFound"
import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository"
import { ListUserUseCase } from "@/use-cases/listUsersUseCase"


export async function list(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaUserRepository = new PrismaUsersRepository()
        const listUsersUseCase = new ListUserUseCase(prismaUserRepository)
        const users = await listUsersUseCase.execute()

        return reply.status(200).send({ users })
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: "Usuários não encontrados" })
        }
    }
}