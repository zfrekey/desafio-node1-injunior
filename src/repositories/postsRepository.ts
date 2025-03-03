import { Prisma, Post } from "@prisma/client";

export interface PostUpdateInput{
    title?: string
    content?: string
}

export interface PostsRepository {
    create(data: Prisma.PostUncheckedCreateInput): Promise<Post>

    getById(postId: string):Promise<Post | null>
    list(): Promise<Post[]>
    listByUser(userId: string): Promise<Post[]>

    deletePost(postId: string): Promise<Post | null>

    update(postId: string, data: PostUpdateInput): Promise<Post | null>
}