import asyncHandler from "express-async-handler";
import TaskModel from "../models/tasks/TaskModel.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        if (!userId) {
            res.status(400).json({ message: "User not found!" });
            return;
        }

        const tasks = await TaskModel.find({ user: userId });

        const totalTasks = tasks.length;
        const completedTasks = tasks.filter((task) => task.completed).length;
        const activeTasks = totalTasks - completedTasks;

        const now = new Date();
        const overdueTasks = tasks.filter((task) => !task.completed && new Date(task.dueDate) < now).length;
        const onTrackTasks = tasks.filter((task) => !task.completed && new Date(task.dueDate) >= now).length;

        const highPriorityTasks = tasks.filter((task) => task.priority === "high" && !task.completed).length;

        const completionPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

        res.status(200).json({
            totalTasks,
            completedTasks,
            activeTasks,
            overdueTasks,
            onTrackTasks,
            highPriorityTasks,
            completionPercentage,
        });
    } catch (error) {
        console.log("Error in getDashboardStats: ", error.message);
        res.status(500).json({ message: error.message });
    }
});
