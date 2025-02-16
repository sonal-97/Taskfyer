import asyncHandler from "express-async-handler";
import TaskModel from "../../models/tasks/TaskModel.js";

export const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;//what are all the thinigs we will be needing in a new task
    //in a try catch block.

    if (!title || title.trim() === "") {//trim the empty spaces at the end of the title.=== for datatype strict matching.
      res.status(400).json({ message: "Title is required!" });
    }
    //400 meansn client eroor like invalid input
    //json sends a json response to client.

    if (!description || description.trim() === "") {
      res.status(400).json({ message: "Description is required!" });//res is the response obj provided by express.
    }
    // in other properties we already have some default like true false etc. so no need to define them unless req.
    const task = new TaskModel({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.user._id,//this line stores the id of the user who created the task
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.log("Error in createTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

export const getTasks = asyncHandler(async (req, res) => {//its get tasks with a 's' not the same as latter.
  try {
    const userId = req.user._id;

    if (!userId) {
      res.status(400).json({ message: "User not found!" });
    }

    const tasks = await TaskModel.find({ user: userId });//finds all the task user has stored previously.

    res.status(200).json({//200 means successfull , ok!
      length: tasks.length,//will tell the no of tasks we have 2 3 4 etc.
      tasks,
    });
  } catch (error) {
    console.log("Error in getTasks: ", error.message);
    res.status(500).json({ message: error.message });//500 means internal server error
  }
});

export const getTask = asyncHandler(async (req, res) => {//now we got all the tasks user has stored or updated previously.
  try { //so now new tasks.
    const userId = req.user._id;

    const { id } = req.params;//req.params means it req all the route parameters from expree url.from that  here we need id.

    if (!id) {
      res.status(400).json({ message: "Please provide a task id" });
    }

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    if (!task.user.equals(userId)) {//since ids are strings we can compare it like strings"equals" word
      res.status(401).json({ message: "Not authorized! to view this task" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.log("Error in getTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

export const updateTask = asyncHandler(async (req, res) => {//async and await
  try {
    const userId = req.user._id;

    const { id } = req.params;
    const { title, description, dueDate, priority, status, completed } =
      req.body;

    if (!id) {
      res.status(400).json({ message: "Please provide a task id" });
    }

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    // check if the user is the owner of the task
    if (!task.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    // update the task with the new data if provided or keep the old data
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.completed = completed || task.completed;

    await task.save();

    return res.status(200).json(task);
  } catch (error) {
    console.log("Error in updateTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    // check if the user is the owner of the task
    if (!task.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    await TaskModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

/// Nuclear option for deleting all tasks
export const deleteAllTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await TaskModel.find({ user: userId });

    if (!tasks) {
      res.status(404).json({ message: "No tasks found!" });
    }

    // check if the user is the owner of the task
    if (!tasks.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    await TaskModel.deleteMany({ user: userId });

    return res.status(200).json({ message: "All tasks deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteAllTasks: ", error.message);
    res.status(500).json({ message: error.message });
  }
});
