import { ClientFlowData } from "@/types/dashboard";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


export default function ClientFlow(): React.ReactElement {
  const data: ClientFlowData[] = [
    {
      name: "jun 24",
      "New Clients": 50,
      "Outflow Clients": 150,
    },
    {
      name: "jul 24",
      "New Clients": 80,
      "Outflow Clients": 160,
    },
    {
      name: "aug 24",
      "New Clients": 50,
      "Outflow Clients": 130,
    },
    {
      name: "sep 24",
      "New Clients": 50,
      "Outflow Clients": 150,
    },
    {
      name: "oct 24",
      "New Clients": 50,
      "Outflow Clients": 150,
    },
    {
      name: "nov 24",
      "New Clients": 50,
      "Outflow Clients": 150,
    },
    {
      name: "dec 24",
      "New Clients": 50,
      "Outflow Clients": 150,
    },
  ];

  return (
    <div className="bg-linear-to-bl from-[#0C221B] to-[#5C7E6C] rounded-xl p-5">
      <h1 className="text-primary-beige text-2xl font-medium my-4 pb-2 border-b border-secondary-beige">
        Verkoopinformatie
      </h1>

      <div className="mt-10">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#f6ece2" />
            <YAxis stroke="#f6ece2" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Outflow Clients" fill="#6CB791" />
            <Bar dataKey="New Clients" fill="#BFB7B0" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
