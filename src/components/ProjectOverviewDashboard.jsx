
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, Users, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import Sidebar from './Sidebar';

const ProjectOverviewDashboard = () => {
  const [selectedPriority, setSelectedPriority] = useState('all');

  const projects = [
    {
      id: 1,
      name: "Projet Digital Transformation",
      progress: 85,
      status: "En cours",
      team: 12,
      priority: "Haute",
      budget: { allocated: 500000, spent: 425000 },
      timeline: [
        { month: 'Jan', progress: 20 },
        { month: 'Feb', progress: 40 },
        { month: 'Mar', progress: 60 },
        { month: 'Apr', progress: 75 },
        { month: 'Mai', progress: 85 }
      ]
    },
    {
      id: 2,
      name: "Projet Innovation Produit",
      progress: 65,
      status: "En attente",
      team: 8,
      priority: "Moyenne",
      budget: { allocated: 350000, spent: 225000 },
      timeline: [
        { month: 'Jan', progress: 10 },
        { month: 'Feb', progress: 25 },
        { month: 'Mar', progress: 40 },
        { month: 'Apr', progress: 55 },
        { month: 'Mai', progress: 65 }
      ]
    },
    {
      id: 3,
      name: "Projet Expansion Marché",
      progress: 100,
      status: "Complété",
      team: 15,
      priority: "Critique",
      budget: { allocated: 750000, spent: 710000 },
      timeline: [
        { month: 'Jan', progress: 40 },
        { month: 'Feb', progress: 60 },
        { month: 'Mar', progress: 75 },
        { month: 'Apr', progress: 85 },
        { month: 'Mai', progress: 95 }
      ]
    },
    {
      id: 4,
      name: "Projet Refonte Site Web",
      progress: 45,
      status: "En cours",
      team: 5,
      priority: "Moyenne",
      budget: { allocated: 200000, spent: 90000 },
      timeline: [
        { month: 'Jan', progress: 5 },
        { month: 'Feb', progress: 15 },
        { month: 'Mar', progress: 30 },
        { month: 'Apr', progress: 40 },
        { month: 'Mai', progress: 45 }
      ]
    },
    {
      id: 5,
      name: "Projet Développement Mobile",
      progress: 55,
      status: "En cours",
      team: 10,
      priority: "Haute",
      budget: { allocated: 450000, spent: 250000 },
      timeline: [
        { month: 'Jan', progress: 10 },
        { month: 'Feb', progress: 20 },
        { month: 'Mar', progress: 35 },
        { month: 'Apr', progress: 45 },
        { month: 'Mai', progress: 55 }
      ]
    },
    {
      id: 6,
      name: "Projet Sécurité Informatique",
      progress: 80,
      status: "En cours",
      team: 6,
      priority: "Critique",
      budget: { allocated: 300000, spent: 250000 },
      timeline: [
        { month: 'Jan', progress: 10 },
        { month: 'Feb', progress: 30 },
        { month: 'Mar', progress: 55 },
        { month: 'Apr', progress: 70 },
        { month: 'Mai', progress: 80 }
      ]
    }
  ];

  const filteredProjects = selectedPriority === 'all'
    ? projects
    : projects.filter(p => p.priority.toLowerCase() === selectedPriority.toLowerCase());



  const getStatusConfig = (status) => {
    switch (status) {
      case "En cours":
        return {
          Icon: Clock,
          bgColor: "bg-blue-500",
          lightBg: "bg-blue-50",
          textColor: "text-blue-700"
        };
      case "En attente":
        return {
          Icon: AlertCircle,
          bgColor: "bg-amber-500",
          lightBg: "bg-amber-50",
          textColor: "text-amber-700"
        };
      case "Complété":
        return {
          Icon: CheckCircle,
          bgColor: "bg-emerald-500",
          lightBg: "bg-emerald-50",
          textColor: "text-emerald-700"
        };
      default:
        return {
          Icon: Clock,
          bgColor: "bg-gray-500",
          lightBg: "bg-gray-50",
          textColor: "text-gray-700"
        };
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "Haute":
        return "text-red-700 bg-red-50 border-red-100";
      case "Moyenne":
        return "text-amber-700 bg-amber-50 border-amber-100";
      case "Basse":
        return "text-emerald-700 bg-emerald-50 border-emerald-100";
      default:
        return "text-gray-700 bg-gray-50 border-gray-100";
    }
  };


  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar Component */}
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="p-6 mt-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <select
                  className="px-4 py-2 border rounded-lg bg-white"
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                >
                  <option value="all">Tous les projets</option>
                  <option value="haute">Haute priorité</option>
                  <option value="moyenne">Moyenne priorité</option>
                  <option value="critique">Critique</option>
                </select>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500">Projets actifs</h3>
                    <ArrowUp className="w-5 h-5 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold mt-2">{filteredProjects.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500">Membres d&apos;équipe</h3>
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {filteredProjects.reduce((acc, curr) => acc + curr.team, 0)}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500">Projets critiques</h3>
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <p className="text-2xl font-bold mt-2">
                    {filteredProjects.filter(p => p.priority === 'Critique').length}
                  </p>
                </div>
              </div>

              {/* Progress Chart */}
              <div className="bg-white p-2 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Progression des projets</h2>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projects}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timeline.month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="progress" stroke="#3B82F6" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Projects List */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-2">
                {filteredProjects.map((project) => {
                  const statusConfig = getStatusConfig(project.status);
                  const IconComponent = statusConfig.Icon;

                  return (
                    <div
                      key={project.id}
                      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="h-1 w-full bg-gray-100">
                        <div
                          className={`h-full ${statusConfig.bgColor} transition-all duration-500`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {project.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center mb-6">
                          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${statusConfig.lightBg} ${statusConfig.textColor}`}>
                            <IconComponent className="w-4 h-4" />
                            <span className="text-sm font-medium">{project.status}</span>
                          </div>
                          <span className={`px-3 py-1.5 text-sm font-medium rounded-full border ${getPriorityStyles(project.priority)}`}>
                            {project.priority}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{project.team} membres</span>
                          </div>
                          <span className={`text-sm font-medium ${statusConfig.textColor}`}>
                            {project.progress}% complété
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProjectOverviewDashboard;