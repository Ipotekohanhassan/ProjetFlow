import { useState, useEffect } from 'react';
import { Search, UserPlus, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import { Toaster, toast } from 'sonner'

const TeamMembers = () => {
  const [friends, setFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteSearchQuery, setInviteSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les amis via API
  const fetchFriends = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/list-friends`, {

        withCredentials:true
      });
      // Vérifier si la réponse contient la propriété data attendue
      const friendsData = Array.isArray(response.data) ? response.data :
        (response.data.data ? response.data.data : []);
      setFriends(friendsData);
      setError(null);
    } catch (error) {
      console.error('Erreur lors de la récupération des amis:', error);
      setError('Impossible de charger la liste des amis');
      toast.error('Erreur lors du chargement des amis');
    } finally {
      setIsLoading(false);
    }
  };

  // Récupérer tous les utilisateurs (pour inviter)
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        withCredentials:true
      });
      const usersData = Array.isArray(response.data) ? response.data :
        (response.data.data ? response.data.data : []);
      setAllUsers(response.data.users);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      toast.error('Erreur lors du chargement des utilisateurs');
    }
  };

  const updateUserStatus = (userId) => {
    setAllUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isFriendRequestSent: true } : user
      )
    );
  };

  // Envoyer une invitation
  const sendInvitation = async (user) => {
    console.log(user.id)
    try {
      await axios.post(`${API_URL}/send-friend-request`, { receiver_id: user.id }, {
        withCredentials:true
      });

      toast.success(`Invitation envoyée à ${user.name}`);   
      updateUserStatus(user.id); 


      setShowInviteModal(false);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'invitation:', error);
      toast.error('Erreur lors de l\'envoi de l\'invitation');
    }
  };

  // Filtrer les amis de manière sécurisée
  const getFilteredFriends = () => {
    if (!Array.isArray(friends)) return [];
    return friends.filter(friend =>
      friend.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.role?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Filtrer les utilisateurs de manière sécurisée
  const getFilteredUsers = () => {
    if (!Array.isArray(allUsers)) return [];
    return allUsers.filter(user =>
      user.name?.toLowerCase().includes(inviteSearchQuery.toLowerCase())
    );
  };

  useEffect(() => {
    fetchFriends();
    const interval = setInterval(() => {
      fetchAllUsers(); // Fonction pour récupérer les utilisateurs depuis l'API
    }, 1000); // Toutes les 5 secondes
  
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 sm:p-8 mb-5 mt-6 shadow-lg">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="mb-4 sm:mb-0">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      Gestion des membres de l&apos;équipe
                    </h1>
                    <p className="text-blue-100 text-sm sm:text-base">
                      Gérez vos amis et envoyez des invitations
                    </p>
                  </div>
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-md"
                  >
                    <UserPlus size={20} />
                    Inviter un membre
                  </button>
                </div>
              </div>

              {/* Section Recherche */}
              <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Rechercher par nom, rôle ou département..."
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* État de chargement */}
              {isLoading && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}

              {/* Message d'erreur */}
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {/* Liste des amis */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredFriends().map(friend => (
                  <div key={friend.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <img
                          src={friend.profile_picture || '/api/placeholder/100/100'}
                          alt={friend.name}
                          className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-50"
                        />
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{friend.name}</h3>
                        <p className="text-blue-600 font-medium text-sm mb-1">{friend.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal d'Invitation */}
              {showInviteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900">
                          Inviter un nouveau membre
                        </h2>
                        <button
                          onClick={() => setShowInviteModal(false)}
                          className="text-gray-400 hover:text-gray-500 transition-colors"
                        >
                          <X size={24} />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-6">
                        <input
                          type="text"
                          placeholder="Rechercher un utilisateur..."
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={inviteSearchQuery}
                          onChange={(e) => setInviteSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {inviteSearchQuery.trim() === '' ? (
                          <p className="text-gray-500 text-center">Commencez à taper pour rechercher un utilisateur...</p>
                        ) : (
                          getFilteredUsers().map(user => (
                            <div
                              key={user.id}
                              className="p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <img
                                    src={`http://localhost:8000/storage/${user.profile_picture}`}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full object-cover ring-4 ring-blue-50"
                                  />
                                  <div>
                                    <h4 className="font-semibold text-gray-900">{user.name}</h4>
                                    <p className="text-sm text-blue-600">{user.role}</p>
                                  </div>
                                </div>
                                {user.isFriendRequestSent ? (
                                  <button
                                    disabled
                                    className="bg-gray-400 text-white px-4 py-2 rounded-lg font-medium cursor-not-allowed"
                                  >
                                    Invité
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => sendInvitation(user)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                  >
                                    Inviter
                                  </button>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>


                    </div>
                  </div>
                </div>
              )}

              <Toaster />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TeamMembers;