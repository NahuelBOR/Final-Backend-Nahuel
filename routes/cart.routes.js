import { Router } from "express";
import { CartManagerMongo } from "../dao/db/ManagerMongo/cartManager.js";

const cartManager = new CartManagerMongo()

const cartRoutes = Router()

cartRoutes.get('/allCarts', async (req, res) => {
    const resp = await cartManager.allCarts()
    if(resp){
        res.status(200).send(resp)
    }else{
        res.status(404).send(resp)
    }
})

cartRoutes.post('/addCart', async(req, res) => {
    let mensaje = await cartManager.addCart(req.body)
    res.status(201).send({
        msj: mensaje,
        data: req.body
    })    
})

cartRoutes.get('/getCart/:id', async (req, res) => {
    const { id } = req.params
    const prod = await cartManager.getCartById(id)
    if(prod){
        res.status(200).send(prod)
    }else{
        res.status(404).send('Producto no encontrado')
    }
})

cartRoutes.put('/updateProd/:id', async (req, res) => {
    const { id } = req.params
    const confirm = await cartManager.updateProductById(id, req.body)
    if(confirm === true){
        res.status(200).send('Producto actualizado')
    }else{
        res.status(404).send('Producto no encontrado')
    }
})

cartRoutes.put('/addProd/:cid/:pid', async (req, res) => {
    const { cid , pid } = req.params
    const confirm = await cartManager.addProductById(cid, pid)
    if(confirm === true){
        res.status(200).send('Producto agregado')
    }else{
        res.status(404).send('Producto no encontrado')
    }
})

cartRoutes.put('/:cid/products/:pid', async (req, res) => { //PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
    const { cid , pid } = req.params
    const confirm = await cartManager.acctualizaProd(cid, pid, req.body.cant)
    if(confirm === true){
        res.status(200).send('Producto actualizado')
    }else{
        res.status(404).send('Producto no encontrado')
    }
})

cartRoutes.get('/:uid/products/:pid', async (req, res) => {
    const { uid , pid} = req.params
    const confirm = await cartManager.agregaUnProd(uid, pid)
    if(confirm === true){
        res.status(200).send('Producto agregado')
    }else{
        res.status(404).send('Producto no encontrado')
    }
})

cartRoutes.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    const confirm = await cartManager.deleteCartById(id)

    if(confirm === true){
        res.status(200).send('Carro eliminado')
    }else{
        res.status(404).send('Carro no encontrado')
    }
})

cartRoutes.delete('/:cid', async (req, res) => {//DELETE api/carts/:cid deberá eliminar todos los productos del carrito 
    const { cid } = req.params
    const confirm = await cartManager.deleteCart(cid)

    if(confirm === true){
        res.status(200).send('Carro eliminado')
    }else{
        res.status(404).send('Carro no encontrado')
    }
})

cartRoutes.delete('/:cid/products/:pid', async (req, res) => {//DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
    const { cid , pid } = req.params
    const confirm = await cartManager.deleteProductById(cid, pid)

    if(confirm === true){
        res.status(200).send('Producto eliminado')
    }else{
        res.status(404).send('Producto no encontrado')
    }
})

export default cartRoutes