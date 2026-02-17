# 🎬 Multi Lives - Plataforma de Múltiplas Transmissões Simultâneas

Uma aplicação web moderna para assistir múltiplas lives simultaneamente com suporte HLS/DASH/RTMP, autenticação JWT, cache Redis e database PostgreSQL.

![Status](https://img.shields.io/badge/Status-Production%20Ready-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-1.0.0-brightgreen)

## � Arquitetura e Camadas

### Estrutura de Camadas
```
┌─────────────────────────────────┐
│   Frontend (Next.js/React)      │
│   - Components React            │
│   - Zustand Store               │
│   - React Player (HLS/DASH)     │
└──────────────┬──────────────────┘
               │ Axios + JWT
┌──────────────▼──────────────────┐
│   Backend (NestJS)              │
│   - Controllers                 │
│   - Services                    │
│   - JwtGuard                    │
└──────────────┬──────────────────┘
               │
        ┌──────┼──────┐
        │      │      │
   ┌────▼──┐ ┌─▼──┐ ┌─▼──┐
   │ PG DB │ │Auth│ │Cache│
   │ (15)  │ │(JWT)│ │(R7) │
   └───────┘ └────┘ └─────┘
```

### Módulos Backend

| Módulo | Responsabilidade | Endpoints |
|--------|------------------|-----------|
| **Auth** | Autenticação e JWT | `/auth/register`, `/auth/login` |
| **Users** | Gerenciamento de usuários | `/users` (GET, POST, PATCH, DELETE) |
| **Lives** | CRUD de transmissões | `/lives` (GET, POST, PATCH, DELETE) |
| **Rooms** | Agrupamento de lives | `/lives/rooms` (GET, POST, DELETE) |
| **Redis** | Cache layer | Cache de queries |

## � Como Começar Rápido

### Pré-requisitos
- Docker & Docker Compose instalados
- Git

### ⚡ Quickstart em 3 passos

```bash
# 1️⃣ Clone o repositório
git clone git@github.com:dreyk5454/teste-v3.git
cd teste-v3

# 2️⃣ Inicie tudo com Docker
docker-compose up --build

# ⏳ Aguarde 15-20 segundos...

# 3️⃣ Acesse a aplicação
# 🌐 Frontend: http://localhost:3001
# 🖥️  Backend:  http://localhost:3000
```

### 📝 Primeiro Acesso

1. **Registre-se** na interface (http://localhost:3001)
   - Email: seu@email.com
   - Username: seu_usuario
   - Senha: Pass123!@

2. **Crie uma Live**
   - Título: "Minha primeira live"
   - URL: https://example.com/stream.m3u8
   - Descrição: Sua descrição

3. **Crie uma Sala**
   - Nome: "Minha sala"
   - Adicione lives

4. **Assista!** 📺

### 🧪 Validar a Instalação

```bash
# Terminal na pasta do projeto:
python test_layers.py

# Esperado: 6/6 testes passando ✓
```

---

## 📁 Estrutura do Projeto

```
multi-lives/
├── backend/                      # NestJS Server
│   ├── src/
│   │   ├── auth/                 # Autenticação & JWT
│   │   ├── users/                # Gerenciamento de usuários
│   │   ├── lives/                # Lives & Rooms
│   │   ├── redis/                # Cache layer
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                     # Next.js App
│   ├── src/
│   │   ├── app/                  # Pages & Layout
│   │   ├── components/           # React Components
│   │   ├── store/                # Zustand Stores
│   │   ├── utils/                # API & Utilities
│   │   └── styles/               # Global CSS
│   ├── Dockerfile
│   ├── next.config.js
│   └── package.json
│
├── docker-compose.yml            # Orchestration
├── README.md                      # This file
├── GUIA_PRATICO_USO.md           # Practical guide
├── STEP_4_FLUXO_COMPLETO.md      # Complete flow
└── STEP_5_RELATORIO_FINAL.md     # Performance report
```

## � Métricas de Performance

### Validações Executadas
| Teste | Resultado | Status |
|-------|-----------|--------|
| Health Check | 200 OK | ✅ |
| Registro de Usuário | 201 Created | ✅ |
| Cache Layer | Redis OK | ✅ |
| JWT Validation | 403 Forbidden (sem token) | ✅ |
| CRUD Lives | 201 Created | ✅ |
| Room Management | 201 Created | ✅ |

### Performance Medida
| Métrica | Valor | Avaliação |
|---------|-------|-----------|
| Autenticação (bcrypt 10 rounds) | ~110ms | Excelente |
| Requisição HTTP média | 12-16ms | Excelente |
| Cache HIT | ~13ms | Excelente |
| Query Database | 7-9ms | Excelente |
| Consistência (CV) | 15% | Muito consistente |

---

## 🔌 Endpoints da API

### Autenticação
```bash
POST   /auth/register          # Registrar novo usuário
POST   /auth/login             # Fazer login
GET    /health                 # Verificar saúde da API
```

### Usuários
```bash
GET    /users                  # Listar todos (com cache)
GET    /users/:id              # Obter específico
PATCH  /users/:id              # Atualizar
DELETE /users/:id              # Deletar
```

### Lives (Transmissões)
```bash
GET    /lives                  # Listar todas (com cache)
GET    /lives/:id              # Obter específica
POST   /lives                  # Criar nova
PATCH  /lives/:id              # Atualizar
DELETE /lives/:id              # Deletar
```

### Rooms (Salas)
```bash
GET    /lives/rooms            # Listar salas
POST   /lives/rooms            # Criar sala
GET    /lives/rooms/:id        # Obter sala
POST   /lives/rooms/:roomId/lives/:liveId    # Adicionar live
DELETE /lives/rooms/:roomId/lives/:liveId   # Remover live
DELETE /lives/rooms/:id        # Deletar sala
```

## 🔐 Segurança

### Autenticação
- ✅ JWT com HMAC-SHA256
- ✅ Expiração: 24 horas
- ✅ Token storage seguro

### Senhas
- ✅ bcrypt com 10 rounds (~80-100ms)
- ✅ Nunca em plain text
- ✅ Unique constraint no email

### Proteção de Rotas
- ✅ JwtGuard em endpoints protegidos
- ✅ 403 Forbidden sem autenticação
- ✅ Validação de autorização

---

## 🐛 Troubleshooting

### ❌ "Cannot POST /auth/register"
**Solução:**
```bash
docker-compose restart multi_lives_backend
# ou
docker-compose down && docker-compose up --build
```

### ❌ "403 Forbidden"
**Solução:**
```bash
# Verificar header:
Authorization: Bearer <seu_token_jwt>

# Token pode estar expirado (válido por 24h)
```

### ❌ "Email already exists"
**Solução:**
```bash
# Use outro email
# Ou limpe o banco:
docker-compose down -v
docker-compose up --build
```

### ❌ "Cannot connect to database"
**Solução:**
```bash
# Aguarde 10-15 segundos pro PostgreSQL iniciar
docker-compose logs postgres
```

---

## 📚 Documentação Completa

### Guias Disponíveis
| Arquivo | Descrição |
|---------|-----------|
| [GUIA_PRATICO_USO.md](GUIA_PRATICO_USO.md) | 10 exemplos práticos de uso |
| [STEP_4_FLUXO_COMPLETO.md](STEP_4_FLUXO_COMPLETO.md) | Fluxos de autenticação e operações |
| [STEP_5_RELATORIO_FINAL.md](STEP_5_RELATORIO_FINAL.md) | Análise de performance |
| [PROJETO_COMPLETO.md](PROJETO_COMPLETO.md) | Visão técnica completa |

---

## 🎯 Roadmap

- [ ] WebSockets para tempo real
- [ ] Chat durante live
- [ ] Notificações push
- [ ] Mobile app (React Native)
- [ ] Dashboard de analytics

---

## 🤝 Contribuindo

Fork → Feature Branch → Commit → Push → Pull Request

---

## 📄 Licença

MIT License

---

## 👨‍💻 Autor

**Dreyk Allanyoko** - [@dreyk5454](https://github.com/dreyk5454)

**Desenvolvido com ❤️ para múltiplas transmissões** 🚀
