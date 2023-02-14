"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const utils_1 = require("../utils");
const app_errors_1 = require("../utils/app-errors");
// All business logic will be here
class ProductService {
    constructor() {
        this.repository = new database_1.ProductRepository();
    }
    async CreateProduct(productInputs) {
        try {
            const productResult = await this.repository.CreateProduct(productInputs);
            return (0, utils_1.FormateData)({
                message: 'Product created successfully',
                product: productResult
            });
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data not found', true, '', true);
        }
    }
    // async GetProducts(){
    //     try{
    //         const products = await this.repository.Products();
    //         return FormateData({
    //             products
    //         })
    //     }catch(err){
    //         throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Data not found', true, '', true)
    //     }
    // }
    async GetProducts(page, pageSize) {
        try {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;
            const products = await this.repository.Products(offset, limit);
            const totalProducts = await this.repository.TotalProducts();
            const totalPages = Math.ceil(totalProducts / pageSize);
            const currentPage = page;
            const nextPage = currentPage < totalPages ? currentPage + 1 : null;
            const previousPage = currentPage > 1 ? currentPage - 1 : null;
            const total = totalProducts;
            const paginatedData = {
                data: (0, utils_1.FormateData)({ products }),
                currentPage,
                nextPage,
                previousPage,
                totalPages,
                total
            };
            return paginatedData;
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data not found', true, '', true);
        }
    }
    async GetProductById(productId) {
        try {
            return await this.repository.FindById(productId);
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data Not found', true, '', true);
        }
    }
    async UpdateProduct(productId, productInputs) {
        try {
            const productResult = await this.repository.UpdateProduct(productId, productInputs);
            return (0, utils_1.FormateData)({
                message: 'Product updated successfully',
                product: productResult
            });
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data not found', true, '', true);
        }
    }
    async DeleteProduct(productId) {
        try {
            await this.repository.DeleteProduct(productId);
            return (0, utils_1.FormateData)({
                message: 'Product deleted successfully'
            });
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Data not found', true, '', true);
        }
    }
}
exports.default = ProductService;
