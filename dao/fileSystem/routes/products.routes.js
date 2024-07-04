import { Router } from "express";
import { ProductManager } from "../models/productManager.js";

const productManager = new ProductManager("./products.json")

// CRUD PRODUCTOS

const routerProd = Router()

routerProd.get('/', async (req, res) => {
    const { limit } = req.query
    const prods = await productManager.getProducts()
    const products = prods.slice(0, limit)
    res.status(200).send(products)
})

routerProd.get('/:id', async (req, res) => {
    const { id } = req.params
    const prod = await productManager.getProductById(id)
    if(prod){
        res.status(200).send(prod)
    }else{
        res.status(404).send('Producto no encontrado')
    }
})

routerProd.post('/', async (req, res) => {
    const confirm = await productManager.addProduct(req.body)

    if(confirm){
        res.status(201).send('Producto creado')
    }else{
        res.status(404).send('Producto ya existente')
    }
})

routerProd.put('/:id', async (req, res) => {
    const { id } = req.params
    const confirm = await productManager.updateProductById(id, req.body)

    if(confirm){
        res.status(200).send('Producto actualizado')
    }else{
        res.status(404).send('Producto no encontrado')
    }
})

routerProd.delete('/:id', async (req, res) => {
    const { id } = req.params
    const confirm = await productManager.deleteProductById(id)

    if(confirm){
        res.status(200).send('Producto eliminado')
    }else{
        res.status(404).send('Producto no encontrado')
    }
})

export default routerProd 