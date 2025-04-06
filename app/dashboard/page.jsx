'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from './components/loading';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const hospitalDepartments = [
    { name: 'General Medicine', value: 40 },
    { name: 'Surgery', value: 25 },
    { name: 'Emergency', value: 20 },
    { name: 'Pediatrics', value: 15 },
  ];

  const monthlyStats = [
    { name: 'Sunday', Consultations: 35, Surgeries: 20, Emergency: 15 },
    { name: 'Monday', Consultations: 45, Surgeries: 35, Emergency: 25 },
    { name: 'Tuesday', Consultations: 30, Surgeries: 25, Emergency: 20 },
    { name: 'Wednesday', Consultations: 40, Surgeries: 30, Emergency: 35 },
    { name: 'Thursday', Consultations: 35, Surgeries: 25, Emergency: 20 },
    { name: 'Friday', Consultations: 42, Surgeries: 28, Emergency: 22 },
    { name: 'Saturday', Consultations: 38, Surgeries: 30, Emergency: 25 },
  ];

  const relationshipsData = [
    { name: 'Sep', relationships: 30, risk: 45, coverage: 25 },
    { name: 'Oct', relationships: 45, risk: 35, coverage: 40 },
    { name: 'Nov', relationships: 35, risk: 42, coverage: 35 },
  ];

  const riskByBusinessUnit = [
    { name: 'Customer Service', value: 30 },
    { name: 'Engineering', value: 25 },
    { name: 'Product', value: 20 },
    { name: 'Marketing', value: 25 },
  ];

  const metrics = [
    {
      title: 'Total Patients',
      value: '852',
      change: '+14%',
      data: relationshipsData.map(d => ({ value: d.relationships })),
      color: '#38BDF8'  // Light blue to match bar chart
    },
    {
      title: 'Visit Rate',
      value: '42%',
      change: '-10%',
      data: relationshipsData.map(d => ({ value: d.risk })),
      color: '#0369A1'  // Dark blue to match bar chart
    },
    {
      title: 'Occupancy Rate',
      value: '94%',
      change: '+27%',
      data: relationshipsData.map(d => ({ value: d.coverage })),
      color: '#E0F2FE'  // Very light blue to match bar chart
    }
  ];

  const departmentStats = [
    { name: 'Emergency', value: 30 },
    { name: 'Outpatient Clinics', value: 25 },
    { name: 'Surgery', value: 20 },
    { name: 'Internal Medicine', value: 25 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3 mb-2">
              <span className="text-blue-600 text-3xl">🏥</span>
              لوحة التحكم
            </h1>
            <p className="text-gray-500">نظرة عامة على أداء المستشفى</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Add any header actions here */}
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-gray-500 text-sm">{metric.title}</h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <span className={`text-sm font-medium ${
                      metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-16 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metric.data}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={metric.color}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">WEEKLY VISITS</h2>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Last Week</span>
                <span>1,132 Visits</span>
                <span>7,544 Total</span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={monthlyStats} 
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barGap={8}
                >
                  <Bar 
                    dataKey="Consultations" 
                    fill="#38BDF8" 
                    radius={[4, 4, 0, 0]} 
                    maxBarSize={35}
                  />
                  <Bar 
                    dataKey="Surgeries" 
                    fill="#0369A1" 
                    radius={[4, 4, 0, 0]} 
                    maxBarSize={35}
                  />
                  <Bar 
                    dataKey="Emergency" 
                    fill="#E0F2FE" 
                    radius={[4, 4, 0, 0]} 
                    maxBarSize={35}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#38BDF8]"></div>
                <span>Consultations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0369A1]"></div>
                <span>Surgeries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E0F2FE]"></div>
                <span>Emergency</span>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">DEPARTMENTS</h2>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={hospitalDepartments}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    innerRadius={90}
                  >
                    {hospitalDepartments.map((entry, index) => (
                      <Cell 
                        key={index} 
                        fill={[
                          '#38BDF8',
                          '#0369A1',
                          '#E0F2FE',
                          '#BAE6FD'
                        ][index]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-6 mt-4 text-sm justify-center">
              {hospitalDepartments.map((dept, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{
                    backgroundColor: [
                      '#38BDF8',
                      '#0369A1',
                      '#E0F2FE',
                      '#BAE6FD'
                    ][index]
                  }}></div>
                  <span>{dept.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  