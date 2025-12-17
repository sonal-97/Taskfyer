"use client";
import React, { useState, useRef } from "react";
import GanttChart from "../Components/Gantt/GanttChart";
import ProjectCharts from "../Components/Gantt/ProjectCharts";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

// Hardcoded "Chat Application" Project Data
const PROJECT_PHASES = [
    {
        _id: "p1",
        title: "Design Phase",
        startDate: "2025-02-01",
        dueDate: "2025-02-07",
        completed: true,
        priority: "high",
    },
    {
        _id: "p2",
        title: "DB Config & Learning",
        startDate: "2025-02-08",
        dueDate: "2025-02-14",
        completed: true,
        priority: "medium",
    },
    {
        _id: "p3",
        title: "Backend Development",
        startDate: "2025-02-15",
        dueDate: "2025-02-17",
        completed: true,
        priority: "high",
    },
    {
        _id: "p4",
        title: "Frontend Development",
        startDate: "2025-02-18",
        dueDate: "2025-02-20",
        completed: true,
        priority: "high",
    },
    {
        _id: "p5",
        title: "Integration & Deployment",
        startDate: "2025-02-21",
        dueDate: "2025-02-22",
        completed: true,
        priority: "critical",
    },
    {
        _id: "p6",
        title: "Security & JWT",
        startDate: "2025-02-23",
        dueDate: "2025-02-23",
        completed: true,
        priority: "critical",
    },
];

function DashboardGantt() {
    const ganttRef = useRef<HTMLDivElement>(null);

    const handleExport = async () => {
        if (ganttRef.current) {
            try {
                const canvas = await html2canvas(ganttRef.current);
                const image = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = image;
                link.download = "project-timeline.png";
                link.click();
            } catch (error) {
                console.error("Export failed:", error);
            }
        }
    };

    return (
        <div className="p-6 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
                        Chat App Project Timeline
                    </h1>
                    <p className="text-gray-500 text-sm">February 2025 Development Cycle</p>
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition-all"
                >
                    <Download size={18} />
                    Export Report
                </button>
            </div>

            {/* Visual Charts */}
            <ProjectCharts data={PROJECT_PHASES} />

            {/* Timeline Table */}
            <div ref={ganttRef} className="bg-white p-2 rounded shadow-sm border mt-6">
                <GanttChart tasks={PROJECT_PHASES} />
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="font-bold text-gray-700 mb-2">Project Summary</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    This timeline tracks the end-to-end development of the Chat Application, starting from <strong>Feb 1st</strong> with the Design Phase
                    and concluding on <strong>Feb 23rd</strong> with Security & JWT implementation. The phases include Database Configuration,
                    Backend/Frontend Development, Integration, and Deployment.
                </p>
            </div>
        </div>
    );
}

export default DashboardGantt;
