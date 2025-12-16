"use client";
import React from "react";

interface FilterPanelProps {
    filterPriority: string;
    setFilterPriority: (priority: string) => void;
    filterStatus: string;
    setFilterStatus: (status: string) => void;
}

function FilterPanel({
    filterPriority,
    setFilterPriority,
    filterStatus,
    setFilterStatus,
}: FilterPanelProps) {
    return (
        <div className="flex gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm items-center">
            <span className="font-semibold text-gray-700">Filters:</span>

            <div className="flex items-center gap-2">
                <label className="text-sm text-gray-500">Priority:</label>
                <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
                >
                    <option value="all">All</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className="flex items-center gap-2">
                <label className="text-sm text-gray-500">Status:</label>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
        </div>
    );
}

export default FilterPanel;
