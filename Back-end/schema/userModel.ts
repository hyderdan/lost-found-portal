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
  itemType: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String, required: true },
  contactInfo: { type: String, required: true }
})


const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
export { User, Post };