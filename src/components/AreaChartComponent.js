import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  const data = [
    { month: "Jan", revenue: 4000, expense: 2400 },
    { month: "Feb", revenue: 3000, expense: 1398 },
    { month: "Mar", revenue: 2000, expense: 9800 },
    { month: "Apr", revenue: 2780, expense: 3908 },
    { month: "May", revenue: 1890, expense: 4800 },
    { month: "Jun", revenue: 2390, expense: 3800 },
    { month: "Jul", revenue: 3490, expense: 4300 },
  ];
  
  const AreaChartComponent = () => {
    return (
      <div className="w-full h-[400px] bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Revenue vs Expense
        </h2>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorRev)"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorExp)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default AreaChartComponent;