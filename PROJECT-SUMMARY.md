# 📊 Resumo do Projeto Multi Lives

## 🎯 Objetivo
Criar uma plataforma completa para assistir múltiplas lives simultâneas em tempo real com interface moderna, autenticação segura e gerenciamento de salas personalizadas.

## 🛠️ Stack Tecnológico

```
┌─────────────────────────────────────────────────────────────┐
│                    MULTI LIVES                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Frontend Layer                    Backend Layer             │
│  ─────────────────                ─────────────────          │
│  • Next.js 14+                    • NestJS 10+              │
│  • React 18                       • TypeORM                 │
│  • TailwindCSS 3                  • JWT Auth                │
│  • React Player                   • PostgreSQL              │
│  • Zustand (State)                • Redis (Cache)           │
│  • Axios (HTTP)                   • Class Validator         │
│  • react-hot-toast                • bcrypt (Security)       │
│                                                              │
│  Port: 3001                       Port: 3000                │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  Infrastructure                                              │
│  ──────────────────────────────────────────────────────────  │
│  • Docker & Docker Compose                                   │
│  • PostgreSQL (Port: 5432)                                   │
│  • Redis (Port: 6379)                                        │
│  • nginx (Reverse Proxy optional)                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Estrutura do Projeto

```
testes 3v/
│
├── 📂 backend/
│   ├── src/
│   │   ├── 📂 auth/           → Autenticação JWT
│   │   ├── 📂 users/          → Gerenciamento de usuários
│   │   ├── 📂 lives/          → Lives e Rooms (salas)
│   │   ├── 📂 redis/          → Cache Redis
│   │   ├── app.module.ts      → Módulo principal
│   │   └── main.ts            → Entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── README.md
│
├── 📂 frontend/
│   ├── src/
│   │   ├── 📂 app/
│   │   │   ├── layout.tsx     → Layout raiz
│   │   │   └── page.tsx       → Página home
│   │   ├── 📂 components/
│   │   │   ├── AuthForm.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── MultiPlayer.tsx
│   │   │   ├── LiveList.tsx
│   │   │   ├── RoomList.tsx
│   │   │   ├── LiveCreator.tsx
│   │   │   └── RoomCreator.tsx
│   │   ├── 📂 store/
│   │   │   ├── authStore.ts
│   │   │   └── liveStore.ts
│   │   ├── 📂 utils/
│   │   │   └── api.ts
│   │   └── 📂 styles/
│   │       └── globals.css
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── Dockerfile
│   └── README.md
│
├── 📂 docker/              → Configurações Docker
│
├── docker-compose.yml      → Orquestração de containers
├── README.md               → Documentação principal
├── SETUP.md                → Guia de instalação
├── QUICK-START.md          → Início rápido
├── DEVELOPMENT.md          → Guia de desenvolvimento
├── CONTRIBUTING.md         → Como contribuir
├── CHANGELOG.md            → Histórico de mudanças
├── LICENSE                 → Licença do projeto
├── setup.sh                → Script Unix/Linux
├── setup.bat               → Script Windows
└── .github/
    └── copilot-instructions.md → Instruções Copilot
```

## 🔄 Fluxo de Dados

```
┌─────────────────────────────────────────────────────┐
│  Frontend (Next.js + React)                          │
│  ┌───────────────────────────────────────────────┐  │
│  │ User Interface (TailwindCSS)                  │  │
│  │ - Login/Register                              │  │
│  │ - Dashboard                                   │  │
│  │ - Live Viewer (React Player)                  │  │
│  │ - Room Management                             │  │
│  └───────────────────────────────────────────────┘  │
│           ↓ HTTP/REST (Axios)                       │
│  ┌───────────────────────────────────────────────┐  │
│  │ Zustand Stores                                │  │
│  │ - Auth Store (user, token)                    │  │
│  │ - Live Store (lives, rooms, players)          │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
         ↓ HTTP/REST
┌─────────────────────────────────────────────────────┐
│  Backend API (NestJS)                               │
│  ┌───────────────────────────────────────────────┐  │
│  │ Controllers (REST Endpoints)                  │  │
│  │ - /auth (login, register)                     │  │
│  │ - /users                                      │  │
│  │ - /lives (CRUD operations)                    │  │
│  │ - /lives/rooms (CRUD & management)            │  │
│  └───────────────────────────────────────────────┘  │
│           ↓                                         │
│  ┌───────────────────────────────────────────────┐  │
│  │ Services (Business Logic)                     │  │
│  │ - Auth Service (JWT, password hashing)        │  │
│  │ - Users Service                               │  │
│  │ - Lives Service (cache + DB operations)       │  │
│  └───────────────────────────────────────────────┘  │
│           ↓                          ↓               │
│  ┌──────────────────────┐  ┌──────────────────────┐ │
│  │ PostgreSQL Database  │  │ Redis Cache Layer    │ │
│  │ ─────────────────────│  │ ──────────────────── │ │
│  │ • users table        │  │ • Live cache         │ │
│  │ • lives table        │  │ • Room cache         │ │
│  │ • rooms table        │  │ • Session cache      │ │
│  │                      │  │                      │ │
│  └──────────────────────┘  └──────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

## 📊 Modelos de Dados

### User
```
{
  id: UUID
  email: string (unique)
  username: string
  password: string (hashed)
  avatar?: string
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Live
```
{
  id: UUID
  title: string
  description?: string
  url: string (stream URL)
  thumbnail?: string
  isActive: boolean
  viewers: number
  creatorId: UUID
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Room
```
{
  id: UUID
  name: string
  description?: string
  creatorId: UUID
  liveIds: UUID[] (array of lives)
  viewers: number
  createdAt: timestamp
}
```

## 🔐 Segurança

```
┌─────────────────┐
│ User Credentials│
└────────┬────────┘
         │
         ↓ bcrypt hashing
┌─────────────────┐
│ Hashed Password │ (armazenado no DB)
└────────┬────────┘
         │
         ↓ Login
┌────────────────────┐
│ JWT Token Generated│ (exp: 24h)
└────────┬───────────┘
         │
         ↓ adicionar ao header: Authorization
┌────────────────────────────────┐
│ Protected Routes requireJWT    │
└────────────────────────────────┘
```

## 🚀 Endpoints Disponíveis

### Public
- `POST /auth/register` - Criar conta
- `POST /auth/login` - Fazer login
- `GET /lives` - Listar lives ativas
- `GET /lives/rooms` - Listar salas públicas

### Protected (require JWT)
- `POST /lives` - Criar nova live
- `PUT /lives/:id` - Atualizar live
- `DELETE /lives/:id` - Deletar live
- `POST /lives/rooms` - Criar sala
- `POST /lives/rooms/:roomId/lives/:liveId` - Adicionar live
- `DELETE /lives/rooms/:roomId/lives/:liveId` - Remover live

## 📈 Estatísticas do Projeto

```
Backend:
  - 5 módulos principais
  - 3 controllers
  - 3 services
  - 3 entities
  - ~800 linhas de código

Frontend:
  - 8 componentes
  - 2 stores (Zustand)
  - 1 API client
  - TailwindCSS com tema customizado
  - ~1200 linhas de código

Total: ~2000 linhas de código limpo e bem estruturado
```

## 🎯 Features Implementadas

- ✅ Autenticação com JWT
- ✅ Registro de usuários
- ✅ Criação de lives
- ✅ Criação de salas personalizadas
- ✅ Adição/remoção de lives em salas
- ✅ Grid responsivo para múltiplas lives
- ✅ Contador de espectadores
- ✅ Cache com Redis
- ✅ Interface moderna com TailwindCSS
- ✅ Docker Compose setup
- ✅ Documentação completa

## 🔄 Ciclo de Vida da Aplicação

```
1. User Signup/Login
   ↓
2. Dashboard - View available lives
   ↓
3. Create or Select a Room
   ↓
4. Add Lives to Room (múltiplas)
   ↓
5. Watch Multi-Players Screen
   ↓
6. Viewers count updated in real-time
   ↓
7. Leave room / Logout
```

## 🛠️ Como Começar

```bash
# 1. Docker (Recomendado)
docker-compose up --build

# 2. Local Setup
cd backend && npm install && npm run start:dev
cd frontend && npm install && npm run dev

# 3. Access
Frontend: http://localhost:3001 (ou 3000 local)
Backend:  http://localhost:3000
```

## 📚 Documentação

- [README.md](./README.md) - Overview completo
- [SETUP.md](./SETUP.md) - Instruções de instalação
- [QUICK-START.md](./QUICK-START.md) - Início rápido
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Padrões de desenvolvimento
- [/backend/README.md](./backend/README.md) - Docs backend
- [/frontend/README.md](./frontend/README.md) - Docs frontend

---

**Multi Lives - Assistindo múltiplas lives em tempo real! 🎬**
