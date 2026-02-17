# Multi Lives 🎬

Uma plataforma para assistir **múltiplas lives simultaneamente** em tempo real. Perfeita para acompanhar vários streamers, eventos ou conteúdos diferentes ao mesmo tempo.

## 🎯 Características

- ✅ Visualização de múltiplas lives em grid responsivo
- ✅ Criação de salas personalizadas para organizar lives
- ✅ Autenticação segura com JWT
- ✅ Contador de espectadores em tempo real
- ✅ Interface moderna e responsiva
- ✅ Cache com Redis para melhor performance
- ✅ Banco de dados PostgreSQL
- ✅ Deploy com Docker

## 🏗️ Arquitetura

### Backend (NestJS)
- API RESTful robusta
- Autenticação com JWT
- Módulos: Auth, Users, Lives, Redis
- Entidades: User, Live, Room

### Frontend (Next.js + React)
- Interface moderna com TailwindCSS
- React Player para reprodução de vídeos
- Gerenciamento de estado com Zustand
- Toast notifications com react-hot-toast

### Infraestrutura
- **PostgreSQL**: Banco de dados relacional
- **Redis**: Cache e sessões
- **Docker**: Containerização da aplicação

## 🚀 Como Iniciar

### Pré-requisitos
- Docker e Docker Compose instalados
- Node.js 18+ (para desenvolvimento local)
- Git

### Instalação com Docker (Recomendado)

1. Clone o repositório:
```bash
cd "testes 3v"
```

2. Inicie os serviços:
```bash
docker-compose up --build
```

3. Acesse:
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

### Instalação Local

#### Backend

1. Configure o arquivo `.env`:
```bash
cd backend
cp .env.example .env
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor PostgreSQL e Redis (ou execute `docker-compose up postgres redis`)

4. Execute as migrations:
```bash
npm run typeorm migration:run
```

5. Inicie o servidor:
```bash
npm run start:dev
```

#### Frontend

1. Entre no diretório do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse http://localhost:3000

## 📁 Estrutura do Projeto

```
.
├── backend/                    # NestJS Backend
│   ├── src/
│   │   ├── auth/              # Autenticação e JWT
│   │   ├── users/             # Gerenciamento de usuários
│   │   ├── lives/             # Gerenciamento de lives e salas
│   │   ├── redis/             # Serviço Redis
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── frontend/                   # Next.js Frontend
│   ├── src/
│   │   ├── app/               # Páginas e layout
│   │   ├── components/        # Componentes React
│   │   ├── store/             # Zustand stores
│   │   ├── utils/             # API client e utilitários
│   │   └── styles/            # Estilos globais
│   ├── tailwind.config.js
│   ├── next.config.js
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml         # Configuração Docker Compose
└── README.md
```

## 📝 Endpoints da API

### Autenticação
- `POST /auth/register` - Criar nova conta
- `POST /auth/login` - Fazer login

### Users
- `GET /users` - Listar todos os usuários (requer autenticação)
- `POST /users` - Criar novo usuário

### Lives
- `GET /lives` - Listar todas as lives ativas
- `GET /lives/:id` - Obter detalhes de uma live
- `POST /lives` - Criar nova live (requer autenticação)
- `PUT /lives/:id` - Atualizar live (requer autenticação)
- `DELETE /lives/:id` - Deletar live (requer autenticação)

### Rooms (Salas)
- `GET /lives/rooms` - Listar todas as salas
- `GET /lives/rooms/:id` - Obter detalhes de uma sala
- `POST /lives/rooms` - Criar nova sala (requer autenticação)
- `POST /lives/rooms/:roomId/lives/:liveId` - Adicionar live à sala
- `DELETE /lives/rooms/:roomId/lives/:liveId` - Remover live da sala
- `DELETE /lives/rooms/:id` - Deletar sala (requer autenticação)

## 🔐 Autenticação

A API usa JWT (JSON Web Token) para autenticação. Para acessar endpoints protegidos:

1. Faça login: `POST /auth/login`
2. Receba o token: `{ "access_token": "..." }`
3. Adicione o header: `Authorization: Bearer <access_token>`

## 🛠️ Variáveis de Ambiente

### Backend (.env)
```
NODE_ENV=development
PORT=3000

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=multi_lives

REDIS_HOST=localhost
REDIS_PORT=6379

JWT_SECRET=seu-secret-aqui
JWT_EXPIRATION=24h
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🗄️ Modelo de Dados

### User
- id (UUID)
- email (unique)
- username
- password (hashed)
- avatar (optional)
- createdAt
- updatedAt

### Live
- id (UUID)
- title
- description
- url
- thumbnail (optional)
- isActive
- viewers
- creatorId
- createdAt
- updatedAt

### Room
- id (UUID)
- name
- description (optional)
- creatorId
- liveIds (array of UUIDs)
- viewers
- createdAt

## 📦 Dependências Principais

### Backend
- @nestjs/core
- @nestjs/jwt
- typeorm
- pg (PostgreSQL)
- redis
- class-validator

### Frontend
- next
- react
- react-player
- tailwindcss
- zustand
- axios
- react-hot-toast

## 🐛 Troubleshooting

### Docker não conecta ao banco
- Verifique se o PostgreSQL está rodando e saudável
- Aguarde alguns segundos e tente novamente

### Frontend não conecta à API
- Verifique se a variável `NEXT_PUBLIC_API_URL` está correta
- Certifique-se que o backend está rodando na porta 3000

### Erro ao criar live
- Verifique se está autenticado
- Certifique-se de que a URL da live é válida

## 🔄 Ciclo de Desenvolvimento

1. Crie uma conta ou faça login
2. Crie uma live com URL de transmissão
3. Crie uma sala
4. Adicione lives à sala
5. Comece a assistir!

## 🤝 Contribuindo

Sinta-se livre para abrir issues e pull requests com melhorias, correções de bugs e novas features.

## 📄 Licença

Este projeto está sob a licença UNLICENSED.

## 📧 Contato

Para dúvidas ou sugestões, entre em contato com o desenvolvedor.

---

**Desenvolvido com ❤️ para amantes de lives!**
