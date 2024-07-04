import { Product } from '../models/products.model.js'



export class ProductManagerMongo{

    async allProduct(page, limit, ord){
        try{    
            let resp = await Product.paginate({},{limit: limit, page: page})
            let prod = [] 
            if (ord == "asc") {
               prod = resp.docs.sort(function (a, b) {
                if (a.price > b.price) {
                  return 1;
                }
                if (a.price < b.price) {
                  return -1;
                }
                return 0;
              });
              
            } else {
                prod = resp.docs.sort(function (b, a) {
                    if (a.price > b.price) {
                      return 1;
                    }
                    if (a.price < b.price) {
                      return -1;
                    }
                    return 0;
                  });
            }

            let respuesta = {
                status: resp.docs.length > 0 ? 'success' : 'error',
                payload: prod,
                totalPages: resp.totalPages,
                prevPage: resp.prevPage,
                nextPage: resp.nextPage,
                page: resp.page,
                hasPrevPage: resp.hasPrevPage,
                hasNextPage: resp.hasNextPage,
                prevLink: resp.prevPage == null ? resp.prevPage : `http://localhost:8080/api/prod/allProducts/${resp.prevPage}/${resp.limit}/${ord}`,
                nextLink: resp.nextPage == null ? resp.nextPage : `http://localhost:8080/api/prod/allProducts/${resp.nextPage}/${resp.limit}/${ord}`,
                link: resp.nextPage == null ? resp.nextPage : `http://localhost:8080/api/prod/allProducts/${resp.page}/${resp.limit}/`
            }
            //let resp = await Product.find()
            return respuesta
        }catch(err){
            return 'Error: ', err
        }
    }

    async addProduct(prod){
        try{
            await Product.create(prod)
            return 'Producto creado'
        }catch(err){
            return 'Error: ', err
        }
    }

    async getProductById(id){
        try{
            let resp = await Product.findById(id)
            return resp
        }catch(err){
            return 'Error: ', err
        }
    }

    async updateProductById(id, change) {
        try{
            await Product.findByIdAndUpdate(id, change)
            return true
        }catch(err){
            return 'Error: ', err
        }
    }

    async deleteProductById(id) {
        try{
            await Product.findByIdAndDelete(id)
            return true
        }catch(err){
            return 'Error: ', err
        }
    }
}