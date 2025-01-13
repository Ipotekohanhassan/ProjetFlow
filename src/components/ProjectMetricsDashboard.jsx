import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart, 
  Bar 
} from 'recharts';
import { 
  Activity, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';

const ProjectMetricsDashboard = () => {
  // Sample project data
  const progressData = [
    { name: 'Jan', progress: 40, budget: 50000, risks: 3 },
    { name: 'Feb', progress: 60, budget: 45000, risks: 2 },
    { name: 'Mar', progress: 75, budget: 52000, risks: 1 },
    { name: 'Apr', progress: 85, budget: 48000, risks: 2 },
    { name: 'Mai', progress: 90, budget: 55000, risks: 1 },
    { name: 'Jun', progress: 95, budget: 53000, risks: 0 }
  ];

  const [activeChart, setActiveChart] = useState('progress');

  // Metric cards data
  const metricCards = [
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Progression du Projet",
      value: "92%",
      change: "+12% depuis le début",
      color: "bg-blue-50"
    },
    {
      icon: <Clock className="w-8 h-8 text-yellow-600" />,
      title: "Temps Restant",
      value: "45 jours",
      change: "-5 jours par rapport au planning",
      color: "bg-yellow-50"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      title: "Tâches Complétées",
      value: "76/100",
      change: "+8 cette semaine",
      color: "bg-green-50"
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-red-600" />,
      title: "Risques du Projet",
      value: "2 actifs",
      change: "-1 depuis le dernier mois",
      color: "bg-red-50"
    }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'progress':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ 
                  background: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid #e0e0e0' 
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="progress" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="budget" 
                stroke="#10b981" 
                strokeWidth={3} 
                dot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'risks':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ 
                  background: 'white', 
                  borderRadius: '12px', 
                  border: '1px solid #e0e0e0' 
                }}
              />
              <Bar dataKey="risks" fill="#ef4444" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {metricCards.map((card, index) => (
            <div 
              key={index} 
              className={`
                ${card.color} 
                rounded-2xl p-6 shadow-md 
                transform transition-all 
                hover:scale-105 hover:shadow-xl
              `}
            >
              <div className="flex items-center justify-between mb-4">
                {card.icon}
                <span className="text-xl font-bold text-gray-700">{card.value}</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                <p className="text-xs text-gray-500">{card.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Activity className="w-8 h-8 text-blue-600" />
              Tableau de Bord du Projet
            </h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveChart('progress')}
                className={`
                  px-4 py-2 rounded-full transition-colors
                  ${activeChart === 'progress' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}
                `}
              >
                Progression
              </button>
              <button 
                onClick={() => setActiveChart('risks')}
                className={`
                  px-4 py-2 rounded-full transition-colors
                  ${activeChart === 'risks' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-red-100'}
                `}
              >
                Risques
              </button>
            </div>
          </div>
          {renderChart()}
        </div>
      </div>
    </div>
  );
};

export default ProjectMetricsDashboard;