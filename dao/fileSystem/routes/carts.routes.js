import { Router } from "express";
import { CartManager } from "../models/cartManager.js";

const cartManager = new CartManager("./carts.json")

// CRUD PRODUCTOS

const routerCart = Router()

routerCart.get('/', async (req, res) => {
    const carts = await cartManager.getCarts()
    res.status(200).send(carts)
})

routerCart.get('/:id', async (req, res) => {
    const { id } = req.params
    const prods = await cartManager.getProductsById(id)
    if(prods){
        res.status(200).send(prods)
    }else{
        res.status(404).send('Producto no encontrado')
    }
})

routerCart.post('/', async (req, res) => {
    await cartManager.addCart(req.body)
    res.status(201).send('Carro creado')
})

routerCart.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    await cartManager.addProd(cid, pid)
    res.status(201).send('Producto Agregado')
})

export default routerCart