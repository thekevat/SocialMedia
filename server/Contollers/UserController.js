import UserModel from "../Models/userModel.js";
import chatModel from "../Models/chatModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      return res.status(200).json(otherDetails);
    } else {
      return res.status(404).json("No such user exists");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentUserAdminStatus, password } = req.body;
  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      return res.status(200).json({ user, token });
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res
      .status(403)
      .json("Access denied! You can only update your own profile");
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;
  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      return res.status(200).json("User deleted succesfully");
    } catch (error) {
      return res.staus(500).json(error);
    }
  } else {
    return res
      .status(403)
      .json("Access denied! You can only delete your own profile");
  }
};

export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  if (_id === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);
      if (!followUser.follower.includes(_id)) {
        await followingUser.updateOne({ $push: { following: id } });
        await followUser.updateOne({ $push: { follower: _id } });
        const isMutual = followUser.following.includes(_id);
        if (isMutual) {
          const existingChat = await chatModel.findOne({
            members: { $all: [id, _id] },
          });
          if (!existingChat) {
            const newChat = new chatModel({
              members: [id, _id],
            });
            await newChat.save();
          }
        }

        return res.status(200).json("User Followed!");
      } else {
        return res.status(403).json("User is already followed by you!");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};
export const unFollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  if (_id === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);
      if (followUser.follower.includes(_id)) {
        await followingUser.updateOne({ $pull: { following: id } });
        await followUser.updateOne({ $pull: { follower: _id } });
        const existingChat = await chatModel.findOne({
          members: { $all: [id, _id] },
        });
        if (existingChat) {
          await existingChat.deleteOne(); 
        }
        return res.status(200).json("User unfollowed!");
      } else {
        return res.status(403).json("User is not followed by you!");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};
