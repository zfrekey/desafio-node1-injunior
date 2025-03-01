import { Post } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resourceNotFound"
import { PostsRepository } from "@/repositories/postsRepository"

interface DeletePostUseCaseRequest {
    postId: string
}

interface DeletePostUseCaseResponse {
    post: Post
}

export class DeletePostUseCase {
    constructor(private postsRepository: PostsRepository) {}

    async execute({postId}: DeletePostUseCaseRequest): Promise<DeletePostUseCaseResponse> {
        const post = await this.postsRepository.deletePost(postId)

        if(!post) {
            throw new ResourceNotFoundError()
        }
        return { post }
    }

}