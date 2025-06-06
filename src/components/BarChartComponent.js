import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
  
  const data = [
    { name: 'Product A', stock: 400, sold: 240 },
    { name: 'Product B', stock: 300, sold: 139 },
    { name: 'Product C', stock: 200, sold: 980 },
    { name: 'Product D', stock: 278, sold: 390 },
    { name: 'Product E', stock: 189, sold: 480 },
  ];
  
  const BarChartComponent = () => {
    return (
      <div className="w-full h-[400px] bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Product Stock vs Sales</h2>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Legend />
            <Bar dataKey="stock" fill="#8884d8" />
            <Bar dataKey="sold" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default BarChartComponent;