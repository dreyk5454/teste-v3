'use client';

import { useEffect, useState } from 'react';
import { useLiveStore } from '@/store/liveStore';
import { apiClient } from '@/utils/api';

interface LiveListProps {
  onLiveSelect?: (live: any) => void;
}

export default function LiveList({ onLiveSelect }: LiveListProps) {
  const { lives, setLives } = useLiveStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLives();
  }, []);

  const loadLives = async () => {
    try {
      const res = await apiClient.getLives();
      setLives(res.data);
    } catch (error) {
      console.error('Erro ao carregar lives:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-white">Carregando lives...</div>;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-white">🔴 Lives Disponíveis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {lives.map((live) => (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
