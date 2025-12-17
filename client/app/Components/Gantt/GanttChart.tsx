"use client";
import React, { useState } from "react";
import { useTasks } from "@/context/taskContext";

interface GanttChartProps {
    tasks: any[];
}

function GanttChart({ tasks }: GanttChartProps) {
    const { updateTask } = useTasks();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<{ title: string; startDate: string; dueDate: string }>({
        title: "",
        startDate: "",
        dueDate: "",
    });

    const formatDate = (dateStr: string | Date) => {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return "";
        return d.toISOString().split("T")[0]; // YYYY-MM-DD
    };

    const formatDisplayDate = (dateStr: string | Date) => {
        if (!dateStr) return "Not set";
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return "Not set";
        return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    };

    const startEditing = (task: any) => {
        setEditingId(task._id);
        setEditData({
            title: task.title || "",
            startDate: formatDate(task.startDate),
            dueDate: formatDate(task.dueDate),
        });
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditData({ title: "", startDate: "", dueDate: "" });
    };

    const saveEditing = async (taskId: string) => {
        await updateTask({
            _id: taskId,
            title: editData.title,
            startDate: editData.startDate,
            dueDate: editData.dueDate,
        });
        setEditingId(null);
        setEditData({ title: "", startDate: "", dueDate: "" });
    };

    if (!tasks || tasks.length === 0) {
        return (
            <div className="p-10 text-center text-gray-500">
                No tasks available. Create some tasks to see them here!
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Project Timeline</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-500 to-teal-400 text-white">
                            <th className="p-3 text-left font-semibold rounded-tl-lg">Task Name</th>
                            <th className="p-3 text-left font-semibold">From</th>
                            <th className="p-3 text-left font-semibold">To</th>
                            <th className="p-3 text-center font-semibold rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr
                                key={task._id}
                                className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    }`}
                            >
                                {editingId === task._id ? (
                                    <>
                                        <td className="p-3">
                                            <input
                                                type="text"
                                                value={editData.title}
                                                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                                className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="date"
                                                value={editData.startDate}
                                                onChange={(e) => setEditData({ ...editData, startDate: e.target.value })}
                                                className="p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                        </td>
                                        <td className="p-3">
                                            <input
                                                type="date"
                                                value={editData.dueDate}
                                                onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
                                                className="p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                        </td>
                                        <td className="p-3 text-center space-x-2">
                                            <button
                                                onClick={() => saveEditing(task._id)}
                                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={cancelEditing}
                                                className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors text-sm"
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="p-3 font-medium text-gray-800">{task.title}</td>
                                        <td className="p-3 text-gray-600">{formatDisplayDate(task.startDate)}</td>
                                        <td className="p-3 text-gray-600">{formatDisplayDate(task.dueDate)}</td>
                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => startEditing(task)}
                                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GanttChart;
