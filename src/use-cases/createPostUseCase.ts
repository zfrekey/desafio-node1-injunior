import { PostsRepository } from "@/repositories/postsRepository"
import { Post } from "@prisma/client"
interface CreatePostUseCaseRequest {
    title: string
    content: string
    userId: string
}

interface CreatePostUseCaseResponse {
    post: Post,
}

export class CreatePostUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({title, content, userId}: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
        const post = await this.postsRepository.create({
            title,
            content,
            userId
        })
        return { post }
    }

}