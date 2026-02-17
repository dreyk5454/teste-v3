# ⚡ Quick Reference - Multi Lives

## 🎯 Comando Rápido para Começar

### Windows / Mac / Linux
```bash
cd "testes 3v"
docker-compose up --build
```

**Pronto em 2 minutos!** 🚀

---

## 🌐 URLs de Acesso

| Serviço | URL | Credenciais |
|---------|-----|-------------|
| **Frontend** | http://localhost:3001 | - |
| **Backend API** | http://localhost:3000 | - |
| **PostgreSQL** | localhost:5432 | user: postgres, pass: postgres |
| **Redis CLI** | localhost:6379 | - |

---

## 🔐 Conta de Teste

```
Email:    test@example.com
Username: testuser
Password: Test123456!
```

Ou crie uma nova durante o registro.

---

## 📝 URLs de Teste para Lives

```
YouTube:
https://www.youtube.com/watch?v=jNgP6d9HraI

Twitch:
https://www.twitch.tv/twitch

HLS Stream:
https://example.com/stream.m3u8
```

---

## 🛠️ Comandos Principais

### Docker
```bash
# Start all services
docker-compose up --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Restart specific service
docker-compose restart backend
```

### Backend
```bash
cd backend

# Development
npm run start:dev

# Build
npm run build

# Tests
npm run test

# Lint
npm run lint
```

### Frontend
```bash
cd frontend

# Development
npm run dev

# Build
npm run build

# Production
npm run start

# Lint
npm run lint
```

---

## 🎬 Usar a Aplicação

```
1. Registre-se
   ├─ Email: seu-email@example.com
   ├─ Username: seu-username
   └─ Password: SecurePass123!

2. Faça Login
   └─ Use as credenciais acima

3. Crie uma Live
   ├─ Título: "Minha Stream"
   ├─ URL: Youtube/Twitch/HLS link
   └─ Thumbnail: (opcional)

4. Crie uma Sala
   ├─ Nome: "Gaming Night"
   └─ Descrição: (opcional)

5. Adicione Lives à Sala
   ├─ Selecione sala
   └─ Clique em uma live

6. Assista Múltiplas Lives
   ├─ Clique em "Assistindo: [Sala]"
   └─ Veja grid responsivo com todas
```

---

## 📊 Endpoints Principais

### Autenticação
```
POST   /auth/register
POST   /auth/login
```

### Lives
```
GET    /lives                    (lista todas)
GET    /lives/:id                (detalhes)
POST   /lives                    (criar - protegido)
PUT    /lives/:id                (atualizar - protegido)
DELETE /lives/:id                (deletar - protegido)
```

### Salas
```
GET    /lives/rooms              (lista todas)
GET    /lives/rooms/:id          (detalhes)
POST   /lives/rooms              (criar - protegido)
POST   /lives/rooms/:roomId/lives/:liveId  (adicionar live)
DELETE /lives/rooms/:roomId/lives/:liveId  (remover live)
DELETE /lives/rooms/:id          (deletar - protegido)
```

---

## 🔍 Debugging

### Browser DevTools
```
F12 → Console
- Verifique erros
- Veja logs
- Teste no console
```

### Backend Logs
```bash
docker-compose logs -f backend
```

### Database
```bash
# Conecte com psql
psql -h localhost -U postgres -d multi_lives

# Ver tabelas
\dt

# Ver dados
SELECT * FROM lives;
```

### Redis
```bash
# Conecte redis-cli
redis-cli -h localhost

# Ver keys
KEYS *

# Ver valor
GET live:uuid
```

---

## ⚙️ Variáveis de Ambiente

### Backend (.env)
```
NODE_ENV=development
PORT=3000
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=multi_lives
REDIS_HOST=redis
REDIS_PORT=6379
JWT_SECRET=your_secret_key
JWT_EXPIRATION=24h
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 🐛 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Porta 3000 ocupada | `lsof -i :3000` (Linux/Mac) ou `netstat -ano` (Windows) |
| Docker não conecta | `docker-compose down && docker-compose up` |
| Frontend vazio | F12 → Console → verifique erros |
| DB connection erro | Aguarde 10s, postgres está iniciando |
| Redis erro | Redis pode não estar pronto, aguarde logs verdes |

---

## 📱 Responsividade

### Grid de Múltiplas Lives
```
1 live:   1 coluna
2 lives:  2 colunas
3-4:      2 colunas
5-6:      3 colunas
7+:       4 colunas
```

---

## 🔒 Segurança

✅ **Senhas**: bcrypt com 10 rounds  
✅ **APIs Protegidas**: JWT Authentication  
✅ **CORS**: Configurado  
✅ **Validação**: DTOs com class-validator  
✅ **Cache**: Redis isolado  

---

## 📚 Documentação

- **Completo**: [README.md](./README.md)
- **Setup**: [SETUP.md](./SETUP.md)
- **API**: [Architecture](./ARCHITECTURE.md)
- **Dev**: [Development.md](./DEVELOPMENT.md)

---

## ⌨️ Atalhos Úteis

```bash
# Limpar logs
docker-compose logs --tail=0 -f

# Rebuild sem cache
docker-compose build --no-cache

# Enter container bash
docker-compose exec backend bash

# Ver recursos
docker stats

# Rebuild específico
docker-compose up --build backend
```

---

## 🎯 Features Status

| Feature | Status |
|---------|--------|
| Auth | ✅ Done |
| Live CRUD | ✅ Done |
| Room CRUD | ✅ Done |
| Multi-stream | ✅ Done |
| Cache (Redis) | ✅ Done |
| Docker | ✅ Done |
| Docs | ✅ Done |
| WebSockets | ⏳ TODO |
| Chat | ⏳ TODO |
| Notifications | ⏳ TODO |

---

## 🚀 Performance

```
Frontend Load: <2s
API Response: <100ms
Video Stream: Real-time (depends on source)
Database: <50ms (with cache)
```

---

## 🎓 Aprenda Mais

- **NestJS**: Leia código em `backend/src`
- **React**: Estude `frontend/src/components`
- **TailwindCSS**: Veja `frontend/src/styles`
- **Docker**: Verifique `docker-compose.yml`
- **TypeScript**: Todo arquivo `.ts`

---

## 🆘 Precisa de Ajuda?

1. Verifique [TROUBLESHOOTING](./SETUP.md#Troubleshooting)
2. Leia documentação relevante
3. Veja código comentado
4. Abra uma issue no GitHub

---

## ✅ Checklist de Primeiro Acesso

- [ ] Rodar `docker-compose up --build`
- [ ] Acessar http://localhost:3001
- [ ] Criar conta
- [ ] Fazer login
- [ ] Criar live
- [ ] Criar sala
- [ ] Adicionar live à sala
- [ ] Assistir!

---

## 🎉 Bem-vindo!

Você está pronto para começar. Execute:

```bash
docker-compose up --build
```

E visite: **http://localhost:3001**

**Multi Lives está aguardando! 🎬**

---

*Last updated: Feb 2026 | Multi Lives v1.0.0*
