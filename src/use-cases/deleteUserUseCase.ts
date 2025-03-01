import { User } from "@prisma/client"
import { UsersRepository } from "@/repositories/usersRepository"
import { ResourceNotFoundError } from "./errors/resourceNotFound"

interface DeleteUserUseCaseRequest {
    userId: string
}

interface DeleteUserUseCaseResponse {
    user: User
}

export class DeleteUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({userId}: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
        const user = await this.usersRepository.deleteUser(userId)

        if(!user) {
            throw new ResourceNotFoundError()
        }
        return { user }
    }

}