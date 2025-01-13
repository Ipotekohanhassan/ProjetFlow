import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeamMembers from './pages/TeamMembers';
import ProjectOverviewDashboard from './components/ProjectOverviewDashboard';
import ProjectList from './components/ProjectList';
import ProjectDetails from './components/ProjectDetails';
import AuthPages from './components/AuthPages';
import ProfilePage from './pages/ProfilePage';
import FriendRequests from './pages/FriendRequests';

const AppRoutes = () => {
  const projects = [
    { 
      title: "Planning for Next Quarter", 
      tasks: ["Review Last Quarter's Expenses", "Create a Savings and Investment Plan"], 
      progress: 100, 
      icon: "fas fa-dollar-sign", 
      tasksCompleted: 2, 
      totalTasks: 2,
      team: [
        { name: "John Doe", avatar: "https://placehold.co/50x50/png" },
        { name: "Jane Smith", avatar: "/https://placehold.co/50x50/png" },
        { name: "Alice Johnson", avatar: "https://placehold.co/50x50/png" },
        { name: "Bob Brown", avatar: "https://placehold.co/50x50/png" },
        { name: "Charlie White", avatar: "https://placehold.co/50x50/png" },
        { name: "Charlie White", avatar: "https://placehold.co/50x50/png" },
        { name: "Charlie White", avatar: "https://placehold.co/50x50/png" },
        
      ]
    },
    { 
      title: "Learning a New Language", 
      tasks: ["Download a Language Learning App", "Practice Vocabulary Daily"], 
      progress: 0, 
      icon: "fas fa-book", 
      tasksCompleted: 1, 
      totalTasks: 1 
    },
    { 
      title: "Travel Itinerary for Europe", 
      tasks: ["Book Flights and Accommodations"], 
      progress: 100, 
      icon: "fas fa-plane", 
      tasksCompleted: 2, 
      totalTasks: 3 
    },
    { 
      title: "Home Renovation Project", 
      tasks: ["Research Paint Colors for Living Room", "Purchase New Furniture", "Install New Lighting Fixtures"], 
      progress: 0, 
      icon: "fas fa-home", 
      tasksCompleted: 0, 
      totalTasks: 4 
    },
    { 
      title: "Personal Fitness Goals", 
      tasks: ["Create Weekly Workout Plan", "Track Daily Calorie Intake", "Attend Yoga Class"], 
      progress: 0, 
      icon: "fas fa-dumbbell", 
      tasksCompleted: 1, 
      totalTasks: 5 
    },
    { 
      title: "Marketing Campaign", 
      tasks: ["Create Campaign Strategy", "Schedule Social Media Posts"], 
      progress: 0, 
      icon: "fas fa-bullhorn", 
      tasksCompleted: 0, 
      totalTasks: 0 
    }
  ];
  return (
    <Router>
          {/* Routes */}
          <Routes>
            <Route path="/" element={<AuthPages />} />
            <Route path="/dashboard" element={<ProjectOverviewDashboard />} />
            <Route path="/tasks" element={<ProjectList projects={projects}/>} />
            <Route path="/team-members" element={<TeamMembers />} />
            <Route path="/project-details" element={<ProjectDetails projects={projects}/>} />
            <Route path="/profil" element={<ProfilePage/>} />
            <Route path="/friend-request" element={<FriendRequests/>} />
          </Routes>
    </Router>
  );
};

export default AppRoutes;
