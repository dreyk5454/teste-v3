'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';
import HomeContent from '@/components/HomeContent';

export default function Home() {
  const { isAuthenticated, logout } = useAuthStore();
  const [currentTab, setCurrentTab] = useState('lives');

  return (
    <main className="min-h-screen bg-gray-900">
      <Toaster position="top-right" />
      {!isAuthenticated() ? (
        <AuthForm isLogin={true} />
      ) : (
        <>
          <Navbar onLogout={logout} />
          <div className="container mx-auto px-4 py-8">
            <HomeContent onTabChange={setCurrentTab} currentTab={currentTab} />
          </div>
        </>
      )}
    </main>
  );
}
