import { PostsRepository } from "@/repositories/postsRepository"
import { Post } from "@prisma/client"
interface CreatePostUseCaseRequest {
    title: string,
    content: string,
    created_at: Date
    userId: string
}

interface CreatePostUseCaseResponse {
    post: Post,
}

export class CreatePostUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({title, content, created_at, userId}: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
        const post = await this.postsRepository.create({
            title,
            content,
            created_at,
            user: {
                connect: { id: userId}
            }
        })
        return { post }
    }

}