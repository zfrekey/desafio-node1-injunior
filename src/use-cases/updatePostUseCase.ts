import { Post } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resourceNotFound"
import { PostsRepository } from "@/repositories/postsRepository"
import { PostUpdateInput } from "@/repositories/postsRepository"

interface UpdatePostUseCaseRequest {
        postId: string,
        data: PostUpdateInput
}

interface UpdatePostUseCaseResponse {
        post: Post
}

export class UpdatePostUseCase {
        constructor(private postsRepository: PostsRepository) {}

        async execute({postId, data}: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {
                const post = await this.postsRepository.getById(postId)

                if(!post) {
                        throw new ResourceNotFoundError()
                }

                const postUpdated = await this.postsRepository.update(postId, data)
                if(!postUpdated) {
                        throw new ResourceNotFoundError()
                }
                return { post }
        }
}