# Multi Lives - README Frontend

## 🎯 Sobre

Frontend da plataforma Multi Lives desenvolvido com **Next.js**, **React**, **TailwindCSS** e **React Player**.

## 🚀 Início Rápido

### Instalação

```bash
npm install
```

### Configurar Variáveis de Ambiente

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Executar

**Desenvolvimento:**
```bash
npm run dev
```

Acesse http://localhost:3000

**Produção:**
```bash
npm run build
npm run start
```

## 📁 Estrutura

```
src/
├── app/
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página home
├── components/
│   ├── AuthForm.tsx       # Formulário de autenticação
│   ├── Navbar.tsx         # Barra de navegação
│   ├── MultiPlayer.tsx    # Reprodutor múltiplo
│   ├── LiveList.tsx       # Lista de lives
│   ├── RoomList.tsx       # Lista de salas
│   ├── LiveCreator.tsx    # Criador de lives
│   ├── RoomCreator.tsx    # Criador de salas
│   └── HomeContent.tsx    # Conteúdo principal
├── store/
│   ├── authStore.ts       # Zustand auth store
│   └── liveStore.ts       # Zustand lives/rooms store
├── utils/
│   └── api.ts             # Cliente API com axios
└── styles/
    └── globals.css        # Estilos globais TailwindCSS
```

## 🎨 Componentes

### AuthForm
Formulário de login/registro
```tsx
<AuthForm isLogin={true} />
<AuthForm isLogin={false} />
```

### MultiPlayer
Exibe múltiplas lives em grid responsivo
```tsx
<MultiPlayer liveIds={roomIds} lives={lives} />
```

### LiveList
Lista de lives disponíveis
```tsx
<LiveList onLiveSelect={(live) => handleSelect(live)} />
```

### RoomList
Lista de salas criadas
```tsx
<RoomList onRoomSelect={(room) => handleSelect(room)} />
```

## 🗂️ Gerenciamento de Estado

### Auth Store (Zustand)
```typescript
const { token, user, login, logout, isAuthenticated } = useAuthStore();
```

### Live Store (Zustand)
```typescript
const { 
  lives, 
  rooms, 
  selectedRoom, 
  addLive, 
  removeLive,
  setRooms,
  selectRoom 
} = useLiveStore();
```

## 🔌 API Client

Use o `apiClient` para fazer requisições:

```typescript
import { apiClient } from '@/utils/api';

// Auth
await apiClient.login(email, password);
await apiClient.register(email, username, password);

// Lives
await apiClient.getLives();
await apiClient.createLive(data);
await apiClient.deleteLive(id);

// Rooms
await apiClient.getRooms();
await apiClient.createRoom(data);
await apiClient.addLiveToRoom(roomId, liveId);
```

## 🎮 Funcionalidades

### Grid Responsivo
- 1 coluna: 1 live
- 2 colunas: 2-4 lives
- 3 colunas: 5-6 lives
- 4 colunas: 7+ lives

### React Player
```tsx
<ReactPlayer
  url={url}
  controls
  playing
  width="100%"
  height="100%"
/>
```

### Toast Notifications
```typescript
import toast from 'react-hot-toast';

toast.success('Sucesso!');
toast.error('Erro!');
```

## 📦 Build

```bash
npm run build
```

Output em `.next/`

## 🐳 Docker

```bash
docker build -t multi-lives-frontend .
docker run -p 3000:3000 multi-lives-frontend
```

## 🛠️ Scripts

- `npm run dev` - Desenvolvimento
- `npm run build` - Build
- `npm run start` - Inicia produção
- `npm run lint` - Lint + fix

## 🎨 Cores TailwindCSS

Customize em `tailwind.config.js`:

```javascript
colors: {
  dark: {
    50: '#f9fafb',
    100: '#f3f4f6',
    // ...
    900: '#111827',
  },
}
```

## ⚡ Performance

- Code splitting automático
- Image optimization
- Cache com Redis (backend)
- Zustand para gerenciamento eficiente

## 🔒 Segurança

- JWT armazenado no state (Next.js)
- CORS configurado
- Validação de entrada

---

**Happy streaming! 🎬**
