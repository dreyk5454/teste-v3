'use client';

import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

interface NavbarProps {
  onLogout?: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  const { user } = useAuthStore();

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-400">
          🎬 Multi Lives
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-white">Bem-vindo, {user?.username}!</span>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
