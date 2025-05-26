
import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);
  try {
    const post=await newPost.save();
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const updatePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      return res.status(200).json("Post updated");
    } else {
      return res.status(403).json("Action forbidden");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      return res.status(200).json("Post deleted succesfully");
    } else {
      return res.status(403).json("Action Forbidden");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const reactPost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      return res.status(200).json("Post liked");
    }
    else{
        await post.updateOne({$pull:{likes:userId}});
        return res.status(200).json("Post Unliked");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const getTimeLinePosts = async(req,res)=>{
     const userId=req.params.id;
     try{
         const currentUserPosts=await PostModel.find({userId:userId});
         const followingPosts = await UserModel.aggregate([
          {
            $match:{
              _id: new mongoose.Types.ObjectId(userId)
            }
          },
          {
            $lookup:{
               from:"posts",
               localField:"following",
               foreignField:"userId",
               as:"followingPosts"
            }
          },
          {
            $project:{
              followingPosts:1,
              _id:0
            }
          }
         ])
         return res.status(200).json((currentUserPosts.concat(...followingPosts[0].followingPosts)).sort((a,b)=>{
          return b.createdAt-a.createdAt;
         }))
     }catch(error){
      return res.status(500).json(error);
     }
}