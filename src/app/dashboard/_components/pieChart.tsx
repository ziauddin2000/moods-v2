"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import React from "react";
import { PieData } from "@/types/dashboard";

export default function PieChartComp(): React.ReactElement {
  const data: PieData[] = [
    { name: "Group A", value: 600 },
    { name: "Group B", value: 400 },
    { name: "Group C", value: 1200 },
  ];

  const COLORS = [
    "var(--color-green4)",
    "var(--color-green3)",
    "var(--color-green1)",
  ];

  return (
    <div className="bg-linear-to-bl from-darkgreen to-gr-light rounded-xl  h-full">
      <div className="flex items-center justify-center h-full">
        <div className="h-[300px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute top-1/2 left-1/2 -translate-1/2 text-center text-primary-beige">
            <h1 className="text-4xl 2xl:text-4xl font-bold leading-[1]">95</h1>
            <p className="text-lg font-medium leading-[1]">cliënten</p>
          </div>
        </div>
      </div>
    </div>
  );
}
