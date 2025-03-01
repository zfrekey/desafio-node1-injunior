import { Prisma, Post } from "@prisma/client";

export interface PostUpdateInput{
    title?: string
    content?: string
    created_at?: Date
}

export interface PostsRepository {
    create(data: Prisma.PostCreateInput): Promise<Post>

    getById(postId: string):Promise<Post | null>
    list(): Promise<Post[]>
    listByUser(userId: string): Promise<Post[]>

    deletePost(postId: string): Promise<Post | null>

    update(postId: string, data: PostUpdateInput): Promise<Post | null>
}