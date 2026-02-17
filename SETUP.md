# 🚀 Guia de Setup - Multi Lives

## Opção 1: Docker Compose (Recomendado)

### Pré-requisitos
- Docker (versão 20.10+)
- Docker Compose (versão 1.29+)

### Passos

1. **Na raiz do projeto**:
```bash
cd "testes 3v"
docker-compose up --build
```

2. **Aguarde todos os serviços iniciarem**:
   - PostgreSQL ✅
   - Redis ✅
   - Backend NestJS ✅
   - Frontend Next.js ✅

3. **Acesse**:
   - Frontend: http://localhost:3001
   - Backend: http://localhost:3000
   - Banco de Dados: localhost:5432 (postgres/postgres)
   - Redis: localhost:6379

4. **Parar os serviços**:
```bash
docker-compose down
```

### Logs em Tempo Real
```bash
docker-compose logs -f
```

---

## Opção 2: Instalação Local

### Pré-requisitos
- Node.js 18+
- PostgreSQL 15+
- Redis 7+

### Backend Setup

1. **Instale PostgreSQL e Redis** (ou execute os serviços em Docker):
```bash
docker run -d --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:15
docker run -d --name redis -p 6379:6379 redis:7
```

2. **Configure o Backend**:
```bash
cd backend
cp .env.example .env
```

3. **Edite `.env`** e configure as credenciais

4. **Instale dependências**:
```bash
npm install
```

5. **Inicie o servidor**:
```bash
npm run start:dev
```

Backend rodando em: http://localhost:3000

### Frontend Setup

1. **Configure o Frontend**:
```bash
cd frontend
```

2. **Instale dependências**:
```bash
npm install
```

3. **Crie `.env.local`**:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. **Inicie o servidor**:
```bash
npm run dev
```

Frontend rodando em: http://localhost:3000

---

## Primeiro Acesso

### 1. Criar Conta
- Clique em "Cadastro" (se estiver na tela de login)
- Preencha email, username e senha
- Clique em "Cadastro"

### 2. Fazer Login
- Use as credenciais criadas
- Clique em "Login"

### 3. Criar uma Live
- Clique em "🔴 Nova Live"
- Preencha:
  - **Título**: Nome da live
  - **Descrição**: Informações adicionais
  - **URL**: Link de transmissão (ex: https://www.youtube.com/watch?v=...)
  - **Thumbnail**: URL da imagem de capa (opcional)
- Clique em "Criar"

### 4. Criar uma Sala
- Clique em "+ Nova Sala"
- Preencha:
  - **Nome da sala**: Nome descritivo
  - **Descrição**: Informações adicionais (opcional)
- Clique em "Criar"

### 5. Adicionar Lives à Sala
- Selecione uma sala em "🎬 Salas"
- Clique em uma live em "🔴 Lives Disponíveis"
- A live será adicionada à sala selecionada

### 6. Assistir Múltiplas Lives
- Com uma sala selecionada, clique na aba "👀 Assistindo"
- Todas as lives da sala serão exibidas em grid responsivo

---

## Exemplos de URLs de Lives

### YouTube
```
https://www.youtube.com/watch?v=VIDEO_ID
```

### Twitch
```
https://www.twitch.tv/CHANNEL_NAME
```

### HLS Stream
```
https://example.com/stream.m3u8
```

### RTMP
```
rtmp://example.com/live/stream
```

---

## Troubleshooting

### Erro: "Não consegue conectar ao banco"
✅ Solução:
- Verifique se PostgreSQL está rodando
- Aguarde 10 segundos após iniciar docker-compose
- Reinicie os serviços: `docker-compose down && docker-compose up`

### Erro: "CORS Error"
✅ Solução:
- Verifique se `NEXT_PUBLIC_API_URL` está correto
- Backend deve estar acessível em http://localhost:3000

### Erro: "vídeo não carrega"
✅ Solução:
- Verifique se a URL da live é válida
- O React Player suporta HLS, DASH, RTMP e HTTP

### Página em branco
✅ Solução:
- Abra Developer Tools (F12)
- Verifique console para erros
- Limpe cache: Ctrl+Shift+Del

### Live não aparece na sala
✅ Solução:
- Atualize a página
- Verifique se está autenticado
- Certifique-se que a live foi criada

---

## Comandos Úteis

### Docker
```bash
# Iniciar
docker-compose up

# Iniciar em background
docker-compose up -d

# Parar
docker-compose down

# Logs
docker-compose logs -f [service-name]

# Rebuild
docker-compose up --build
```

### Backend
```bash
# Dev mode
npm run start:dev

# Build
npm run build

# Produção
npm run start:prod

# Testes
npm run test

# Lint
npm run lint
```

### Frontend
```bash
# Dev mode
npm run dev

# Build
npm run build

# Produção
npm run start

# Lint
npm run lint
```

---

## Ambiente de Produção

### Backend
```bash
docker build -t multi-lives-backend ./backend
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_HOST=db.example.com \
  -e REDIS_HOST=redis.example.com \
  -e JWT_SECRET=your-secret-key \
  multi-lives-backend
```

### Frontend
```bash
docker build -t multi-lives-frontend ./frontend
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.example.com \
  multi-lives-frontend
```

---

## Documentação Adicional

- Backend: `/backend/README.md`
- Frontend: `/frontend/README.md`
- API: Veja endpoints no README principal

---

**Pronto para começar! 🎬**
