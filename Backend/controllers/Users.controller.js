import UsersModels from "../models/Users.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const registerUser = async (req,res) => {
    
    try {

        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            return res.status(501).json({ message: "can't hash password" });
        }

        const newUser = new UsersModels({ username, password: hashedPassword });
        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.status(201).json({ message: "User registered successfully", user: {username: savedUser.username , id: savedUser._id}, token: token });

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: "can't register user", error: error.message });
   
    }

}

export const loginUser = async (req,res) => {

    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await UsersModels.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.status(200).json({ message : "User logged in successfully", user: {username: user.username , id: user._id}, token: token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "can't login user", error: error.message });
    }
    
}

export const getMe = async (req,res) => {
    try {
        const user = await UsersModels.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        res.status(200).json({ message : "User fetched successfully", user: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "can't get user", error: error.message });
    }
}

export const updateUser = async (req,res) => {
    try {
        const { name, username, password } = req.body;
        if (!name || !username || !password) {
            return res.status(400).json({ message: "Name, username and password are required" });
        }

        
        const user = await UsersModels.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        user.name = name;
        user.username = username;
        user.password = await bcrypt.hash(password, 10);
        await user.save();
        res.status(200).json({ message : "User updated successfully", user: {username: user.username , id: user._id} });
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "can't update user", error: error.message });
    }
}