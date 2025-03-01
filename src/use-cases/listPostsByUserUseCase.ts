import { Post } from "@prisma/client"
import { PostsRepository } from "@/repositories/postsRepository"

interface ListPostByUserUseCaseRequest {
    userId: string
}

interface ListPostByUserUseCaseResponse {
    post: Post[]
}

export class ListPostByUserIdUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({userId}: ListPostByUserUseCaseRequest): Promise<ListPostByUserUseCaseResponse> {
        if (!this.postsRepository) {
            throw new Error("Repositório de posts não instanciado")
        }

        const post = await this.postsRepository.listByUser(userId)

        return { post }
    }
}