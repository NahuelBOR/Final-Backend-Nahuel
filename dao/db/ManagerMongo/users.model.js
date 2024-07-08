import { User } from '../models/users.model.js';
import { Product } from '../models/products.model.js';



export class UserManagerMongo{

    async getProductsByUser(uid){
        try{
            let user = await User.findById(uid)
            let array = user.cart[0].products
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

    async deleteOneProd(uid, pid){
        try{
            let user = await User.findById(uid)
            console.log('1', user.cart[0].products);
            let prods = user.cart[0].products
            let resultado = prods.filter(prods => prods.product != pid)
            console.log('--------------', resultado);
            user.cart[0].products = resultado
            console.log('2', user.cart[0].products);
            console.log('2------', user.cart);
            await User.updateOne({ _id: uid}, user)
            let prueba = await User.findById(uid)
            console.log('3', prueba.cart[0].products);

            return resultado
        }catch(err){
            return 'Error: ', err
        }
    }
}