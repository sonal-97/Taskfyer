import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      unique: true,
    },

    description: {
      type: String,
      default: "No description",
    },

    dueDate: {
      type: Date,
      default: Date.now(),
    },

    startDate: {
      type: Date,
      default: Date.now(),
    },

    dependencies: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "Task" }],
      default: [],
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",//focus on default
    },

    completed: {//task completed
      type: Boolean,
      default: false,
    },

    priority: {//of tasks
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    user: {//every task req a user that will use moongose default schema
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }//for when the task was created
);

const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
