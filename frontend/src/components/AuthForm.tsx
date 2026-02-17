'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { apiClient } from '@/utils/api';
import { useAuthStore } from '@/store/authStore';

export default function AuthForm({ isLogin = true }: { isLogin?: boolean }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const res = await apiClient.login(email, password);
        const { access_token, user } = res.data;
        apiClient.setToken(access_token);
        login(access_token, user);
        toast.success('Login realizado com sucesso!');
      } else {
        const res = await apiClient.register(email, username, password);
        const { access_token, user } = res.data;
        apiClient.setToken(access_token);
        login(access_token, user);
        toast.success('Cadastro realizado com sucesso!');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao autenticar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Cadastro'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          )}
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition disabled:opacity-50"
          >
            {loading ? 'Carregando...' : isLogin ? 'Login' : 'Cadastro'}
          </button>
        </form>
      </div>
    </div>
  );
}
