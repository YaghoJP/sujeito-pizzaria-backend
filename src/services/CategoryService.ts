import prisma from "../prisma";

interface CategoryRequest{
    name:string
}

class CategoryService{

    async create({name}: CategoryRequest){

        if(!name){
            throw new Error("Nome da categoria é obrigatório.")
        }

        const category = await prisma.category.create({
            data:{
                name:name
            },
            select:{
                id:true,
                name:true
            }
        })

        return(category)
    }

    async list(){
        return(
            await prisma.category.findMany({
                select:{
                    id:true,
                    name:true
                }
            })
        )
    }
}

export {CategoryService}