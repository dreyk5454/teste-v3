# 🗺️ Mapa de Navegação - Multi Lives

## 📖 Comece Por Aqui

### 🎯 Seu Primeiro Acesso
1. Leia: [QUICK-START.md](./QUICK-START.md) (5 min)
2. Execute: `docker-compose up --build`
3. Acesse: http://localhost:3001

### 📚 Documentação Completa

```
Raiz do Projeto/
│
├── 🚀 INÍCIO RÁPIDO
│   ├── QUICK-START.md ⚡ (5 minutos para rodar)
│   └── SETUP.md 📝 (Instalação detalhada)
│
├── 📖 DOCUMENTAÇÃO PRINCIPAL
│   ├── README.md 📋 (Overview completo)
│   └── PROJECT-SUMMARY.md 📊 (Resumo técnico)
│
├── 🏗️ ARQUITETURA
│   ├── ARCHITECTURE.md 📐 (Diagramas e estrutura)
│   └── DEVELOPMENT.md 💻 (Padrões de código)
│
├── 🔧 CONTRIBUIÇÃO
│   ├── CONTRIBUTING.md 🤝 (Como contribuir)
│   └── CHANGELOG.md 📝 (Histórico)
│
├── 🎬 COMPONENTES
│   ├── backend/README.md (API e Backend)
│   └── frontend/README.md (Interface e Frontend)
│
└── 📁 PROJETO
    ├── backend/ (NestJS)
    ├── frontend/ (Next.js)
    ├── docker-compose.yml
    └── LICENSE (MIT)
```

---

## 🎯 Por Que Você Está Aqui?

### "Quero começar rápido"
👉 Leia: [QUICK-START.md](./QUICK-START.md)

### "Quero entender a arquitetura"
👉 Leia: [ARCHITECTURE.md](./ARCHITECTURE.md)

### "Quero contribuir com código"
👉 Leia: [DEVELOPMENT.md](./DEVELOPMENT.md)

### "Tenho um problema"
👉 Verifique: [SETUP.md#Troubleshooting](./SETUP.md)

### "Quero deploy em produção"
👉 Leia: [README.md](./README.md) seção "Deployment"

---

## 📂 Estrutura Detalhada

### Backend
```
backend/
├── src/
│   ├── ⚙️ Configuração
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── app.controller.ts
│   │
│   ├── 🔐 Auth & Security
│   │   ├── auth/
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── jwt.guard.ts
│   │   │   └── jwt-auth.guard.ts
│   │   └── users/
│   │       ├── users.service.ts
│   │       ├── users.controller.ts
│   │       └── entities/user.entity.ts
│   │
│   ├── 🎬 Core Business Logic
│   │   └── lives/
│   │       ├── lives.service.ts
│   │       ├── lives.controller.ts
│   │       ├── entities/live.entity.ts
│   │       ├── entities/room.entity.ts
│   │       └── dto/
│   │
│   ├── ⚡ Cache & Performance
│   │   └── redis/
│   │       ├── redis.service.ts
│   │       └── redis.module.ts
│   │
│   └── 🏥 Monitoring
│       └── health/
│           └── health.service.ts
│
├── 🐘 Configurações
│   ├── package.json
│   ├── tsconfig.json
│   ├── .eslintrc.js
│   └── .prettierrc
│
├── 🐳 Docker
│   ├── Dockerfile
│   └── .dockerignore
│
└── 📚 Documentação
    ├── README.md
    └── .env.example
```

### Frontend
```
frontend/
├── src/
│   │
│   ├── 🏠 Páginas & Layout
│   │   └── app/
│   │       ├── layout.tsx (principal)
│   │       └── page.tsx (home)
│   │
│   ├── 🧩 Componentes
│   │   ├── AuthForm.tsx (login/register)
│   │   ├── Navbar.tsx (navegação)
│   │   ├── MultiPlayer.tsx ⭐ (grid responsivo)
│   │   ├── LiveList.tsx (lista de lives)
│   │   ├── RoomList.tsx (lista de salas)
│   │   ├── LiveCreator.tsx (criar live)
│   │   ├── RoomCreator.tsx (criar sala)
│   │   └── HomeContent.tsx (conteúdo principal)
│   │
│   ├── 📦 State Management
│   │   └── store/
│   │       ├── authStore.ts (usuário & token)
│   │       └── liveStore.ts (lives & rooms)
│   │
│   ├── 🔗 API Client
│   │   └── utils/
│   │       └── api.ts (integração backend)
│   │
│   └── 🎨 Estilos
│       └── styles/
│           └── globals.css (TailwindCSS)
│
├── 🎨 Configurações
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .eslintrc.json
│   └── .prettierrc
│
├── 🐳 Docker
│   ├── Dockerfile
│   └── next.config.js
│
└── 📚 Documentação
    ├── README.md
    ├── .env.example
    └── .env.local.example
```

---

## 🔄 Fluxo de Desenvolvimento

### 1️⃣ Setup
```
$ docker-compose up --build
✅ PostgreSQL ✅ Redis ✅ Backend ✅ Frontend
```

### 2️⃣ Acessar
```
Frontend: http://localhost:3001
Backend:  http://localhost:3000
Database: localhost:5432 (user: postgres, pass: postgres)
Cache:    localhost:6379
```

### 3️⃣ Usar
```
1. Registre conta
2. Faça login
3. Crie live
4. Crie sala
5. Adicione live à sala
6. Assista!
```

---

## 🎓 Aprendizado Recomendado

### Iniciante
1. Leia: [QUICK-START.md](./QUICK-START.md)
2. Execute: `docker-compose up`
3. Explore: Frontend
4. Tente: Criar live e sala

### Intermediário
1. Leia: [PROJECT-SUMMARY.md](./PROJECT-SUMMARY.md)
2. Estude: Código dos componentes
3. Verifique: API endpoints
4. Tente: Adicionar novo componente

### Avançado
1. Leia: [ARCHITECTURE.md](./ARCHITECTURE.md)
2. Estude: Services e Controllers
3. Entenda: Fluxo de dados
4. Implemente: Nova feature completa

---

## 🛠️ Comandos Úteis

### Docker
```bash
# Start
docker-compose up --build

# Logs em tempo real
docker-compose logs -f

# Para
docker-compose down

# Rebuild
docker-compose up --build --force-recreate
```

### Backend
```bash
cd backend

# Desenvolvimento
npm run start:dev

# Build
npm run build

# Testes
npm run test

# Lint
npm run lint
```

### Frontend
```bash
cd frontend

# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm run start

# Lint
npm run lint
```

---

## 📋 Checklist de Exploração

- [ ] Ler QUICK-START.md
- [ ] Executar `docker-compose up`
- [ ] Acessar http://localhost:3001
- [ ] Criar conta
- [ ] Fazer login
- [ ] Criar live
- [ ] Criar sala
- [ ] Assistir múltiplas lives
- [ ] Explorar código backend
- [ ] Explorar código frontend
- [ ] Ler ARCHITECTURE.md
- [ ] Ler DEVELOPMENT.md
- [ ] Entender fluxo de dados
- [ ] Testar adicionar novo componente

---

## 🎯 Recursos por Tipo

### 📖 Documentação
- [README.md](./README.md) - Principal
- [SETUP.md](./SETUP.md) - Instalação
- [QUICK-START.md](./QUICK-START.md) - Início rápido
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitetura
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Dev guide
- [PROJECT-SUMMARY.md](./PROJECT-SUMMARY.md) - Resumo

### 💻 Código
- [backend/src](./backend/src) - Backend NestJS
- [frontend/src](./frontend/src) - Frontend Next.js
- [docker-compose.yml](./docker-compose.yml) - Infra

### 🔧 Configuração
- [backend/package.json](./backend/package.json) - Dependencies
- [frontend/package.json](./frontend/package.json) - Dependencies
- [backend/.env.example](./backend/.env.example) - Env template
- [frontend/.env.example](./frontend/.env.example) - Env template

### 📝 Desenvolvimento
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Como contribuir
- [CHANGELOG.md](./CHANGELOG.md) - Histórico
- [LICENSE](./LICENSE) - MIT License

---

## 🔍 Buscar Informações

### "Como adicionar novo endpoint?"
1. backend/README.md
2. DEVELOPMENT.md
3. Veja exemplo: lives.controller.ts

### "Como conectar ao db?"
1. backend/src/app.module.ts
2. lives/entities/live.entity.ts
3. lives/lives.service.ts

### "Como fazer request à API?"
1. frontend/src/utils/api.ts
2. frontend/src/components/AuthForm.tsx
3. frontend/README.md

### "Como adicionar componente React?"
1. frontend/README.md
2. DEVELOPMENT.md
3. frontend/src/components/MultiPlayer.tsx

---

## 🚀 Próximas Ações

### Agora
1. Execute `docker-compose up --build`
2. Acesse http://localhost:3001
3. Teste a aplicação

### Depois
1. Leia a documentação
2. Explore o código
3. Entenda a arquitetura
4. Faça uma mudança pequena

### Futuro
1. Adicione features novas
2. Configure CI/CD
3. Deploy em produção
4. Convide amigos

---

## 📞 Precisa de Ajuda?

| Dúvida | Recurso |
|--------|---------|
| Não consegui instalar | SETUP.md → Troubleshooting |
| Não entendi a arquitetura | ARCHITECTURE.md |
| Quero contribuir | CONTRIBUTING.md |
| Encontrei um bug | GitHub Issues |
| Tenho uma sugestão | GitHub Discussions |

---

**Bem-vindo ao Multi Lives! Aproveite a jornada 🎬**

---

*Última atualização: Fevereiro 2026*
