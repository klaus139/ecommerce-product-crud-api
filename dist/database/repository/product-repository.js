"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const Product_1 = require("../models/Product");
const app_errors_1 = require("../../utils/app-errors");
class ProductRepository {
    async CreateProduct({ name, desc, type, unit, price, available, supplier, banner }) {
        try {
            const product = new Product_1.ProductModel({
                name, desc, type, unit, price, available, supplier, banner
            });
            const productResult = await product.save();
            return productResult;
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Product', true, '', true);
        }
    }
    async Products() {
        try {
            return await Product_1.ProductModel.find();
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Get Product', true, '', true);
        }
    }
    async FindById(id) {
        try {
            return await Product_1.ProductModel.findById(id);
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Product', true, '', true);
        }
    }
    async DeleteProduct(id) {
        try {
            return await Product_1.ProductModel.findByIdAndRemove(id);
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Delete Product', true, '', true);
        }
    }
    async UpdateProduct(id, { name, desc, type, unit, price, available, supplier, banner }) {
        try {
            const product = await Product_1.ProductModel.findById(id);
            if (!product) {
                throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.NOT_FOUND, 'Product not found', true, '', true);
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
        }
        catch (err) {
            throw new app_errors_1.APIError('API Error', app_errors_1.STATUS_CODES.INTERNAL_ERROR, 'Unable to Update Product', true, '', true);
        }
    }
}
exports.ProductRepository = ProductRepository;
