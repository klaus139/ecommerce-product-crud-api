import express from 'express';
import { products } from './api/products';


export const  expressApp = async (app:express.Application) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(express.static(__dirname + '/public'))

    //api
    products(app);
 

  
    
}