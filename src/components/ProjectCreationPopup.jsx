import { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { FolderPlus } from 'lucide-react';
import 'tailwindcss/tailwind.css';

const ProjectCreationPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    budget: '',
  });
  const [errors, setErrors] = useState({});

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.projectName) {
      newErrors.projectName = 'Nom du projet est requis';
    }
    if (!formData.description) {
      newErrors.description = 'Description est requise';
    }
    if (!formData.budget) {
      newErrors.budget = 'Budget est requis';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      closeModal();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <button
        onClick={openModal}
        className="bg-white text-blue-600 font-bold px-8 py-4 rounded-lg shadow-lg transition-transform transform hover:scale-110 hover:bg-blue-600 hover:text-white"
      >
        + Nouveau Projet
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Project Creation Form"
        className="fixed inset-0 flex justify-center items-center px-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8 relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            <FaTimes size={24} />
          </button>
          <h2 className="text-3xl font-bold mb-6 flex items-center text-blue-600">
            <FolderPlus className="mr-3" size={32} />
            Créer un Nouveau Projet
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium text-gray-700">Nom du Projet</label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                className={`w-full p-4 text-gray-800 border ${errors.projectName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-500 outline-none`}
              />
              {errors.projectName && <p className="text-red-500 text-sm mt-2">{errors.projectName}</p>}
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full p-4 text-gray-800 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-500 outline-none`}
              />
              {errors.description && <p className="text-red-500 text-sm mt-2">{errors.description}</p>}
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-lg font-medium text-gray-700">Budget (en $)</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`w-full p-4 text-gray-800 border ${errors.budget ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-blue-500 outline-none`}
              />
              {errors.budget && <p className="text-red-500 text-sm mt-2">{errors.budget}</p>}
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-blue-700"
              >
                Soumettre
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectCreationPopup;
