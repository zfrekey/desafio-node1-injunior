import { User } from "@prisma/client"
import { UsersRepository } from "@/repositories/usersRepository"

interface ListUserUseCaseResponse {
    user: User[]
}

export class ListUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute(): Promise<ListUserUseCaseResponse> {
        if (!this.usersRepository) {
            throw new Error("Repositório de usuários não instanciado")
        }

        const user = await this.usersRepository.list()

        return { user }
    }
}