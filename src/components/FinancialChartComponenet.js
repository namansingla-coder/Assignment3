// make a component for financial chart 

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  const data = [
    { date: "Mon", price: 120 },
    { date: "Tue", price: 132 },
    { date: "Wed", price: 101 },
    { date: "Thu", price: 134 },
    { date: "Fri", price: 90 },
    { date: "Sat", price: 230 },
    { date: "Sun", price: 210 },
  ];
  
  const FinancialChart = () => {
    return (
      <div className="w-full h-[400px] bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Financial Overview
        </h2>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default FinancialChart;