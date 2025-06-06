import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
  
  const data = [
    { name: 'Jan', sales: 4000, users: 2400 },
    { name: 'Feb', sales: 3000, users: 1398 },
    { name: 'Mar', sales: 2000, users: 9800 },
    { name: 'Apr', sales: 2780, users: 3908 },
    { name: 'May', sales: 1890, users: 4800 },
    { name: 'Jun', sales: 2390, users: 3800 },
    { name: 'Jul', sales: 3490, users: 4300 },
  ];
  
  const Charts = () => {
    return (
      <div className="w-full h-[400px] bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Monthly Sales & Users</h2>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="users" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default Charts;