import { ProductModel } from "../models/Product";
import { APIError, STATUS_CODES } from '../../utils/app-errors';
import { Iproduct } from "../../utils/types";


export class ProductRepository {

    async CreateProduct({ name, desc, type, unit, price, available, supplier, banner }:Iproduct){

        try {
            const product = new ProductModel({
                name, desc, type, unit, price, available, supplier, banner 
            })

            const productResult = await product.save();
            return productResult;

        } catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Product', true, '', true)
        }
    }

    // async Products(){
    //     try{
    //         return await ProductModel.find();
    //     }catch(err){
    //         throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Get Product', true, '', true)
    //     }
    // }

    async Products(offset: number, limit: number) {
        try {
          return await ProductModel.find().skip(offset).limit(limit);
        } catch (err) {
          throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Get Product', true, '', true);
        }
      }
      

    async TotalProducts() {
        try {
          const count = await ProductModel.countDocuments();
          return count;
        } catch (err) {
          throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Get Total Products', true, '', true)
        }
      }
      

    async FindById(id:string){
        try{
            return await ProductModel.findById(id)

        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Product', true, '', true)
        }
    }

    async DeleteProduct(id:string){
        try{
            return await ProductModel.findByIdAndRemove(id)

        }catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Delete Product', true, '', true)
        }
    }


    async UpdateProduct(id:string, { name, desc, type, unit, price, available, supplier, banner }:Iproduct){
        try {
            const product = await ProductModel.findById(id)
            if(!product){
                throw new APIError('API Error', STATUS_CODES.NOT_FOUND, 'Product not found', true, '', true)
            }
    
            product.name = name;
            product.desc = desc;
            product.type = type;
            product.unit = unit;
            product.price = price;
            product.available = available;
            product.supplier = supplier;
            product.banner = banner;
            
            const productResult = await product.save();
            return productResult;
        } catch(err){
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Update Product', true, '', true)
        }
    }
    
    

}