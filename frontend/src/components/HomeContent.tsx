'use client';

import { useState } from 'react';
import { useLiveStore } from '@/store/liveStore';
import { apiClient } from '@/utils/api';
import LiveList from './LiveList';
import RoomList from './RoomList';
import MultiPlayer from './MultiPlayer';
import RoomCreator from './RoomCreator';
import LiveCreator from './LiveCreator';
import toast from 'react-hot-toast';

interface HomeContentProps {
  onTabChange?: (tab: string) => void;
  currentTab?: string;
}

export default function HomeContent({ onTabChange, currentTab = 'lives' }: HomeContentProps) {
  const { lives, selectedRoom, addLiveToRoom, setRooms } = useLiveStore();
  const [activeTab, setActiveTab] = useState(currentTab);

  const handleRoomSelect = (room: any) => {
    useLiveStore.setState({ selectedRoom: room });
    setActiveTab('player');
  };

  const handleLiveSelect = async (live: any) => {
    if (selectedRoom) {
      try {
        await apiClient.addLiveToRoom(selectedRoom.id, live.id);
        addLiveToRoom(selectedRoom.id, live);
        toast.success('Live adicionada à sala!');
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Erro ao adicionar live');
      }
    } else {
      toast.error('Selecione uma sala primeiro!');
    }
  };

  const handleRoomCreated = (room: any) => {
    setRooms([...useLiveStore.getState().rooms, room]);
    toast.success('Sala criada com sucesso!');
  };

  const handleLiveCreated = (live: any) => {
    useLiveStore.setState({ lives: [...lives, live] });
    toast.success('Live criada com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => {
            setActiveTab('lives');
            onTabChange?.('lives');
          }}
          className={`px-4 py-2 rounded font-bold transition ${
            activeTab === 'lives'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Lives Disponíveis
        </button>
        <button
          onClick={() => {
            setActiveTab('rooms');
            onTabChange?.('rooms');
          }}
          className={`px-4 py-2 rounded font-bold transition ${
            activeTab === 'rooms'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Salas
        </button>
        {selectedRoom && (
          <button
            onClick={() => {
              setActiveTab('player');
              onTabChange?.('player');
            }}
            className={`px-4 py-2 rounded font-bold transition ${
              activeTab === 'player'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            👀 Assistindo: {selectedRoom.name}
          </button>
        )}
        <div className="ml-auto flex gap-2">
          <LiveCreator onLiveCreated={handleLiveCreated} />
          <RoomCreator onRoomCreated={handleRoomCreated} />
        </div>
      </div>

      <div className="mt-8">
        {activeTab === 'lives' && <LiveList onLiveSelect={handleLiveSelect} />}
        {activeTab === 'rooms' && <RoomList onRoomSelect={handleRoomSelect} />}
        {activeTab === 'player' && selectedRoom && (
          <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">{selectedRoom.name}</h2>
              <p className="text-gray-400">{selectedRoom.description}</p>
              <div className="mt-4 flex gap-2">
                <LiveCreator onLiveCreated={handleLiveCreated} />
                <button
                  onClick={() => {
                    useLiveStore.setState({ selectedRoom: null });
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Sair da Sala
                </button>
              </div>
            </div>
            <MultiPlayer
              liveIds={selectedRoom.liveIds}
              lives={lives}
            />
          </div>
        )}
      </div>
    </div>
  );
}
