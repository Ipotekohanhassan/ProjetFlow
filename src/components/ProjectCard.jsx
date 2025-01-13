
import { 
  MoreVertical,
  List, 
} from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  
  // Calculs dynamiques
  const totalTasks = project.tasks?.length || 0;
  const completedTasks = project.tasks?.filter(task => task.completed).length || 0;
  const taskCompletionPercentage = totalTasks > 0 
    ? Math.round((completedTasks / totalTasks) * 100) 
    : 0;

  // Détermination du thème de couleur
  const getColorTheme = () => {
    if (taskCompletionPercentage < 25) return 'from-gray-400 to-gray-600';
    if (taskCompletionPercentage < 50) return 'from-yellow-400 to-yellow-600';
    if (taskCompletionPercentage < 75) return 'from-blue-400 to-blue-600';
    return 'from-green-400 to-green-600';
  };

  return (
    <motion.div 
      className="relative bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.03]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Fond dégradé dynamique */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${getColorTheme()} opacity-10`}
      />

      {/* En-tête avec titre et options */}
      <div className="relative z-10 p-6 pb-0 flex justify-between items-start">
        <div>
          <motion.h2 
            className="text-2xl font-black text-gray-900 mb-2 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {project.title}
          </motion.h2>

        </div>
        
        <motion.button 
          className="text-gray-400 hover:text-gray-600 transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <MoreVertical />
        </motion.button>
      </div>

      {/* Section des statistiques */}
      <div className="relative z-10 p-6 pt-4 space-y-4">
        {/* Progression des tâches */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-md">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <List size={20} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Progression des tâches
              </span>
            </div>
            <div className="text-sm font-bold text-gray-800">
              {taskCompletionPercentage}%
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div 
              className={`h-2 bg-gradient-to-r ${getColorTheme()}`}
              initial={{ width: 0 }}
              animate={{ width: `${taskCompletionPercentage}%` }}
              transition={{ duration: 0.8, type: "spring" }}
            />
          </div>
          
          <div className="mt-2 text-xs text-gray-500">
            {completedTasks} / {totalTasks} tâches terminées
          </div>
        </div>
      </div>

      {/* Section des membres */}
      <div className="relative z-10 border-t border-gray-100 p-6 flex justify-between items-center">
        {/* Administrateur */}
        <div className="flex items-center space-x-3">
          <motion.div 
            className="w-14 h-14 rounded-full border-4 border-opacity-50 shadow-lg overflow-hidden"
            style={{ 
              borderColor: `${getColorTheme().split(' ')[1]}`,
            }}
            whileHover={{ scale: 1.1 }}
          >
            <img 
              src={project.admin?.avatar || `/api/placeholder/56/56`} 
              alt="Administrateur" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <div>
            <span className="text-sm font-bold text-gray-800">
              {project.admin?.name || 'Administrateur'}
            </span>
            <p className="text-xs text-gray-500">Chef de projet</p>
          </div>
        </div>

        {/* Équipe */}
        <div className="flex -space-x-3">
          {project.team?.slice(0, 2).map((member, index) => (
            <motion.div 
              key={index} 
              className="w-11 h-11 rounded-full border-2 border-white shadow-md overflow-hidden"
              whileHover={{ scale: 1.2, zIndex: 10 }}
            >
              <img 
                src={member.avatar || `/api/placeholder/44/44`} 
                alt={member.name} 
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
          
          {(project.team?.length || 0) > 2 && (
            <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 border-2 border-white shadow-md">
              +{(project.team?.length || 0) - 2}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;