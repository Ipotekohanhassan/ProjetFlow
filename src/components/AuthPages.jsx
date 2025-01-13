// components/AuthPages.jsx
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Folder } from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL;
import { Toaster, toast } from 'sonner'

const AuthPages = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '', // Nouveau champ pour confirmer le mot de passe
    name: ''
  })
  const [profilePicture, setProfilePicture] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePicture(file)
      const reader = new FileReader()
      reader.onloadend = () => setPreviewUrl(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Logique de validation
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas.')
      return
    }

    // Création de FormData pour envoyer les données au backend
    const form = new FormData()
    form.append('email', formData.email)
    form.append('password', formData.password)
    form.append('name', formData.name)

    if (profilePicture) {
      form.append('profile_picture', profilePicture)
    }


    // Si on est en mode inscription, on ajoute le champ confirmPassword
    if (!isLogin) {
      form.append('password_confirmation', formData.confirmPassword)
    }

    //afficher les donees des la console
    // for (let [key, value] of form.entries()) {
    //   if (value instanceof File) {
    //     // Afficher les détails du fichier
    //     console.log(`${key}:`);
    //     console.log(`  name: ${value.name}`);
    //     console.log(`  size: ${value.size} bytes`);
    //     console.log(`  type: ${value.type}`);
    //   } else {
    //     console.log(`${key}: ${value}`);
    //   }
    // }

    // Envoi de la requête avec axios
    if (isLogin) {

      axios
        .post(`${API_URL}/login`, form,{withCredentials: true, })
        .then((response) => {
          console.log('Réponse du serveur:', response.data);

          if (response.data.token) {
            // Stocker le token dans le localStorage
            localStorage.setItem('token', response.data.token);

            // Naviguer vers le tableau de bord
            navigate('/dashboard');

            // Afficher un message de succès
            toast.success('Connexion réussie ! Bienvenue.');
          }
        })
        .catch((error) => {
          console.error('Erreur:', error);

          if (error.response) {
            // Vérifier si le serveur retourne une réponse d'erreur
            if (error.response.status === 404 && error.response.data.error === "Email ou mot de passe est incorrect.") {
              toast.error(error.response.data.error);
            } else if (error.response.status === 401 && error.response.data.error === "Email ou mot de passe est incorrect.") {
              toast.error(error.response.data.error);
            } else {
              toast.error(
                error.response.data.message || "Une erreur est survenue. Veuillez réessayer."
              );
            }
          } else {
            // Erreurs réseau ou autres problèmes
            toast.error("Impossible de se connecter au serveur. Vérifiez votre connexion.");
          }
        });

    } else {
      axios.post(`${API_URL}/register`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true, 
      })
        .then((response) => {
          console.log('Réponse du serveur:', response.data);

          if (response.data.token) {
            // Stocker le token dans le localStorage
            localStorage.setItem('token', response.data.token);

            // Naviguer vers le tableau de bord
            navigate('/dashboard');

            // Afficher un message de succès
            toast.success('Inscription réussie ! 🎉');
          } else {
            // Afficher un message depuis la réponse
            toast.info(response.data.message || 'Opération effectuée.');
          }
        })
        .catch((error) => {
          console.error('Erreur:', error);

          if (error.response) {
            // Erreurs de validation ou autre réponse du serveur
            if (error.response.status === 422) {
              const errors = error.response.data.errors;

              // Afficher chaque erreur avec Toastify
              Object.values(errors).forEach((messages) => {
                messages.forEach((msg) => toast.error(msg));
              });
            } else {
              // Autres erreurs (par ex., 500 Internal Server Error)
              toast.error(
                error.response.data.message || 'Une erreur est survenue. Réessayez.'
              );
            }
          } else {
            // Erreurs réseau ou autres
            toast.error('Impossible de se connecter au serveur. Vérifiez votre connexion.');
          }
        });

    }
  }


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Toaster richColors position="top-center" />
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col justify-center items-center mb-8">
          <div className="flex items-center">
            <Folder className="w-8 h-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Projet<span className="text-blue-700">Flow</span>
            </span>
          </div>
          <p className="text-gray-600 mt-2">
            {isLogin ? "Connectez-vous à votre compte" : "Créez votre compte"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="file"
                    id="avatar"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="avatar"
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </label>
                </div>
                <span className="text-sm text-gray-500">Photo de profil</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Nom complet</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
              <input
                type="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            {isLogin ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthPages
