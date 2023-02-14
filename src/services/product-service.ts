import { ProductRepository } from "../database";
import { FormateData } from "../utils";
import { APIError, STATUS_CODES } from "../utils/app-errors"; 
import { Iproduct } from "../utils/types";

// All business logic will be here
class ProductService {
    repository: ProductRepository;

    constructor() {
        this.repository = new ProductRepository();
    }

    async CreateProduct(productInputs: Iproduct){
        try{
            const productResult = await this.repository.CreateProduct(productInputs)
            return FormateData({
                message: 'Product created successfully',
                product: productResult
            })
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Data not found', true, '', true)
        }
    }

    async GetProducts(){
        try{
            const products = await this.repository.Products();
            return FormateData({
                products
            })
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Data not found', true, '', true)
        }
    }

    async GetProductById(productId: any){
        try {
            return await this.repository.FindById(productId);
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR,'Data Not found',true, '', true)
        }
    }

    async UpdateProduct(productId: any, productInputs: Iproduct){
        try{
            const productResult = await this.repository.UpdateProduct(productId, productInputs)
            return FormateData({
                message: 'Product updated successfully',
                product: productResult
            })
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Data not found', true, '', true)
        }
    }
    
    async DeleteProduct(productId: any){
        try{
            await this.repository.DeleteProduct(productId);
            return FormateData({
                message: 'Product deleted successfully'
            })
        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Data not found', true, '', true)
        }
    }
    

    

}

export default ProductService;