import { User, Post } from "../schema/userModel";
import { Request, Response } from "express";

const postController = () => {
    const createPost = async (req: Request, res: Response) => {
        try {
            const newPost = new Post(req.body);
            await newPost.save();
            const userId = req.body.userId;
            if (userId) {
                const user = await User.findById(userId);
                if (user) {
                    user.postedDatas.push(newPost._id);
                    await user.save();
                }
            }
            res.status(201).json(newPost);
            console.log("Post created successfully:", newPost);
        } catch (error) {
            res.status(500).json({ error: "Failed to create post" });
        }
    };
    const getPOsts = async (req: Request, res: Response) => {
        try{

        }catch(error){
            res.status(500).json({ error: "Failed to fetch posts" });
        }
    }

    return { createPost };
}
export { postController };