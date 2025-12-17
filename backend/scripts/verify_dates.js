import mongoose from "mongoose";
import dotenv from "dotenv";
import TaskModel from "../src/models/tasks/TaskModel.js";
import UserModel from "../src/models/auth/UserModel.js";

dotenv.config({ path: "backend/.env" });

const verifyDates = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error("MONGO_URI not found in environment variables.");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB.");

        // Find a user to assign the task to (required by schema)
        const user = await UserModel.findOne();
        if (!user) {
            console.log("No users found. Cannot create task.");
            process.exit(0);
        }
        console.log(`Using user: ${user.email} (${user._id})`);

        const startDate = new Date("2025-01-09");
        const dueDate = new Date("2025-01-17");

        const taskData = {
            title: "Test Task " + Date.now(),
            description: "Test Description",
            startDate: startDate,
            dueDate: dueDate,
            priority: "high",
            status: "active",
            user: user._id,
        };

        console.log("Creating task with dates:", { startDate, dueDate });

        const task = new TaskModel(taskData);
        await task.save();

        console.log("Task saved.");

        const fetchedTask = await TaskModel.findById(task._id);
        console.log("Fetched Task Dates:");
        console.log("Start Date:", fetchedTask.startDate);
        console.log("Due Date:", fetchedTask.dueDate);

        if (
            fetchedTask.startDate.toISOString() === startDate.toISOString() &&
            fetchedTask.dueDate.toISOString() === dueDate.toISOString()
        ) {
            console.log("SUCCESS: Dates match!");
        } else {
            console.error("FAILURE: Dates do not match!");
            console.error("Expected Start:", startDate.toISOString(), "Got:", fetchedTask.startDate.toISOString());
            console.error("Expected Due:", dueDate.toISOString(), "Got:", fetchedTask.dueDate.toISOString());
        }

        // Cleanup
        await TaskModel.findByIdAndDelete(task._id);
        console.log("Test task deleted.");

        mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

verifyDates();
