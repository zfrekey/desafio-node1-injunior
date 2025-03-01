import { prisma } from "@/http/lib/prisma";
import { Post, Prisma} from "@prisma/client";
import { PostsRepository, PostUpdateInput } from "../postsRepository";


export class PrismaPostsRepository implements PostsRepository {
        async create(data: Prisma.PostCreateInput) {

            const posts = await prisma.post.create({
                data
            })
            return posts
        }

        async getById(id: string): Promise<Post | null> {
                const post = await prisma.post.findUnique({
                    where: {
                        id
                    }
                })
                return post
        }
        
        async list(): Promise<Post[]> {
                const posts = await prisma.post.findMany()
                return posts
        }

        async listByUser(userId: string): Promise<Post[]> {
                const posts = await prisma.post.findMany({
                    where: {
                        userId
                    }
                })
                return posts
        }

        async deletePost(id: string): Promise<Post | null> {
                const post = await prisma.post.delete({
                    where: {
                        id
                    }
                })
                return post
        }

        async update(postId: string, data: PostUpdateInput): Promise<Post | null> {
                const post = await prisma.post.update({
                    where: { id : postId },  
                    data: {
                        title: data.title,
                        content: data.content,
                        created_at: data.created_at
                    }
                })
                return post
        }

    
}