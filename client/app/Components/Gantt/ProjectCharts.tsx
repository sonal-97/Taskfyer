"use client";
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

interface ProjectChartsProps {
    data: any[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

function ProjectCharts({ data }: ProjectChartsProps) {
    // Calculate duration in days for each task
    const chartData = data.map((task, index) => {
        const start = new Date(task.startDate);
        const end = new Date(task.dueDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclusive

        return {
            name: task.title,
            days: diffDays,
            phase: task.title.split(" ")[0], // Simple grouping
            color: COLORS[index % COLORS.length],
        };
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Bar Chart: Duration */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-700 mb-4">Phase Duration (Days)</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-25} textAnchor="end" height={60} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="days" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Pie Chart: Distribution */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-700 mb-4">Work Distribution</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="days"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default ProjectCharts;
