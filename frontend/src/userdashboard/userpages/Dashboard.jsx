import React from 'react';
import { DollarSign, TrendingUp, Users, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import StatsCard from "../usercomponents/StatsCard.jsx";

const Dashboard = () => {
  const stats = {
    dailySales: 2850,
    monthlyRevenue: 45600,
    totalExpenses: 12400,
    activeEmployees: 8
  };
  
  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 },
  ];

  const franchiseDistribution = [
    { name: 'Raw material', value: 10, color: '#4CAF50' },
    { name: 'Employee', value: 20, color: '#FFC107' },
    { name: 'Pack', value: 5, color: '#2196F3' },
  ];

  return (
    <div className="p-4 md:p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Daily Sales"
          value={`$${stats.dailySales.toLocaleString()}`}
          icon={DollarSign}
          trend={12}
          color="bg-blue-500"
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          icon={TrendingUp}
          trend={8}
          color="bg-green-500"
        />
        <StatsCard
          title="Total Expenses"
          value={`$${stats.totalExpenses.toLocaleString()}`}
          icon={FileText}
          trend={-5}
          color="bg-red-500"
        />
        <StatsCard
          title="Active Employees"
          value={stats.activeEmployees}
          icon={Users}
          color="bg-purple-500"
        />
      </div>

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Line Chart */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
            <LineChart
              width={500}
              height={300}
              data={revenueData}
              className="max-w-full"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#2196F3" />
            </LineChart>
          </div>
        </div>

        {/* Expenses Overview Pie Chart */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <h3 className="text-lg font-semibold mb-4">Expenses Overview</h3>
          <div className="bg-white p-4 rounded-lg shadow-md flex justify-center">
            <PieChart width={400} height={300} className="  md:max-w-full">
              <Pie
                data={franchiseDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {franchiseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend  />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
