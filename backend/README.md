# Multi Lives - README Backend

## 🎯 Sobre

Backend da plataforma Multi Lives desenvolvido com **NestJS**, **PostgreSQL**, **Redis** e **JWT**.

## 🚀 Início Rápido

### Instalação

```bash
npm install
```

### Configurar Variáveis de Ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

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
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=24h
```

### Executar

**Desenvolvimento:**
```bash
npm run start:dev
```

**Produção:**
```bash
npm run build
npm run start:prod
```

## 📁 Estrutura

```
src/
├── auth/              # Autenticação e JWT
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.guard.ts
│   └── dto/
├── users/             # Gerenciamento de usuários
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   ├── entities/user.entity.ts
│   └── dto/
├── lives/             # Gerenciamento de lives e salas
│   ├── lives.controller.ts
│   ├── lives.service.ts
│   ├── lives.module.ts
│   ├── entities/
│   │   ├── live.entity.ts
│   │   └── room.entity.ts
│   └── dto/
├── redis/             # Integração Redis
│   ├── redis.service.ts
│   └── redis.module.ts
├── app.module.ts
└── main.ts
```

## 🔐 Autenticação

### JWT Guard

O `JwtGuard` protege rotas. Use assim:

```typescript
@UseGuards(JwtGuard)
@Get('protected')
protectedRoute() {
  return { message: 'Protected data' };
}
```

## 📚 DTOs

### CreateUserDto
```typescript
{
  email: string;
  username: string;
  password: string;
  avatar?: string;
}
```

### CreateLiveDto
```typescript
{
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
  creatorId: string;
}
```

### CreateRoomDto
```typescript
{
  name: string;
  description?: string;
  creatorId: string;
}
```

## 🔄 Endpoints

Todos os endpoints estão documentados no README principal.

## 🧪 Testes

```bash
npm run test
npm run test:watch
npm run test:cov
```

## 📦 build

```bash
npm run build
```

A aplicação compilada estará em `dist/`.

## 🐳 Docker

```bash
docker build -t multi-lives-backend .
docker run -p 3000:3000 multi-lives-backend
```

## 🛠️ Scripts

- `npm run dev` - Desenvolvimento com watch
- `npm run build` - Build para produção
- `npm run start` - Inicia o servidor
- `npm run lint` - Lint + fix
- `npm run test` - Testes
