import { useState } from 'react';
import { Plus, CheckCircle, Users, Clipboard, Trash2, UserPlus, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import MemberSearch from './MemberSearch';
import Sidebar from './Sidebar';
const ProjectDetails = ({ projects }) => {
  const [tasks, setTasks] = useState(projects.tasks || []);
  const [newTask, setNewTask] = useState('');
  const [selectedMembers, setSelectedMembers] = useState(projects.team || []);
  const [availableMembers, setAvailableMembers] = useState([
    { id: 1, name: 'Emma Dubois', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'Designer' },
    { id: 2, name: 'Lucas Martin', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'Développeur' },
    { id: 3, name: 'Sophie Leroux', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'Product Manager' },
    { id: 4, name: 'Alexandre Garnier', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'Marketing Specialist' },
    { id: 5, name: 'Chloé Bernard', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'UI/UX Designer' },
    { id: 6, name: 'Victor Morel', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'Data Analyst' },
    { id: 7, name: 'Camille Petit', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'Software Engineer' },
    { id: 8, name: 'Louis Roche', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'DevOps Engineer' },
    { id: 9, name: 'Élise Fontaine', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'Graphic Designer' },
    { id: 10, name: 'Arthur Dupont', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'Project Manager' },
    { id: 11, name: 'Zoé Lefevre', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'Content Writer' },
    { id: 12, name: 'Hugo Girard', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'Mobile Developer' },
    { id: 13, name: 'Alice Lambert', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'QA Engineer' },
    { id: 14, name: 'Nicolas Caron', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'Database Administrator' },
    { id: 15, name: 'Manon Rey', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'HR Manager' },
    { id: 16, name: 'Thomas Vidal', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'Cloud Architect' },
    { id: 17, name: 'Charlotte Perrin', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'Business Analyst' },
    { id: 18, name: 'Antoine Millet', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'Full Stack Developer' },
    { id: 19, name: 'Lucie Noel', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'SEO Specialist' },
    { id: 20, name: 'Mathieu Dufour', avatar: 'https://wbhfh.com/wp-content/uploads/2020/04/placeholder-50x50.png', role: 'System Administrator' },
  ]);
  // Préparer les données pour le graphique

  const getTaskCompletionData = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const incompleteTasks = tasks.length - completedTasks;

    return [
      { name: 'Terminées', value: completedTasks },
      { name: 'Non Terminées', value: incompleteTasks }
    ];
  };

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: Date.now(),
        title: newTask,
        completed: false,
        createdAt: new Date(),
        assignedTo: null
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  const addMember = (member) => {
    if (!selectedMembers.some(m => m.id === member.id)) {
      setSelectedMembers(prev => [...prev, member]);
      setAvailableMembers(prev => prev.filter(m => m.id !== member.id));
    }
  };
  const removeMember = (member) => {
    setSelectedMembers(prev => prev.filter(m => m.id !== member.id));
    setAvailableMembers(prev => [...prev, member]);
  };
  const assignTask = (taskId, memberId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, assignedTo: memberId } : task
    ));
  };
  return (
    <>

      <div className="flex h-screen bg-gray-100">
        {/* Sidebar Component */}
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-500 p-8">
                <div className="flex justify-between items-start">
                  <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-white tracking-tight">{projects.title}</h1>
                    <p className="text-blue-100 max-w-2xl">{projects.description}</p>

                    <div className="flex items-center space-x-6 text-white/90">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">Début: {new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">Durée: 3 mois</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-white">
                      <div className="text-3xl font-bold">
                        {Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100 || 0)}%
                      </div>
                      <div className="text-sm text-blue-100">Progression</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 p-6 bg-gray-50">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Tâches complétées</p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {tasks.filter(t => t.completed).length}/{tasks.length}
                      </h3>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Clipboard className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Membres actifs</p>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedMembers.length}</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Tâches en cours</p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {tasks.length - tasks.filter(t => t.completed).length}
                      </h3>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Progress Chart */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Répartition des tâches</h2>
              {tasks.length === 0 ? (
                <div className="h-[300px] w-full flex items-center justify-center text-gray-500">
                  Aucune tâche ajoutée
                </div>
              ) : (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getTaskCompletionData()}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#4F46E5"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        <Cell key="Terminées" fill="#4CAF50" />
                        <Cell key="Non Terminées" fill="#F87171" />
                      </Pie>
                      <Tooltip
                        formatter={(value, name) => [`${value} tâches`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>


            {/* Main Content */}
            <div className="grid grid-cols-3 gap-8 mt-8">
              {/* Tasks Section */}
              <div className="col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Tâches</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
                      onClick={addTask}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Nouvelle tâche</span>
                    </motion.button>
                  </div>
                  <div className="mb-6">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Que faut-il faire ?"
                        className="flex-1 rounded-lg border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && addTask()}
                      />
                    </div>
                  </div>
                  <AnimatePresence>
                    <div className="space-y-4">
                      {tasks.map((task) => (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTaskCompletion(task.id)}
                                className="w-5 h-5 text-blue-600 rounded-md focus:ring-blue-500"
                              />
                              <span className={`text-gray-900 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                                {task.title}
                              </span>
                            </div>

                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                {task.assignedTo && (
                                  <img
                                    src={
                                      selectedMembers.find(member => member.id === task.assignedTo)?.avatar 
                                    }
                                    alt="Assigned Member"
                                    className="w-8 h-8 rounded-full border"
                                  />
                                )}
                              </div>
                              <select
                                className="rounded-lg border-gray-200 text-sm focus:ring-2 focus:ring-blue-500"
                                value={task.assignedTo || ''}
                                onChange={(e) => assignTask(task.id, Number(e.target.value))}
                              >
                                <option value="">Assigner à</option>
                                {selectedMembers.map(member => (
                                  <option key={member.id} value={member.id}>
                                    {member.name}
                                  </option>
                                ))}
                              </select>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => deleteTask(task.id)}
                                className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>

                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </AnimatePresence>
                </div>
              </div>
              {/* Team Section */}
              <div className="col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Équipe</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <UserPlus className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <div className="space-y-4 mb-6">
                    {selectedMembers.map((member) => (
                      <motion.div
                        key={member.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{member.name}</h3>
                            <p className="text-xs text-gray-500">{member.role}</p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeMember(member)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Ajouter un membre</h3>
                    <MemberSearch availableMembers={availableMembers} addMember={addMember} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default ProjectDetails;