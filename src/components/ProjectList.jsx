import { useState } from 'react';
import { Filter, CheckCircle2, Clock, Grid, Folder } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';

const ProjectList = ({ projects }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'completed' && project.progress === 100) ||
      (filter === 'in-progress' && project.progress > 0 && project.progress < 100);
    
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const FilterButton = ({ children, value, icon: Icon }) => (
    <motion.button 
      onClick={() => setFilter(value)}
      className={`
        flex items-center space-x-2 px-4 py-2 rounded-full text-sm transition-all duration-300 
        ${filter === value 
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {Icon && <Icon size={16} />}
      <span>{children}</span>
    </motion.button>
  );

  return (
    <>
    <div className="flex h-screen bg-gray-100">
        {/* Sidebar Component */}
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="mb-6 mt-7 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x">
              <FilterButton value="all" icon={Grid}>Tous</FilterButton>
              <FilterButton value="in-progress" icon={Clock}>En cours</FilterButton>
              <FilterButton value="completed" icon={CheckCircle2}>Terminé</FilterButton>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="
                    pl-10 pr-4 py-2 border border-gray-200 rounded-full 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    transition-all duration-300 text-sm
                  "
                />
                <Filter 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  size={18} 
                />
              </div>
              <div className="flex items-center space-x-2">
                <Folder className="text-gray-500" />
                <span className="text-sm text-gray-600 font-medium">
                  {filteredProjects.length} 
                </span>
              </div>
            </div>
          </div>

          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="col-span-full text-center py-12 text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-lg">No projects found</p>
                  <p className="text-sm">Try adjusting your filter or search</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>  
    </div>  
    </>
  );
};

export default ProjectList;