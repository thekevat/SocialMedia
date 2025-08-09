import messageModel from "../Models/messageModel.js";

export const addMessage = async (req, res) => {
  const senderId=req.user.id;
  
  const { chatId, text } = req.body;
  const message = new messageModel({
    chatId,
    senderId,
    text,
  });
  try{
    const result = await message.save();
    return res.status(200).json(result);
  }catch(error){
     return res.status(500).json(error);
  }
};

export const getMessages=async(req,res)=>{
    const chatId=req.params.chatId;
    try{
       const result=await messageModel.find({chatId});
       return res.status(200).json(result);
    }catch(error){
        return res.status(500).json(error);
    }
}