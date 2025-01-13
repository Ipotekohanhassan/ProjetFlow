import React, { useState, useRef, useEffect } from 'react';
import { Camera, User, Mail, Lock, Save, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import { Toaster, toast } from 'sonner'

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    newPassword_confirmation: '',
    profile_picture: null
  });

  // Charger les données utilisateur
  const fetchUserData = async () => {
    try {
      const token = document.cookie;
      console.log(token)
      const response = await axios.get(`${API_URL}/user`, {
        withCredentials: true
      });

      setUser(response.data.user);
      setProfileData(prev => ({
        ...prev,
        name: response.data.user.name,
        email: response.data.user.email,
        profile_picture: response.data.user.profile_picture
      }));
      console.log(response.data.user.profile_picture)
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de chargement des données');
      console.error('Erreur:', err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData(prev => ({
        ...prev,
        profile_picture: file
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageReset = () => {
    setImagePreview(null);
    setProfileData(prev => ({
      ...prev,
      profile_picture: null
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const formData = new FormData();
      formData.append('name', profileData.name);
      formData.append('email', profileData.email);
  
      if (profileData.newPassword) {
        formData.append('currentPassword', profileData.currentPassword);
        formData.append('newPassword', profileData.newPassword);
        formData.append('newPassword_confirmation', profileData.newPassword_confirmation);
      }
  
      if (profileData.profile_picture instanceof File) {
        formData.append('profile_picture', profileData.profile_picture);
      }
  

  
      const response = await axios.post(`${API_URL}/profile/update`, formData, {
        headers: {

          'Content-Type': 'multipart/form-data',
          
        },
        withCredentials: true,
      });
  
      if (response.data && response.data.user) {
        setUser(response.data.user);
        toast.success('Profil mis à jour avec succès');
        setEditMode(false);
        fetchUserData();
      } else {
        toast.error('Erreur lors de la mise à jour du profil.');
      }
    } catch (error) {
      console.error('Erreur:', error);
  
      if (error.response) {
        // Vérification de l'existence des erreurs
        const errorData = error.response.data;
        if (errorData.error) {
          toast.error(errorData.error);
        }
  
        // Vérification des erreurs de validation
        if (errorData.errors) {
          // Assurez-vous que errors n'est pas null ou undefined
          Object.values(errorData.errors || {}).forEach((messages) => {
            if (Array.isArray(messages)) {
              messages.forEach((msg) => toast.error(msg));
            }
          });
        }
      } else {
        toast.error('Impossible de se connecter au serveur. Vérifiez votre connexion.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  if (!user) return <div>Chargement...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-2 z-0 overflow-y-auto">
        <Toaster richColors position="top-center" />
        <div className="min-h-screen mt-8 bg-gray-50">
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-6">
              <h1 className="text-3xl font-bold mb-2">Mon Profil</h1>
              <p className="text-blue-100">Gérez vos informations personnelles</p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                {successMessage}
              </div>
            )}



            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  <img
                    src={imagePreview || (user.profile_picture)}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  {editMode && (
                    <>
                      <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-700">
                        <Camera className="w-5 h-5 text-white" />
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          onChange={handleImageChange}
                          accept="image/*"
                          name="profile_picture"
                        />
                      </label>
                      {imagePreview && (
                        <button
                          onClick={handleImageReset}
                          className="absolute -top-2 -right-2 bg-red-500 p-1 rounded-full text-white hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <User className="w-4 h-4 mr-2" />
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!editMode}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!editMode}
                  />
                </div>

                {editMode && (
                  <>
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Lock className="w-4 h-4 mr-2" />
                        Mot de passe actuel
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={profileData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Lock className="w-4 h-4 mr-2" />
                        Nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={profileData.newPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                        <Lock className="w-4 h-4 mr-2" />
                        Confirmer le nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        name="newPassword_confirmation"
                        value={profileData.newPassword_confirmation}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </>
                )}

                <div className="flex justify-end gap-4 pt-4">
                  {editMode ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setEditMode(false);
                          setImagePreview(null);
                          fetchUserData();
                        }}
                        className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                        disabled={loading}
                      >
                        <X className="w-4 h-4" />
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                        disabled={loading}
                      >
                        <Save className="w-4 h-4" />
                        {loading ? 'Sauvegarde...' : 'Sauvegarder'}
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setEditMode(true)}
                      className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Modifier le profil
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}