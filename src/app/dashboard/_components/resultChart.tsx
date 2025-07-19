import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ChartDataItem, DataItem } from "@/types/dashboard";

const data: DataItem[] = [
  { name: "jan", price: "600000", type: "Week" },
  { name: "jan", price: "100000", type: "Maand" },
  { name: "jan", price: "200000", type: "Jaar" },

  { name: "feb", price: "110000", type: "Week" },
  { name: "feb", price: "120000", type: "Maand" },
  { name: "feb", price: "90000", type: "Jaar" },

  { name: "mar", price: "95000", type: "Week" },
  { name: "mar", price: "130000", type: "Maand" },
  { name: "mar", price: "120000", type: "Jaar" },

  { name: "apr", price: "90000", type: "Week" },
  { name: "apr", price: "160000", type: "Maand" },
  { name: "apr", price: "110000", type: "Jaar" },

  { name: "may", price: "80000", type: "Week" },
  { name: "may", price: "120000", type: "Maand" },
  { name: "may", price: "100000", type: "Jaar" },

  { name: "jun", price: "85000", type: "Week" },
  { name: "jun", price: "130000", type: "Maand" },
  { name: "jun", price: "150000", type: "Jaar" },

  { name: "jul", price: "100000", type: "Week" },
  { name: "jul", price: "140000", type: "Maand" },
  { name: "jul", price: "180000", type: "Jaar" },

  { name: "aug", price: "130000", type: "Week" },
  { name: "aug", price: "170000", type: "Maand" },
  { name: "aug", price: "140000", type: "Jaar" },

  { name: "sep", price: "90000", type: "Week" },
  { name: "sep", price: "160000", type: "Maand" },
  { name: "sep", price: "200000", type: "Jaar" },

  { name: "oct", price: "95000", type: "Week" },
  { name: "oct", price: "220000", type: "Maand" },
  { name: "oct", price: "130000", type: "Jaar" },

  { name: "nov", price: "110000", type: "Week" },
  { name: "nov", price: "150000", type: "Maand" },
  { name: "nov", price: "180000", type: "Jaar" },

  { name: "dec", price: "120000", type: "Week" },
  { name: "dec", price: "140000", type: "Maand" },
  { name: "dec", price: "110000", type: "Jaar" },
];

const FILTERS = ["Week", "Maand", "Jaar"] as const;
type FilterType = (typeof FILTERS)[number];

export default function ResultChart(): React.ReactElement {
  const [selectedType, setSelectedType] = useState<FilterType>("Jaar");

  // Filter data based on selected type
  const filteredData: ChartDataItem[] = data
    .filter((item) => item.type === selectedType)
    .map((item) => ({
      ...item,
      price: Number(item.price),
    }));

  return (
    <div className="bg-linear-to-bl from-darkgreen to-gr-light rounded-xl p-5 sm:py-8 sm:px-4 h-full">
      <h1 className="text-primary-beige text-2xl font-medium mb-4">
        Resultaten
      </h1>

      {/* Filter */}
      <div className="flex items-center justify-end border-b border-secondary-beige">
        {FILTERS.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`cursor-pointer text-base px-4 py-1 rounded-tl-2xl rounded-tr-2xl text-white font-medium transition-colors ${
              selectedType === type ? "bg-green3" : ""
            }`}
            type="button"
          >
            {type}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-6 h-[250px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={filteredData}
            margin={{
              top: 0,
              right: 0,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#f6ece2" />
            <YAxis
              stroke="#f6ece2"
              tickFormatter={(value: number) => `${value / 1000}k`}
            />
            <Tooltip
              formatter={(value: number) => [
                "€ " +
                  value.toLocaleString("de-DE", {
                    minimumFractionDigits: 2,
                  }),
              ]}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#305140"
              fill="#6CB791"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Content */}
      <h1 className="text-primary-beige text-2xl font-medium my-4 pb-2 border-b border-secondary-beige">
        Verkoopinformatie
      </h1>

      <Table className="mt-2 text-primary-beige text-base font-medium">
        <TableBody>
          <TableRow>
            <TableCell>Vorige week</TableCell>
            <TableCell>(19-05 t/m 25-05-2025)</TableCell>
            <TableCell>€ 154.677,23</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Huidige week</TableCell>
            <TableCell>(19-05 t/m 25-05-2025)</TableCell>
            <TableCell>€ 154.677,23</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Volgende week</TableCell>
            <TableCell>(19-05 t/m 25-05-2025)</TableCell>
            <TableCell>€ 154.677,23</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Vorige maand</TableCell>
            <TableCell>(19-05 t/m 25-05-2025)</TableCell>
            <TableCell>€ 154.677,23</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Last update data */}
      <p className="flex flex-wrap gap-10 text-primary-beige text-base font-medium mt-6 pt-3 border-t border-secondary-beige">
        <span>Laatste update</span>
        <span>29 mei 2025 om 11:03 a.m.</span>
      </p>
    </div>
  );
}
