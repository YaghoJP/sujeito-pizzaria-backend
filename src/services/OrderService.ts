import prisma from "../prisma";

interface OrderRequest{
    table:number,
    name?:string
}

interface ItemRequest{
    orderID: string,
    productID: string,
    amount: number
}

class OrderService{
    async create({table, name}:OrderRequest){
        if(!table){
            throw new Error("Número da mesa é obrigatório.")
        }

        return(
            await prisma.order.create({
                data:{
                    table:table,
                    name:name
                },
                select:{
                    id:true,
                    table:true,
                    name:true,
                    draft:true,
                    status:true
                }
            })
        )
    }

    async remove(orderID:string){
        return(
            await prisma.order.delete({
                where:{
                    id:orderID
                }
            })
        )
    }

    async addItemOrder({orderID, productID, amount}:ItemRequest){

        return( 
            await prisma.item.create({
                data:{
                    order_id:orderID,
                    product_id:productID,
                    amount:amount
                },
                select:{
                    id:true,
                    order_id:true,
                    product_id:true,
                    amount:true
                }
            })
        )

    }

    async removeItemOrder(itemID:string){
        return(
            await prisma.item.delete({
                where:{
                    id:itemID
                }
            })
        )
    }

    async sendOrder(orderID: string){
        return(
            await prisma.order.update({
                where:{
                    id:orderID
                },
                data:{
                    draft:false
                }
            })
        )
    }
    async listOrders(){
        return(
            await prisma.order.findMany({
                where:{
                    draft:true,
                    status:false
                },
                orderBy:{
                    createAt:'desc'
                }
            })
        )
    }

    async detailOrders(orderID:string){
        return(
            await prisma.item.findMany({
                where:{
                    order_id:orderID
                },
                include:{
                    product:true,
                    order:true
                }
            })
        )
    }

    async finishOrder(orderID:string){
        return(
            await prisma.order.update({
                where:{
                    id:orderID
                },
                data:{
                    status:true
                }
            })
        )
    }
}

export {OrderService}