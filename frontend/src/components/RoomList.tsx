'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useLiveStore } from '@/store/liveStore';
import { apiClient } from '@/utils/api';
import toast from 'react-hot-toast';

interface RoomListProps {
  onRoomSelect: (room: any) => void;
}

export default function RoomList({ onRoomSelect }: RoomListProps) {
  const { rooms, setRooms } = useLiveStore();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated()) {
      loadRooms();
    }
  }, [isAuthenticated]);

  const loadRooms = async () => {
    try {
      const res = await apiClient.getRooms();
      setRooms(res.data);
    } catch (error) {
      console.error('Erro ao carregar salas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoom = async (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Tem certeza que deseja deletar a sala "${name}"?`)) {
      try {
        await apiClient.deleteRoom(id);
        toast.success('Sala deletada com sucesso!');
        const updatedRooms = rooms.filter((room) => room.id !== id);
        setRooms(updatedRooms);
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Erro ao deletar sala');
      }
    }
  };

  if (loading) {
    return <div className="text-center text-white">Carregando salas...</div>;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-white">🎬 Salas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => onRoomSelect(room)}
            className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition"
          >
            <h3 className="text-white font-bold">{room.name}</h3>
            <p className="text-gray-400 text-sm">{room.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-blue-400 text-sm">{room.liveIds.length} lives</span>
              <span className="text-green-400 text-sm">👥 {room.viewers}</span>
            </div>
            <button
              onClick={(e) => handleDeleteRoom(room.id, room.name, e)}
              className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs transition"
            >
              🗑️ Deletar Sala
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
