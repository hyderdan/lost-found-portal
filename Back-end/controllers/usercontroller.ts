import { User } from "../schema/userModel";
import { Request, Response } from "express";

const userController = () => {
    
    const registerUser = async (req: Request, res: Response) => {
        try {
            const { Fullname, email, PhoneNo, password } = req.body;
            const newUser = new User({ Fullname, email, PhoneNo, password });
            await newUser.save();
            res.status(201).json({ message: "User registered successfully", user: newUser });
            console.log("User registered successfully :",newUser);
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    return { registerUser };
}
export { userController };