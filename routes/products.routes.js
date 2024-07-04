import { Router } from "express";
import { ProductManagerMongo } from "../dao/db/ManagerMongo/productManager.js";


const productManager = new ProductManagerMongo()

const prodRoutes = Router()

prodRoutes.get('/allProducts/:page/:lim/:ord', async (req, res) => {
    let page = req.params.page || 1
    let limit = req.params.lim || 10
    let ord = req.params.ord
    let resp = await productManager.allProduct(page, limit, ord)
    let prods = []
    //Volviendo a hacer un array a parte es la unica manera que me dejaba usar el each de Handlebars
    for (let index = 0; index < resp.payload.length; index++) {
        let prueba = {}
        prueba.name = resp.payload[index].name
        prueba.price = resp.payload[index].price
        prueba.category = resp.payload[index].category
        prueba.stock = resp.payload[index].stock
        prods.push(prueba)
    }
    
    if(resp){
        res.render('products', {
            resp: resp,
            prods: prods
        })
        //res.status(200).send(resp)
    }else{
        res.status(404).send(resp)
    }
})

prodRoutes.post('/createProd', async(req, res) => {
    let mensaje = await productManager.addProduct(req.body)
    res.status(201).send({
        msj: mensaje,
        data: req.body
    })    
})

prodRoutes.get('/getProduct/:id', async (req, res) => {
    const { id } = req.params
    const prod = await productManager.getProductById(id)
    if(prod){
        res.status(200).send(prod)
    }else{
        res.status(404).send('Producto no encontrado')
    }
})

prodRoutes.put('/updateProd/:id', async (req, res) => {
    const { id } = req.params
    const confirm = await productManager.updateProductById(id, req.body)
    if(confirm === true){
        res.status(200).send('Producto actualizado')
    }else{
        res.status(404).send('Producto no encontrado')
    }
})

prodRoutes.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    const confirm = await productManager.deleteProductById(id)

    if(confirm === true){
        res.status(200).send('Producto eliminado')
    }else{
        res.status(404).send('Producto no encontrado')
    }
})

export default prodRoutes