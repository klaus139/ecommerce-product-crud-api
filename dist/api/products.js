"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const product_service_1 = __importDefault(require("../services/product-service"));
const products = (app) => {
    const service = new product_service_1.default();
    app.post('/product/create', async (req, res, next) => {
        try {
            const { name, desc, type, unit, price, available, supplier, banner } = req.body;
            const { data } = await service.CreateProduct({
                name, desc, type, unit, price, available, supplier, banner
            });
            return res.json(data);
        }
        catch (err) {
            next(err);
        }
    });
    // app.get('/product/', async (req:Request | any,res:Response,next:NextFunction) => {
    //     //check validation
    //     try {
    //         const { data} = await service.GetProducts();        
    //         return res.status(200).json(data);
    //     } catch (err) {
    //         next(err)
    //     }
    // });
    app.get('/product/', async (req, res, next) => {
        try {
            const { page, limit } = req.query;
            const currentPage = page ? parseInt(page) : 1;
            const limitPerPage = limit ? parseInt(limit) : 10;
            const offset = (currentPage - 1) * limitPerPage;
            const { data, total } = await service.GetProducts(limitPerPage, offset);
            const totalPages = Math.ceil(total / limitPerPage);
            const hasNextPage = currentPage < totalPages;
            const hasPrevPage = currentPage > 1;
            return res.status(200).json({
                data,
                currentPage,
                total,
                totalPages,
                hasNextPage,
                hasPrevPage
            });
        }
        catch (err) {
            next(err);
        }
    });
    app.get('/product/ids', async (req, res, next) => {
        try {
            const ids = req.query.ids;
            const products = await service.GetProductById(ids);
            return res.status(200).json(products);
        }
        catch (err) {
            next(err);
        }
    });
    app.put('/product/update/:id', async (req, res, next) => {
        try {
            const productId = req.params.id;
            const { name, desc, type, unit, price, available, supplier, banner } = req.body;
            const { data } = await service.UpdateProduct(productId, {
                name, desc, type, unit, price, available, supplier, banner
            });
            return res.status(200).json(data);
        }
        catch (err) {
            next(err);
        }
    });
    app.delete('/product/delete/:id', async (req, res, next) => {
        try {
            const productId = req.params.id;
            const { data } = await service.DeleteProduct(productId);
            return res.status(200).json(data);
        }
        catch (err) {
            next(err);
        }
    });
};
exports.products = products;
