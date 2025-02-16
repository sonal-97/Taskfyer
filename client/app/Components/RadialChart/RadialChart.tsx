"use client";
import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTasks } from "@/context/taskContext";

export const description = "A radial chart with stacked sections";

// TypeScript Type for Chart Data
interface ChartData {
  pending: number;
  completed: number;
}

const chartConfig: ChartConfig = {
  desktop: {
    label: "Completed",
    color: "#8BCE89",
  },
  mobile: {
    label: "Pending",
    color: "#EB4E31",
  },
};

const RadialChart: React.FC = () => {
  const { tasks, completedTasks, activeTasks } = useTasks();
  const tasksTotal = tasks.length;

  const chartData: ChartData[] = [
    {
      pending: activeTasks.length,
      completed: completedTasks.length,
    },
  ];

  return (
    <Card className="flex flex-col border-2 border-white shadow-none bg-[#EDEDED]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Completed vs Pending Tasks</CardTitle>
        <CardDescription>Task completion status.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[220px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={70}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {tasksTotal}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Tasks
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="completed"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-desktop)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="pending"
              fill="var(--color-mobile)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm pb-2">
        <div className="flex items-center gap-2 font-medium leading-none">
          Task completion improved by 12% this month{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Analysis based on tasks completed in the last 30 days.
        </div>
      </CardFooter>
    </Card>
  );
};

export default RadialChart;
