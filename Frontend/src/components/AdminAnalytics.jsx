import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const AdminAnalytics = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/analytics");
        setStats(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Loading charts...</p>;

  return (
    <div className="space-y-10">

      {/* Total Students */}
      <div className="text-3xl font-bold text-gray-800">
        Total Students:{" "}
        <span className="text-indigo-600">{stats.totalStudents}</span>
      </div>

      
     <div className="flex ">
       {/* Line Chart */}
      <div className="w-xl mx-20">
        <h3 className="font-bold mb-3 text-2xl">Applications Per Day</h3>
        <Line
          data={{
            labels: stats.applicationsPerDay.map(i => i._id),
            datasets: [
              {
                label: "Applications",
                borderColor: "#6366f1",
                data: stats.applicationsPerDay.map(i => i.total),
              },
            ],
          }}
          height={200}
          options={{
            responsive: true,
            scales: {
              x: {
                title: { display: true, text: "Date" },
              },
              y: {
                beginAtZero: true,
                title: { display: true, text: "Applications" },
              },
            },
          }}
        />
      </div>

      <br /><br />

      {/* Pie Chart */}
      <div className="w-lg mx-50">
        <h3 className="font-bold mb-3 text-2xl">College Distribution</h3>
        <Pie
          data={{
            labels: stats.collegeDistribution.map(i => i._id),
            datasets: [
              {
                backgroundColor: ["#6366f1", "#f43f5e", "#10b981", "#f59e0b"],
                data: stats.collegeDistribution.map(i => i.total),
              },
            ],
          }}
          height={180}
          options={{
            plugins: {
              legend: { position: "bottom" },
            },
          }}
        />
      </div>
     </div>
   <br></br>
      {/* Line Chart */}
      <div className="max-w-4xl mx-auto">
        <h3 className="font-bold mb-3 text-2xl">Applications Per Internship</h3>
        <Bar
          data={{
            labels: stats.applicationsByInternship.map(i => i._id),
            datasets: [
              {
                label: "Applications",
                backgroundColor: "#6366f1",
                data: stats.applicationsByInternship.map(i => i.total),
              },
            ],
          }}
          height={200}
          options={{
            responsive: true,
            scales: {
              x: {
                title: { display: true, text: "Internship Domain" },
              },
              y: {
                beginAtZero: true,
                title: { display: true, text: "Total Applications" },
                ticks: { stepSize: 1 },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdminAnalytics;









