import { UsersRepository } from "@/repositories/usersRepository"
import { hash } from "bcryptjs"
import { UserAlreadyExists } from "./errors/userAlreadyExists"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
    photo?: string
}

export class RegisterUseCase {
    constructor(private userRepository: UsersRepository) {}

    async execute({name,email,password,photo}: RegisterUseCaseRequest) {

        const user = await this.userRepository.findByEmail(email)
    
        if(user){
            throw new UserAlreadyExists()
        }
    
        const password_hash = await hash(password, 6)

        await this.userRepository.create({
            name,
            email,
            password: password_hash,
            photo
        })
    }

}