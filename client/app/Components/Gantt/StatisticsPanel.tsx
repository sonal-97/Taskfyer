"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useUserContext } from "@/context/userContext";
import { serverUrl } from "@/context/taskContext";

interface Stats {
    totalTasks: number;
    completedTasks: number;
    activeTasks: number;
    overdueTasks: number;
    onTrackTasks: number;
    highPriorityTasks: number;
    completionPercentage: number;
}

const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042"];

function StatisticsPanel() {
    const { user } = useUserContext();
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    // We rely on the context to know when to refetch? 
    // For now, just fetch on mount. Ideally, we subscribe to task changes.
    // Since this is a separate component, let's just fetch once or on user changes.

    const fetchStats = async () => {
        try {
            if (!user._id) return;
            const response = await axios.get(`${serverUrl}/tasks/statistics`, {
                withCredentials: true,
            });
            setStats(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching stats:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [user]);

    if (loading) {
        return <div className="p-4">Loading stats...</div>;
    }

    if (!stats) {
        return null;
    }

    const data = [
        { name: "Completed", value: stats.completedTasks },
        { name: "Active", value: stats.activeTasks },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between">
                <h3 className="text-gray-500 text-sm font-medium">Total Tasks</h3>
                <p className="text-3xl font-bold text-gray-800">{stats.totalTasks}</p>
                <div className="text-xs text-gray-400 mt-2">
                    {stats.completionPercentage}% Completed
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between">
                <h3 className="text-gray-500 text-sm font-medium">Overdue</h3>
                <p className="text-3xl font-bold text-red-500">{stats.overdueTasks}</p>
                <div className="text-xs text-gray-400 mt-2">Action needed</div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between">
                <h3 className="text-gray-500 text-sm font-medium">High Priority</h3>
                <p className="text-3xl font-bold text-orange-500">{stats.highPriorityTasks}</p>
                <div className="text-xs text-gray-400 mt-2">Critical functionality</div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center h-32">
                <div style={{ width: "100%", height: "100%" }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={30}
                                outerRadius={50}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

export default StatisticsPanel;
