'use client';

import { useRef } from 'react';
import ReactPlayer from 'react-player';

interface MultiPlayerProps {
  liveIds: string[];
  lives: any[];
}

export default function MultiPlayer({ liveIds, lives }: MultiPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getGridClass = (count: number) => {
    if (count === 1) return 'grid-cols-1';
    if (count === 2) return 'grid-cols-2';
    if (count === 3 || count === 4) return 'grid-cols-2';
    if (count >= 5 && count <= 6) return 'grid-cols-3';
    return 'grid-cols-4';
  };

  const getLiveData = (liveId: string) => {
    return lives.find((l) => l.id === liveId);
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className={`grid ${getGridClass(liveIds.length)} gap-4 auto-rows-max`}>
        {liveIds.map((liveId) => {
          const live = getLiveData(liveId);
          if (!live) return null;

          return (
            <div
              key={liveId}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <div className="absolute inset-0">
                  <ReactPlayer
                    url={live.url}
                    width="100%"
                    height="100%"
                    controls
                    playing
                    light={live.thumbnail}
                  />
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-white font-bold truncate">{live.title}</h3>
                <p className="text-gray-400 text-sm">
                  👥 {live.viewers} espectadores
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
