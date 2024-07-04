import { Messages } from '../models/chats.model.js'

export class ChatManagerMongo{

    async allMsj(){
        try{
            let resp = await Messages.find()
            return resp
        }catch(err){
            return 'Error: ', err
        }
    }

    async addMsj(msj){
        try{
            await Messages.create(msj)
            return 'Msj agregado'
        }catch(err){
            return 'Error: ', err
        }
    }
}