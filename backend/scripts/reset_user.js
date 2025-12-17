import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel from "../src/models/auth/UserModel.js";
import bcrypt from "bcrypt";

dotenv.config({ path: "backend/.env" });

const resetUser = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error("MONGO_URI not found.");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        const email = "sonalkumarpathak84058@gmail.com";
        let user = await UserModel.findOne({ email });

        if (!user) {
            console.log("User not found. Creating new user.");
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("Sonal@123", salt);
            user = new UserModel({
                name: "Test User",
                email: email,
                password: hashedPassword,
            });
        } else {
            console.log("User found. Resetting password.");
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("Sonal@123", salt);
            user.password = hashedPassword;
        }

        await user.save();
        console.log(`User ${email} password set to Sonal@123`);

        mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

resetUser();
