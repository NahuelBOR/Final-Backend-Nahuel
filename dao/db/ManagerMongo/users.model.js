import { User } from '../models/users.model.js';
import { Product } from '../models/products.model.js';



export class UserManagerMongo{

    async getProductsByUser(array){
        try{
            let prods = []
            for (let index = 0; index < array.length; index++) {
                let resp = await Product.findById(array[index].product)
                prods.push(resp)
            }
            return prods
        }catch(err){
            return 'Error: ', err
        }
    }
}