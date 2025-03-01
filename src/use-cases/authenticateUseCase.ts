import { UsersRepository } from "@/repositories/usersRepository"
import { UserAlreadyExists } from "./errors/userAlreadyExists"
import { User } from "@prisma/client"
import { InvalidCredentialsError } from "./errors/invalidCredentialsError"
import { compare } from "bcryptjs"

interface AuthenticateUseCaseRequest {
    email: string,
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private userRepository: UsersRepository) {}

    async execute({email,password}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {

        const user = await this.userRepository.findByEmail(email)
    
        if(!user){
            throw new UserAlreadyExists()
        }

        const doesPasswordMatches = await compare(password, user.password)
    
        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        return { user }

    }
}