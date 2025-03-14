import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";

class OrderController{
    private orderService: OrderService

    constructor(){
        this.orderService = new OrderService();
    }

    async create(req: Request, res:Response){
        try{
          
            const {table, name} = req.body 

            const order = await this.orderService.create({table, name})

            return res.status(200).json(order)
        }catch(err:any){
            return res.status(400).json({Error:err.message})
        }
    }

    async remove(req: Request, res:Response){
        try{
          
            const orderID = req.query.orderID as string

            const order = await this.orderService.remove(orderID)

            return res.status(200).json(order)
        }catch(err:any){
            return res.status(400).json({Error:err.message})
        }
    }

    async addItemOrder(req: Request, res:Response){
        try{
          
            const {orderID, productID, amount} = req.body

            const item = await this.orderService.addItemOrder({orderID, productID, amount})

            return res.status(200).json(item)
        }catch(err:any){
            return res.status(400).json({Error:err.message})
        }
    }

    async removeItemOrder(req: Request, res:Response){
        try{
          
            const itemID = req.query.itemID as string

            const item = await this.orderService.removeItemOrder(itemID)

            return res.status(200).json(item)
        }catch(err:any){
            return res.status(400).json({Error:err.message})
        }
    }

    async sendOrder(req: Request, res:Response){
        try{
          
            const {orderID} = req.body

            const order = await this.orderService.sendOrder(orderID)

            return res.status(200).json(order)
        }catch(err:any){
            return res.status(400).json({Error:err.message})
        }
    }

    async listOrders(req: Request, res:Response){
        try{
          
            const orders = await this.orderService.listOrders()

            return res.status(200).json(orders)
        }catch(err:any){
            return res.status(400).json({Error:err.message})
        }
    }

    async detailOrder(req: Request, res:Response){
        try{

            const orderID = req.query.orderId as string
            
            const order = await this.orderService.detailOrders(orderID)

            return res.status(200).json(order)
        }catch(err:any){
            return res.status(400).json({Error:err.message})
        }
    }

    async finishOrder(req: Request, res:Response){
        try{

            const orderID = req.query.orderId as string
            
            const order = await this.orderService.finishOrder(orderID)

            return res.status(200).json(order)
        }catch(err:any){
            return res.status(400).json({Error:err.message})
        }
    }

}

export {OrderController}