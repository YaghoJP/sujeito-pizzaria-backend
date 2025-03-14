import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary"; 

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
})

class ProductController{
    private productService: ProductService

    constructor(){
        this.productService = new ProductService();
    }

    async create(req: Request, res: Response){
        try{
            const {name, price, description, categoryId} = req.body
        
            if(!req.files || Object.keys(req.files).length === 0){
                throw new Error("Error upload file")
            }
            
            const file: UploadedFile = req.files['file']

            const resultFile: UploadApiResponse = await new Promise((resolve, reject)=>{
                cloudinary.uploader.upload_stream({}, function (error, result){
                    if(error){
                        reject(error)
                        return;
                    }
                    resolve(result)
                }).end(file.data)
            })

            const product = await this.productService.create({name, price, description, banner: resultFile.url, categoryId})

            return res.status(200).json(product)

        }catch(err:any){
            return res.status(400).json({Error:err.message})
        }
    }
    async listByCategory(req: Request, res: Response){
        try{
            const categoryId = req.query.category_id as string

            const products = await this.productService.listByCategory(categoryId)

            return res.status(200).json(products)

        }catch(err:any){
            return res.status(400).json({Error:err.message})
        }
    }
}

export {ProductController}