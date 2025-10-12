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
            // console.log("✅ Post created successfully:", newPost);
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
        // console.log("✅ Posts fetched successfully:", posts);
    } catch (error) {
        console.error("❌ Error fetching posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
    };
    const deletePost = async (req: Request, res: Response) => {
        // const { postId } = req.params;
        const { userId, postId } = req.body;

        try {
            // Delete the post
            await Post.findByIdAndDelete(postId);

            // Remove the post ID from the user's postedDatas array
            await User.findByIdAndUpdate(userId, {
                $pull: { postedDatas: postId },
            });

            res.status(200).json({ message: "Post deleted successfully." });
        } catch (error) {
            console.error("Error deleting post:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    return { createPost, getPosts, deletePost };
};

export { postController };
