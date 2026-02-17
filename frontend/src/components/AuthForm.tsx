'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { apiClient } from '@/utils/api';
import { useAuthStore } from '@/store/authStore';

export default function AuthForm({ isLogin = true, onToggleMode }: { isLogin?: boolean; onToggleMode?: () => void }) {
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
        console.log('🔐 Tentando login com:', email);
        const res = await apiClient.login(email, password);
        console.log('✅ Login bem-sucedido:', res.data);
        const { access_token, user } = res.data;
        apiClient.setToken(access_token);
        login(access_token, user);
        toast.success('Login realizado com sucesso!');
      } else {
        console.log('📝 Tentando register com:', email, username);
        const res = await apiClient.register(email, username, password);
        console.log('✅ Cadastro bem-sucedido:', res.data);
        const { access_token, user } = res.data;
        apiClient.setToken(access_token);
        login(access_token, user);
        toast.success('Cadastro realizado com sucesso!');
      }
    } catch (error: any) {
      console.error('❌ Erro de autenticação:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      });
      
      // Tratar diferentes formatos de erro
      let errorMsg = 'Erro ao autenticar';
      
      if (error.response?.data?.message) {
        // Se message é um array (validação), pega o primeiro
        if (Array.isArray(error.response.data.message)) {
          errorMsg = error.response.data.message[0];
        } else {
          errorMsg = error.response.data.message;
        }
      } else if (error.message) {
        errorMsg = error.message;
      }
      
      toast.error(errorMsg);
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

        {/* Botão para trocar entre Login e Registre */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 mb-3">
            {isLogin ? 'Não tem conta?' : 'Já tem conta?'}
          </p>
          <button
            onClick={onToggleMode}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            {isLogin ? 'Criar Conta' : 'Fazer Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
