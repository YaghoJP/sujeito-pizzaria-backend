import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";

class CategoryController{
    private categoryService: CategoryService

    constructor(){
        this.categoryService = new CategoryService()
    }

    async create(req: Request, res: Response){
        try{
            const {name} = req.body

            const category = await this.categoryService.create({name})

            return res.status(200).json(category)

        }catch(err:any){
            return res.status(400).json({Error:err.message})
        }
    }

    async list(req: Request, res: Response){
        try{

            const categories = await this.categoryService.list()

            return res.status(200).json(categories)

        }catch(err:any){
            return res.status(400).json({Error:err.message})
        }
    }

}

export {CategoryController}