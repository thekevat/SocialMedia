import mongoose from "mongoose";
const chatSchema = mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);
const chatModel=mongoose.model("Chat",chatSchema);
export default chatModel;