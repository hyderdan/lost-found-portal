import { User } from "../schema/userModel";
import { Request, Response } from "express";

const userController = () => {

    const registerUser = async (req: Request, res: Response) => {
        try {
            const { Fullname, email, PhoneNo, password } = req.body;
            const newUser = new User({ Fullname, email, PhoneNo, password });
            await newUser.save();
            res.status(201).json({ message: "User registered successfully", user: newUser });
            console.log("User registered successfully :", newUser);
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    const loginUser = async (req: Request, res: Response) => {
        {
            try {
                const { email, password } = req.body;
                const user = await User.findOne({ email });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                if (user.password !== password) {
                    return res.status(401).json({ message: "Invalid password" });
                }
                if (user && user.password === password) {
                    res.status(200).json({ message: "Logged in successfully", user });
                    console.log("User logged in successfully :", user);
                }

            } catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }
    const loginUserDatas = async (req: Request, res: Response) => {
        try {

            const userId = req.params.id;
            const findUser = await User.findById(userId);
            if (!findUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json({ message: "User profile data fetched successfully", findUser });
            console.log("User profile data fetched successfully :", findUser);

        } catch (error) {
            console.error("Error fetching user profile data:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    const updateUserProfile = async (req: Request, res: Response) => {
        try {
            const { Fullname, email, PhoneNo, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Update only the fields provided in req.body
            Object.assign(user, req.body);

            await user.save();
            res.status(200).json({ message: "User profile updated successfully", user });
        } catch (error) {
            console.error("Error updating user profile:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    return { registerUser, loginUser, loginUserDatas, updateUserProfile };
}
export { userController };