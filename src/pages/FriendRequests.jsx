import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserPlus, X, Check } from 'lucide-react';
import Sidebar from '../components/Sidebar';
const API_URL = import.meta.env.VITE_API_URL;
import { Toaster, toast } from 'sonner'

const FriendRequests = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Récupération des demandes d'amis
        axios.get(`${API_URL}/list-pending-friend-requests`, { withCredentials: true })
            .then((response) => {
                console.log('Réponse de l\'API:', response.data);
                setRequests(response.data.pending_requests);
            })
            .catch((error) => console.error('Erreur lors de la récupération des demandes:', error));
    }, []);

    const handleAccept = (id) => {
        const form = new FormData()
        form.append('id', id)
        axios.post(`${API_URL}/accept-friend-request`, form, { withCredentials: true })
            .then(() => {
                setRequests(requests.filter(request => request.id !== id));
            })
            .catch((error) => console.error('Erreur lors de l\'acceptation:', error));
    };

    const handleReject = (id) => {
        axios.post(`/api/friend-requests/${id}/reject`)
            .then(() => {
                setRequests(requests.filter(request => request.id !== id));
            })
            .catch((error) => console.error('Erreur lors du refus:', error));
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-6 mt-10 overflow-y-auto">
                <div className="max-w-full mx-auto p-6 bg-white rounded-xl shadow-lg">
                    <div className="flex items-center gap-3 mb-6 flex-wrap">
                        <UserPlus className="w-6 h-6 text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-900 flex-1">Demandes d&apos;amis</h1>
                        {requests.length > 0 && (
                            <span className="bg-blue-100 text-blue-600 px-2.5 py-0.5 rounded-full text-sm font-medium">
                                {requests.length}
                            </span>
                        )}
                    </div>

                    {requests.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            Aucune demande d&apos;ami en attente
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {requests.map((request) => (
                                <div
                                    key={request.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex-wrap sm:flex-nowrap"
                                >
                                    <div className="flex items-center space-x-4 w-full sm:w-auto">
                                        <img
                                        src={`http://localhost:8000/storage/${request.sender.profile_picture}`}
                                            alt={request.sender.name} // Utilisation du nom du sender
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="font-medium text-gray-900">{request.sender.name}</h3>
                                            <p className="text-sm text-gray-500">{request.sender.username}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-4 sm:mt-0">
                                        <button
                                            onClick={() => handleAccept(request.id)}
                                            className="inline-flex items-center px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                        >
                                            <Check className="w-4 h-4 mr-1" />
                                            Accepter
                                        </button>
                                        <button
                                            onClick={() => handleReject(request.id)}
                                            className="inline-flex items-center px-3 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                                        >
                                            <X className="w-4 h-4 mr-1" />
                                            Refuser
                                        </button>
                                    </div>
                                </div>
                            ))}

                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default FriendRequests;
