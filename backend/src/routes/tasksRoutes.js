import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task/taskController.js";
import { protect } from "../middleware/authMiddleware.js";//here the protect function is imported from middleware

const router = express.Router();

router.post("/task/create", protect, createTask);//protect checks if the user is logged in if not nothing will work that is protected.
router.get("/tasks", protect, getTasks);//protect function is created and defined in middleware/authmiddleware.js
router.get("/task/:id", protect, getTask);
router.patch("/task/:id", protect, updateTask);
router.delete("/task/:id", protect, deleteTask);

export default router;
