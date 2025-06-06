import chatModel from "../Models/chatModel.js";

export const createChat = async (req, res) => {
  const newChat = new chatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const userChats=async(req,res)=>{
    try{ 
      
        const chat=await chatModel.find({
            members:{$in:[req.params.userId]}
        })
      
        return res.status(200).json(chat);
    }catch(error){
        return res.status(500).json(error);
    }
}

export const findChat=async(req,res)=>{
  try{
     const chat=await chatModel.findOne({
      members:{$all:[req.params.firstId,req.params.secondId]}
     })
     return res.status(200).json(chat);
  }catch(error){
    return res.status(500).json(error);
  }
}
