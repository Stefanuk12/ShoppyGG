// Dependencies
import { IProduct } from '../Interfaces/IProduct.js'
import { Shoppy } from '../index.js'

// Product Class
export interface Product extends IProduct {}
export class Product {
    // Construtor
    constructor(Data: IProduct){
        // Make sure API key has been given
        if (Shoppy.apiKey == undefined){
            throw(new Error("Please set the API key first by doing: const shoppy = new Shoppy(\"keyhere\")"))
        }

        //
        Object.assign(this, Data)
    }
    
    // Get all products
    static async all(page: number = -1){
        try {
            // Get Response
            let response

            // Page
            if (page > 0){
                response = await Shoppy.HttpClient.post("products", {
                    form: {page: page}
                })
            } else {
                response = await Shoppy.HttpClient.post("products")
            }    
            
            // Return Parsed Response
            return <IProduct[]>JSON.parse(response.body)
        } catch(error){
            // Return Error
            return error
        } 
    }

    // Get a specific product
    static async retrieve(id: string){
        try {
            // Get Response
            const response = await Shoppy.HttpClient.post(`products/${id}`)
            
            // Return Parsed Response
            return <IProduct>JSON.parse(response.body)
        } catch(error){
            // Return Error
            return error
        } 
    }

    // Create a product
    static async create(data: Object){
        try {
            // Get Response
            const response = await Shoppy.HttpClient.put("products", {
                form: data
            })
            
            // Return Parsed Response
            return response.statusCode
        } catch(error){
            // Return Error
            return error
        } 
    }
    async create(){
        return await Product.create(this)
    }

    // Update a product
    static async update(id: string, data: IProduct){
        try {
            // Get Response
            const response = await Shoppy.HttpClient.post(`products/${id}`, {
                form: data
            })
            
            // Return Parsed Response
            return response.statusCode
        } catch(error){
            // Return Error
            return error
        }
    }
    async update(){
        return await Product.update(this.id, this)
    }

    // Delete a product
    static async delete(id: string){
        try {
            // Get Response
            const response = await Shoppy.HttpClient.delete(`products/${id}`)
            
            // Return Response
            return response.statusCode
        } catch(error){
            // Return Error
            return error
        }
    }
    async delete(){
        return await Product.delete(this.id)
    }

    /* Not implemented because I do not know how to
    async updateImage(id: string, image: string){
        try {
            // Get Response
            const response = await Shoppy.HttpClient.post(`products/${id}/image`, {
                form: {file: image}
            })
            
            // Return Response
            return response.statusCode
        } catch(error){
            // Return Error
            return error
        }
    }
    */
}