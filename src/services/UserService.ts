import { hash, compare } from "bcryptjs";
import prisma from "../prisma";
import {sign} from 'jsonwebtoken'

interface UserRequest{
    name?: string,
    email: string,
    password: string
}

class UserService{
    async create({name, email, password}: UserRequest){
        
        if(!name){
            throw new Error("Nome do usuário é obrigatório.")
        }
        if(!email){
            throw new Error("Email do usuário é obrigatório.")
        }
        if(!password){
            throw new Error("Senha do usuário é obrigatório.")
        }

        //Validando se já não existe esse usuário no banco.
        const userAlreadyExist = await prisma.user.findFirst({
            where:{
                email:email
            }
        })

        if(userAlreadyExist){
            throw new Error("Usuário já existe.")
        }

        const passwordHash = await hash(password, 8)

        //Falta a parte de criptografar a senha.

        //Criando o usuário de fato.
        const newUser = await prisma.user.create({
            data:{
                email:email,
                name:name,
                password:passwordHash
            },
            select:{
                id:true,
                name:true,
                email:true
            }
        })

        return newUser
    }

    async auth({email, password}:UserRequest){
        if(!email){
            throw new Error("Email do usuário é obrigatório.")
        }
        if(!password){
            throw new Error("Senha do usuário é obrigatório.")
        }

        const user = await prisma.user.findFirst({
            where:{
                email:email
            }
        })

        if(!user){
            throw new Error("Usuário não existe.")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Usuário/Senha incorreto.")
        }

        const token = sign(
            {
                name:user.name,
                email:user.name,
            },
            process.env.JWT_SECRET,
            {
                subject:user.id,
                expiresIn:'30d'
            }

        )
        return {
            id:user.id,
            name:user.name,
            email:user.email,
            token:token
        }
    }

    async detail(userId: string){
        const user = await prisma.user.findFirst({
            where:{
                id:userId
            },
            select:{
                id:true,
                name:true,
                email:true
            }
        })
        return user
    }

}

export {UserService}