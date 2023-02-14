import ProductService from "../services/product-service";
import express, { Request, Response, NextFunction} from 'express'

export const products = (app:express.Application) => {
    const service = new ProductService();
    
    app.post('/product/create', async(req:Request | any, res:Response, next:NextFunction) => {
        try{
            const {name, desc, type, unit, price, available, supplier, banner} = req.body;
            const { data } = await service.CreateProduct({
                name, desc, type, unit, price, available, supplier, banner
            })
            return res.json(data)

        }catch(err){
            next(err)
        }
    })

    // app.get('/product/', async (req:Request | any,res:Response,next:NextFunction) => {
    //     //check validation
    //     try {
    //         const { data} = await service.GetProducts();        
    //         return res.status(200).json(data);
    //     } catch (err) {
    //         next(err)
    //     }
        
    // });

    app.get('/product/', async (req: Request | any, res: Response, next: NextFunction) => {
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
        } catch (err) {
            next(err);
        }
    });
    

    app.get('/product/ids', async(req:Request | any, res:Response, next:NextFunction) => {
        try {
          const ids = req.query.ids;
          const products = await service.GetProductById(ids);
          return res.status(200).json(products);
        } catch (err) {
          next(err)
        }
      });
      

    app.put('/product/update/:id', async (req: Request | any, res: Response, next: NextFunction) => {
        try {
            const productId = req.params.id;
            const { name, desc, type, unit, price, available, supplier, banner } = req.body;
            const { data } = await service.UpdateProduct(productId, {
                name, desc, type, unit, price, available, supplier, banner
            });
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    });
    
    app.delete('/product/delete/:id', async (req: Request | any, res: Response, next: NextFunction) => {
        try {
            const productId = req.params.id;
            const { data } = await service.DeleteProduct(productId);
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    });
    

    




    
}