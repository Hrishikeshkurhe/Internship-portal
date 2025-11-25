import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const AdminAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/analytics");
        setStats(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-full mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80 bg-gray-200 rounded-xl"></div>
              <div className="h-80 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return <p className="text-center text-gray-500 mt-10">Failed to load analytics data</p>;

  // Chart color schemes
  const chartColors = {
    primary: "#6366f1",
    secondary: "#8b5cf6",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#06b6d4"
  };

  const pieColors = [
    chartColors.primary,
    chartColors.secondary,
    chartColors.success,
    chartColors.warning,
    chartColors.danger,
    chartColors.info,
    "#84cc16",
    "#ec4899"
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 mr-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold  text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor student applications and internship performance</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalStudents}</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm text-green-600 font-medium">+12%</span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.applicationsPerDay.reduce((sum, day) => sum + day.total, 0)}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm text-green-600 font-medium">+8%</span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Internships</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.applicationsByInternship.length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm text-green-600 font-medium">+3</span>
              <span className="text-sm text-gray-500 ml-2">new this month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Colleges</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.collegeDistribution.length}
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm text-green-600 font-medium">+5%</span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Applications Over Time */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Applications Over Time</h3>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-500">Last 30 days</span>
              </div>
            </div>
            <div className="h-80">
              <Line
                data={{
                  labels: stats.applicationsPerDay.map(i => {
                    const date = new Date(i._id);
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  }),
                  datasets: [
                    {
                      label: "Applications",
                      borderColor: chartColors.primary,
                      backgroundColor: "rgba(99, 102, 241, 0.1)",
                      data: stats.applicationsPerDay.map(i => i.total),
                      fill: true,
                      tension: 0.4,
                      borderWidth: 3,
                      pointBackgroundColor: chartColors.primary,
                      pointBorderColor: "#ffffff",
                      pointBorderWidth: 2,
                      pointRadius: 4,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false
                      },
                      title: {
                        display: true,
                        text: "Date",
                        color: '#6b7280',
                        font: {
                          size: 12
                        }
                      },
                    },
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: "rgba(0, 0, 0, 0.05)"
                      },
                      title: {
                        display: true,
                        text: "Number of Applications",
                        color: '#6b7280',
                        font: {
                          size: 12
                        }
                      },
                      ticks: {
                        stepSize: 1
                      }
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* College Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">College Distribution</h3>
              <div className="text-sm text-gray-500">
                {stats.collegeDistribution.length} colleges
              </div>
            </div>
            <div className="h-80">
              <Pie
                data={{
                  labels: stats.collegeDistribution.map(i => i._id),
                  datasets: [
                    {
                      backgroundColor: pieColors,
                      data: stats.collegeDistribution.map(i => i.total),
                      borderWidth: 2,
                      borderColor: '#ffffff'
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                          size: 11
                        }
                      }
                    }
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Applications by Internship */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Applications by Internship Domain</h3>
            <div className="text-sm text-gray-500">
              Total: {stats.applicationsByInternship.reduce((sum, internship) => sum + internship.total, 0)} applications
            </div>
          </div>
          <div className="h-80">
            <Bar
              data={{
                labels: stats.applicationsByInternship.map(i => i._id),
                datasets: [
                  {
                    label: "Applications",
                    backgroundColor: chartColors.primary,
                    data: stats.applicationsByInternship.map(i => i.total),
                    borderRadius: 4,
                    borderSkipped: false,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  x: {
                    grid: {
                      display: false
                    },
                    title: {
                      display: true,
                      text: "Internship Domain",
                      color: '#6b7280',
                      font: {
                        size: 12
                      }
                    },
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: "rgba(0, 0, 0, 0.05)"
                    },
                    title: {
                      display: true,
                      text: "Number of Applications",
                      color: '#6b7280',
                      font: {
                        size: 12
                      }
                    },
                    ticks: {
                      stepSize: 1
                    }
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;