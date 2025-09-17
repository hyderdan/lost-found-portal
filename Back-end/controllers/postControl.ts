import { User, Post } from "../schema/userModel";
import { Request, Response } from "express";

const postController = () => {
    // Create a new post
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
            console.log("✅ Post created successfully:", newPost);
        } catch (error) {
            console.error("❌ Error creating post:", error);
            res.status(500).json({ error: "Failed to create post" });
        }
    };

    // Fetch posts
    const getPosts = async (req: Request, res: Response) => {
        try {
        const posts = await Post.find({})
            // .populate("userId", "username email") // include user info
            // .sort({ createdAt: -1 }); // newest first

        res.status(200).json(posts);
        console.log("✅ Posts fetched successfully:", posts);
    } catch (error) {
        console.error("❌ Error fetching posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
    };

    return { createPost, getPosts };
};

export { postController };
