import { Post } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resourceNotFound"
import { PostsRepository } from "@/repositories/postsRepository"

interface GetPostUseCaseRequest {
    postId: string
}

interface GetPostUseCaseResponse {
    post: Post
}

export class GetPostUseCase {
    constructor(private postRepository: PostsRepository) {}

    async execute({postId}: GetPostUseCaseRequest): Promise<GetPostUseCaseResponse> {
        const post = await this.postRepository.getById(postId)

        if(!post) {
            throw new ResourceNotFoundError()
        }
        return { post }
    }

}