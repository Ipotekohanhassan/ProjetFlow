import { useState } from 'react';
import { Plus } from 'lucide-react';

const MemberSearch = ({ availableMembers, addMember }) => {
  const [query, setQuery] = useState('');

  const filteredMembers = availableMembers.filter(member =>
    member.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher un membre..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border rounded-full mb-4"
      />
      {query ? (
  filteredMembers.length > 0 ? (
    filteredMembers.map((member) => (
      <div key={member.id} className="flex items-center justify-between bg-gray-100 rounded-full px-4 py-2 mb-2">
        <div className="flex items-center space-x-2">
          <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
          <div>
            <span className="font-medium">{member.name}</span>
            <span className="text-xs text-gray-500 block">{member.role}</span>
          </div>
        </div>
        <button onClick={() => addMember(member)} className="text-green-500 hover:bg-green-50 rounded-full p-1">
          <Plus />
        </button>
      </div>
    ))
  ) : (
    <p className="text-sm text-gray-500">Aucun membre trouvé</p>
  )
) : (
  <p className="text-sm text-gray-500">Commencez à taper pour rechercher des membres</p>
)}

    </div>
  );
};

export default MemberSearch;
