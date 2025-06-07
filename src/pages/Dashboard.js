import BarChartComponent from "../components/BarChartComponent";
import PieChartComponent from "../components/PieChartComponent";
import LineChartComponent from "../components/LineChartComponent";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-10 dark:bg-gray-800">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Dashboard Overview
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Users", value: "12,340", color: "bg-blue-500" },
          { title: "Revenue", value: "$45,320", color: "bg-green-500" },
          { title: "Sales", value: "3,230", color: "bg-purple-500" },
          { title: "Performance", value: "89%", color: "bg-yellow-500" },
        ].map(({ title, value, color }, index) => (
          <div
            key={index}
            className={`p-5 ${color} text-white rounded-xl shadow-md`}
          >
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-2xl font-bold mt-2">{value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <LineChartComponent />
        </div>
        <div>
          <PieChartComponent />
        </div>
        <div className="col-span-1 lg:col-span-3">
          <BarChartComponent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;