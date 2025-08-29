import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  avatar: { type: String},
  Fullname: { type: String, required: true },
  email: { type: String, required: true },
  PhoneNo: { type: Number, required: true },
  password: { type: String, required: true },
  postedDatas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }]
});
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  location: String
})


const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
export { User, Post };