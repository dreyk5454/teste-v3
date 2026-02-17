import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  setToken(token: string) {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  clearToken() {
    delete this.client.defaults.headers.common['Authorization'];
  }

  // Auth
  async register(email: string, username: string, password: string) {
    return this.client.post('/auth/register', { email, username, password });
  }

  async login(email: string, password: string) {
    return this.client.post('/auth/login', { email, password });
  }

  // Lives
  async getLives() {
    return this.client.get('/lives');
  }

  async getLiveById(id: string) {
    return this.client.get(`/lives/${id}`);
  }

  async createLive(data: any) {
    return this.client.post('/lives', data);
  }

  async updateLive(id: string, data: any) {
    return this.client.put(`/lives/${id}`, data);
  }

  async deleteLive(id: string) {
    return this.client.delete(`/lives/${id}`);
  }

  // Rooms
  async getRooms() {
    return this.client.get('/lives/rooms');
  }

  async getRoomById(id: string) {
    return this.client.get(`/lives/rooms/${id}`);
  }

  async createRoom(data: any) {
    return this.client.post('/lives/rooms', data);
  }

  async deleteRoom(id: string) {
    return this.client.delete(`/lives/rooms/${id}`);
  }

  async addLiveToRoom(roomId: string, liveId: string) {
    return this.client.post(`/lives/rooms/${roomId}/lives/${liveId}`);
  }

  async removeLiveFromRoom(roomId: string, liveId: string) {
    return this.client.delete(`/lives/rooms/${roomId}/lives/${liveId}`);
  }
}

export const apiClient = new ApiClient();
