import mongoose from "mongoose";
const messageSchema=mongoose.Schema(
    {
        chatId:{
            type:String
        },
        senderId:{
            type:String
        },
       text:{
        type:String
       }
    },{
        timestamps:true
    }
)
const messageModel=mongoose.model("Message",messageSchema);

export default messageModel;