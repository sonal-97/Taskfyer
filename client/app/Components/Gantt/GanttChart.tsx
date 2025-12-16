"use client";
import React, { useState, useEffect } from "react";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useTasks } from "@/context/taskContext";


interface GanttChartProps {
    tasks: any[];
}

function GanttChart({ tasks }: GanttChartProps) {
    const { updateTask } = useTasks();
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Day);
    const [ganttTasks, setGanttTasks] = useState<Task[]>([]);

    useEffect(() => {
        if (tasks && tasks.length > 0) {
            const formattedTasks: Task[] = tasks.map((task) => {
                const start = task.startDate ? new Date(task.startDate) : new Date(task.createdAt);
                const end = task.dueDate ? new Date(task.dueDate) : new Date(new Date().setDate(new Date().getDate() + 1));

                // Ensure end > start
                if (end <= start) {
                    end.setTime(start.getTime() + (24 * 60 * 60 * 1000));
                }

                return {
                    start,
                    end,
                    name: task.title,
                    id: task._id,
                    type: "task",
                    progress: task.completed ? 100 : task.status === "active" ? 50 : 0,
                    isDisabled: false,
                    styles: {
                        progressColor: task.completed ? "#00C49F" : "#0088FE",
                        progressSelectedColor: "#ff9e0d",
                        backgroundColor: task.completed ? "#D0F0C0" : "#dbeafe",
                    },
                    dependencies: task.dependencies || [],
                };
            });
            setGanttTasks(formattedTasks);
        } else {
            setGanttTasks([]);
        }
    }, [tasks]);

    const handleTaskChange = (task: Task) => {
        // Optimistic update
        const newTasks = ganttTasks.map((t) => (t.id === task.id ? task : t));
        setGanttTasks(newTasks);

        // Call API
        updateTask({
            _id: task.id,
            startDate: task.start,
            dueDate: task.end,
            completed: task.progress === 100,
        });
    };

    const handleDateChange = (task: Task) => {
        handleTaskChange(task);
    };

    const handleProgressChange = async (task: Task) => {
        handleTaskChange(task);
    };

    if (ganttTasks.length === 0) {
        return <div className="p-10 text-center text-gray-500">No tasks available for Gantt Chart. Create some tasks!</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 overflow-x-auto">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Timeline</h2>
                <div className="space-x-2">
                    <button
                        onClick={() => setViewMode(ViewMode.Day)}
                        className={`px-3 py-1 rounded text-sm ${viewMode === ViewMode.Day ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    >
                        Days
                    </button>
                    <button
                        onClick={() => setViewMode(ViewMode.Week)}
                        className={`px-3 py-1 rounded text-sm ${viewMode === ViewMode.Week ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    >
                        Weeks
                    </button>
                    <button
                        onClick={() => setViewMode(ViewMode.Month)}
                        className={`px-3 py-1 rounded text-sm ${viewMode === ViewMode.Month ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    >
                        Months
                    </button>
                </div>
            </div>
            <div className="w-full">
                <Gantt
                    tasks={ganttTasks}
                    viewMode={viewMode}
                    onDateChange={handleDateChange}
                    onProgressChange={handleProgressChange}
                    listCellWidth="155px"
                    columnWidth={viewMode === ViewMode.Month ? 300 : 65}
                    barBackgroundColor="#dbeafe"
                    barProgressColor="#3b82f6"
                />
            </div>
        </div>
    );
}

export default GanttChart;
