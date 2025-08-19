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

    return { registerUser, loginUser };
}
export { userController };