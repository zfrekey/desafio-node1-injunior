import { Post } from "@prisma/client"
import { PostsRepository } from "@/repositories/postsRepository"

interface ListPostUseCaseResponse {
    post: Post[]
}

export class ListPostUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute(): Promise<ListPostUseCaseResponse> {
        if (!this.postsRepository) {
            throw new Error("Repositório de posts não instanciado")
        }

        const post = await this.postsRepository.list()

        return { post }
    }
}