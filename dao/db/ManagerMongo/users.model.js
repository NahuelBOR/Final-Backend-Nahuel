import { User } from '../models/users.model.js';



export class UserManagerMongo{

    async getProductsByCart(id){
        try{
            let resp = await User.findById(id)
            return resp
        }catch(err){
            return 'Error: ', err
        }
    }

    async getProductsByIds(prodsId){
        try{
            let prods = []
            for (let index = 0; index < prodsId.length; index++) {
                let resp = await Product.findById(prodsId[index].product)
                prods.push(resp)
            }
            return prods
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