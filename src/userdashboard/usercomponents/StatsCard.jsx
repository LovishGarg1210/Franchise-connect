import React from 'react';

const StatsCard = ({ title, value, icon: Icon, trend, color }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend > 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        <div className={`p-4 rounded-full ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;