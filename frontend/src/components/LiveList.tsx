'use client';

import { useEffect, useState } from 'react';
import { useLiveStore } from '@/store/liveStore';
import { apiClient } from '@/utils/api';
import toast from 'react-hot-toast';

interface LiveListProps {
  onLiveSelect?: (live: any) => void;
  refreshTrigger?: number;
}

export default function LiveList({ onLiveSelect, refreshTrigger }: LiveListProps) {
  const { lives, setLives } = useLiveStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLives();
  }, [refreshTrigger]);

  const loadLives = async () => {
    try {
      console.log('🔄 Carregando lives...');
      const res = await apiClient.getLives();
      console.log('✅ Lives carregadas:', res.data.length);
      setLives(res.data);
    } catch (error) {
      console.error('❌ Erro ao carregar lives:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLive = async (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Tem certeza que deseja deletar "${title}"?`)) {
      try {
        await apiClient.deleteLive(id);
        toast.success('Live deletada com sucesso!');
        const updatedLives = lives.filter((live) => live.id !== id);
        setLives(updatedLives);
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Erro ao deletar live');
      }
    }
  };

  if (loading) {
    return <div className="text-center text-white">Carregando lives...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">🔴 Lives Disponíveis</h2>
        <button
          onClick={loadLives}
          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
        >
          🔄 Atualizar
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {lives && lives.length > 0 ? (
          lives.map((live) => (
            <div
              key={live.id}
              onClick={() => onLiveSelect?.(live)}
              className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:transform hover:scale-105 transition"
            >
              {live.thumbnail && (
                <img
                  src={live.thumbnail}
                  alt={live.title}
                  className="w-full h-32 object-cover"
                />
              )}
              <div className="p-3">
                <h3 className="text-white font-bold truncate">{live.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">{live.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-red-400 text-sm font-bold">● LIVE</span>
                  <span className="text-green-400 text-sm">👥 {live.viewers}</span>
                </div>
                <button
                  onClick={(e) => handleDeleteLive(live.id, live.title, e)}
                  className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs transition"
                >
                  🗑️ Deletar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400">
            Nenhuma live disponível no momento
          </div>
        )}
      </div>
    </div>
  );
}
