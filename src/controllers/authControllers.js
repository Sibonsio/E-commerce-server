import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const registerUser = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { fullname, email, password, terms, subscribe } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ fullname, email, password: hashedPassword, terms, subscribe });
        await user.save({ session });
        await session.commitTransaction();
        res.status(201).json({ success: true, data: { user }, message: "User created successfully" });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ success: false, message: error.message });
    } finally {
        await session.endSession();
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(200).json({ success: true, data: { user }, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}