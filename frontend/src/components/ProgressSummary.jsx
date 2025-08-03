// File: src/components/ProgressSummary.jsx

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressSummary = ({ completedCount, totalCount }) => {
  const remainingCount = totalCount - completedCount;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const chartData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        data: [completedCount, remainingCount > 0 ? remainingCount : 0],
        backgroundColor: ['#22c55e', '#e5e7eb'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-center mb-4">Overall Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="relative h-48 w-48 mx-auto">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
        <div className="md:col-span-2 grid grid-cols-2 gap-4 text-center">
          <div className="bg-stone-100 p-4 rounded-lg">
            <p className="text-3xl font-bold text-sky-600">{completedCount}</p>
            <p className="text-sm text-stone-500">Days Completed</p>
          </div>
          <div className="bg-stone-100 p-4 rounded-lg">
            <p className="text-3xl font-bold text-stone-600">{remainingCount}</p>
            <p className="text-sm text-stone-500">Days Remaining</p>
          </div>
          <div className="bg-stone-100 p-4 rounded-lg col-span-2">
            <p className="text-3xl font-bold text-stone-600">{percentage}%</p>
            <p className="text-sm text-stone-500">Completion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary;