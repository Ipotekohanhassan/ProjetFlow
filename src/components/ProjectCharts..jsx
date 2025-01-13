import { Bar, Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const ProjectCharts = ({ projects }) => {
  // Données pour le diagramme à barres (Progression des projets)
  const barChartData = {
    labels: projects.map((project) => project.title),
    datasets: [
      {
        label: "Tâches accomplies",
        data: projects.map((project) => project.tasksCompleted),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Tâches restantes",
        data: projects.map((project) => project.totalTasks - project.tasksCompleted),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  // Données pour le diagramme circulaire (Répartition des tâches)
  const doughnutChartData = {
    labels: projects.map((project) => project.title),
    datasets: [
      {
        data: projects.map((project) => project.tasksCompleted),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white shadow-lg rounded-lg">
      {/* Diagramme à barres */}
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Progression des projets</h2>
        <div className="w-full max-w-lg">
          <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
        </div>
      </div>

      {/* Diagramme circulaire */}
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Répartition des tâches accomplies</h2>
        <div className="w-full max-w-lg">
          <Doughnut data={doughnutChartData} options={{ responsive: true, plugins: { legend: { position: "right" } } }} />
        </div>
      </div>
    </div>
  );
};

ProjectCharts.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      tasksCompleted: PropTypes.number.isRequired,
      totalTasks: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ProjectCharts;
