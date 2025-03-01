import { prisma } from "@/http/lib/prisma";
import { Prisma, User} from "@prisma/client";
import { UsersRepository, UserUpdateInput } from "../usersRepository";

export class PrismaUsersRepository implements UsersRepository {

    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        })

        return user
    }

    async deleteUser(id: string): Promise<User | null> {
        const user = await prisma.user.delete({
            where: {
                id
            }
        })
        return user
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user
    }

    async list(): Promise<User[]> {
        const users = await prisma.user.findMany()
        return users
    }

    async update(userId: string, data: UserUpdateInput): Promise<User | null> {
        const user = await prisma.user.update({
            where: { id : userId },  
            data: {
                name: data.name,
                email: data.email,
                password: data.password
            }
        })
        return user
    }
}