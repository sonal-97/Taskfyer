"use client";
import React, { useState, useRef } from "react";
import { useTasks } from "@/context/taskContext";
import GanttChart from "../Components/Gantt/GanttChart";
import StatisticsPanel from "../Components/Gantt/StatisticsPanel";
import FilterPanel from "../Components/Gantt/FilterPanel";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

function DashboardGantt() {
    const { tasks } = useTasks();
    const [filterPriority, setFilterPriority] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'active', 'completed'

    const ganttRef = useRef<HTMLDivElement>(null);

    const filteredTasks = tasks.filter((task: any) => {
        let matchesPriority = true;
        let matchesStatus = true;

        if (filterPriority !== "all") {
            matchesPriority = task.priority === filterPriority;
        }

        if (filterStatus !== "all") {
            if (filterStatus === "completed") {
                matchesStatus = task.completed;
            } else if (filterStatus === "active") {
                matchesStatus = !task.completed;
            }
        }

        return matchesPriority && matchesStatus;
    });

    const handleExport = async () => {
        if (ganttRef.current) {
            try {
                const canvas = await html2canvas(ganttRef.current);
                const image = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = image;
                link.download = "gantt-chart.png";
                link.click();
            } catch (error) {
                console.error("Export failed:", error);
            }
        }
    };

    return (
        <div className="p-6 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                    Project Timeline Dashboard
                </h1>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition-all"
                >
                    <Download size={18} />
                    Export
                </button>
            </div>

            <StatisticsPanel />

            <FilterPanel
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
            />

            <div ref={ganttRef} className="bg-white p-2 rounded shadow-sm border">
                <GanttChart tasks={filteredTasks} />
            </div>
        </div>
    );
}

export default DashboardGantt;
