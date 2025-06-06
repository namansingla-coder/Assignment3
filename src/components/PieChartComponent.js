import {
    PieChart, Pie, Tooltip, Cell, ResponsiveContainer
  } from 'recharts';
  
  const data = [
    { name: 'Google Ads', value: 400 },
    { name: 'Facebook', value: 300 },
    { name: 'Instagram', value: 300 },
    { name: 'Twitter', value: 200 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const PieChartComponent = () => {
    return (
      <div className="w-full h-[400px] bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Traffic Sources</h2>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default PieChartComponent;