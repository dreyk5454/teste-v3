# 💡 MULTI LIVES - Guia Prático de Uso

## 🚀 Como Usar o Sistema

### 1️⃣ Iniciar a Aplicação

```bash
# Terminal 1: Iniciar infraestrutura
cd c:\Users\dreyk\Desktop\testes 3v
docker-compose up --build

# Aguardar mensagens:
# multi_lives_backend is starting...
# multi_lives_frontend is starting...
# (15-20 segundos)

# ✓ Backend listening on 3000
# ✓ Frontend available on 3001
```

### 2️⃣ Acessar a Interface

```
👤 Usuário (Frontend): http://localhost:3001
🖥️ Backend API: http://localhost:3000
🗄️ Database: localhost:5432
🔴 Cache: localhost:6379
```

---

## 📝 Exemplo 1: Registre-se e Faça Login

### Via Frontend (Interface Gráfica)
```
1. Acesse http://localhost:3001
2. Clique "Registrar"
3. Preencha:
   ├─ Email: seu.email@example.com
   ├─ Username: seu_username
   └─ Senha: Pass123!@
4. Clique "Registrar"
5. Agora pode fazer login
```

### Via API (curl/Postman)
```bash
# POST /auth/register
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "username": "meuusuario",
    "password": "Pass123!@"
  }'

# Resposta:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-aqui",
    "email": "usuario@example.com",
    "username": "meuusuario"
  }
}
```

---

## 📺 Exemplo 2: Criar uma Live

### Via Frontend
```
1. Após login, clique na aba "Lives"
2. Clique "Criar Live"
3. Preencha:
   ├─ Título: "Minha primeira live"
   ├─ URL: http://seu-stream.com/stream.m3u8
   ├─ Thumbnail: http://seu-site.com/thumb.jpg
   └─ Descrição: "Descrição da live"
4. Clique "Criar"
5. Live aparece no grid
```

### Via API
```bash
# POST /lives (requer autenticação)
TOKEN="seu_jwt_token_aqui"

curl -X POST http://localhost:3000/lives \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Minha primeira live",
    "url": "http://seu-stream.com/stream.m3u8",
    "thumbnail": "http://seu-site.com/thumb.jpg",
    "description": "Descrição da live",
    "creatorId": "seu-user-id"
  }'

# Resposta:
{
  "id": "live-uuid",
  "title": "Minha primeira live",
  "url": "http://seu-stream.com/stream.m3u8",
  "isActive": true,
  "viewers": 0,
  "creatorId": "seu-user-id",
  "createdAt": "2026-02-16T20:34:23.611Z"
}
```

---

## 🎬 Exemplo 3: Criar uma Sala e Adicionar Lives

### Via Frontend
```
1. Clique na aba "Rooms"
2. Clique "Criar Sala"
3. Preencha:
   ├─ Nome: "Minha sala de games"
   └─ Descrição: "Todos meus streamers favoritos"
4. Clique "Criar"
5. Sala aparece na lista
6. Clique em uma sala → aparecem lives disponíveis
7. Clique "Adicionar" em 2-4 lives
8. Clique em "Assistir" para ir para o player
9. 🎬 Veja as lives simultaneamente!
```

### Via API
```bash
# 1. Criar sala
TOKEN="seu_jwt_token"
USER_ID="seu-user-id"

curl -X POST http://localhost:3000/lives/rooms \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Minha sala de games",
    "description": "Todos meus streamers favoritos",
    "creatorId": "'$USER_ID'"
  }'

# Resposta:
{
  "id": "room-uuid",
  "name": "Minha sala de games",
  "description": "Todos meus streamers favoritos",
  "liveIds": [],
  "creatorId": "seu-user-id"
}

# 2. Adicionar live à sala
ROOM_ID="room-uuid-aqui"
LIVE_ID="live-uuid-aqui"

curl -X POST http://localhost:3000/lives/rooms/$ROOM_ID/lives/$LIVE_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'

# Resposta:
{
  "id": "room-uuid",
  "name": "Minha sala de games",
  "liveIds": ["live-uuid-1", "live-uuid-2"],
  "creatorId": "seu-user-id"
}
```

---

## 🧪 Exemplo 4: Executar Testes

### Teste Completo (6 validações)
```bash
cd c:\Users\dreyk\Desktop\testes 3v
python test_layers.py

# Saída esperada:
# ✓ Test 1: Health Check
# ✓ Test 2: Register User  
# ✓ Test 3: Cache Layer
# ✓ Test 4: JWT Validation
# ✓ Test 5: Create Live
# ✓ Test 6: Room Management
```

### Debug com Performance
```bash
python test_step5_debug.py

# Saída esperada:
# ✓ Autenticação: ~110ms
# ✓ Cache MISS: ~12ms
# ✓ Cache HIT: ~13ms
# ✓ Error handling: 403/404/409
# ✓ Statistical analysis: Consistente
```

### Análise de Logs
```bash
python test_step5_logs.py

# Monitora requisições em tempo real
# Mostra timings detalhados
# Valida cache performance
```

---

## 🔍 Exemplo 5: Verificar Status via Terminal

### Docker Status
```bash
# Ver todos os containers
docker ps --all

# Ver logs (todos os services)
docker-compose logs -f

# Ver logs específicos
docker logs -f multi_lives_backend
docker logs -f multi_lives_frontend
docker logs -f multi_lives_postgres
docker logs -f multi_lives_redis
```

### PostgreSQL Direct Access
```bash
# Conectar ao banco
psql -h localhost -U user -d multi_lives

# Ver usuários criados
SELECT id, email, username FROM "user";

# Ver lives
SELECT id, title, url, "isActive" FROM "live";

# Ver salas
SELECT id, name, "liveIds" FROM "room";
```

### Redis Direct Access
```bash
# Conectar ao Redis
docker exec -it multi_lives_redis redis-cli

# Ver todas as chaves
> KEYS *

# Ver conteúdo do cache
> GET lives:all
> GET room:uuid-aqui

# Limpar cache
> FLUSHALL
```

---

## 📊 Exemplo 6: Performance Testing

### Simular Múltiplas Requisições
```bash
# Teste com 100 requisições
for i in {1..100}; do
  curl -s http://localhost:3000/health > /dev/null
  echo "Request $i completed"
done
```

### Usando Apache Bench
```bash
# Instalar: apt-get install apache2-utils
# Teste 100 requisições com concorrência 10
ab -n 100 -c 10 http://localhost:3000/health
```

### Resultado esperado:
```
Requests per second: ~1000+
Min response time: 10ms
Max response time: 50ms
Mean response time: 20ms
```

---

## 🐛 Exemplo 7: Troubleshooting

### Erro: "Cannot POST /auth/register"
```
❌ Problema: Backend não está rodando
✅ Solução:
   1. docker-compose down
   2. docker-compose up --build
   3. Aguardar 15-20 segundos
   4. Tentar novamente
```

### Erro: "403 Forbidden"
```
❌ Problema: Token inválido ou ausente
✅ Solução:
   1. Verificar Authorization header
   2. Header deve ser: Authorization: Bearer <token>
   3. Token não pode estar expirado (24h)
   4. Verificar se token foi copiado completamente
```

### Erro: "409 Conflict - Email already exists"
```
❌ Problema: Email já registrado
✅ Solução:
   1. Use outro email
   2. Ou delete usuário anterior via PostgreSQL:
      DELETE FROM "user" WHERE email = 'seu@email.com';
   3. Ou limpar banco inteiro:
      docker-compose down -v
      docker-compose up --build
```

### Erro: "504 Gateway Timeout"
```
❌ Problema: Requisição muito lenta
✅ Solução:
   1. Verificar logs: docker-compose logs
   2. Aumentar timeout no cliente (requests timeout=10)
   3. Verificar performance: python test_step5_logs.py
   4. Se persistir: fazer restart dos containers
```

---

## 🔐 Exemplo 8: Segurança

### Testar Proteção de Rotas
```bash
# Teste 1: Sem token (deve dar 403)
curl -X GET http://localhost:3000/users
# Resposta: 403 Forbidden

# Teste 2: Com token (deve dar 200)
TOKEN="seu_jwt_token"
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer $TOKEN"
# Resposta: 200 OK

# Teste 3: Com token expirado (deve dar 403)
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer token_expirado"
# Resposta: 403 Unauthorized
```

### Verificar Password Hashing
```bash
# Conectar ao PostgreSQL
psql -h localhost -U user -d multi_lives

# Ver password hash (bcrypt)
SELECT email, password FROM "user" LIMIT 1;

# Resultado (exemplo):
# email          | password
# user@ex.com    | $2b$10$vrI3n5.EtLWLG0Dha0n.S.8tTdrOqJ7/uDX8kI.O.RkRZ49NsgrpC

# Esse é um hash bcrypt seguro com 10 rounds
```

---

## 📈 Exemplo 9: Monitoring & Analytics

### Coletar Métricas
```bash
# Executar script de análise
python test_step5_logs.py

# Saída mostra:
# - Tempo de autenticação
# - Performance de cache
# - Estatísticas de requisição
# - Análise de error handling
```

### Interpretar Resultados
```
Performance Excelente:
  ✓ Autenticação: < 200ms
  ✓ Requisição: < 50ms
  ✓ Cache MISS: < 100ms
  ✓ JWT validation: < 10ms

Performance Aceitável:
  ~ Autenticação: 200-500ms
  ~ Requisição: 50-100ms
  ~ Cache MISS: 100-500ms

Performance Ruim:
  ✗ Autenticação: > 500ms
  ✗ Requisição: > 100ms
  ✗ Cache MISS: > 500ms
```

---

## 🚀 Exemplo 10: Deploy para Produção

### Build Docker para Produção
```bash
# Build images otimizadas
docker-compose -f docker-compose.yml build --no-cache

# Verificar tamanho das images
docker images | grep testes3v

# Push para Docker Hub
docker tag testes3v-backend seu-username/backend:latest
docker push seu-username/backend:latest
```

### Deploy em Servidor
```bash
# No servidor remoto:
git clone seu-repo.git
cd seu-repo
docker-compose up -d

# Verificar logs
docker-compose logs -f

# Testar endpoints
curl http://seu-servidor.com/health
```

### Configurar HTTPS
```bash
# Instalar Let's Encrypt
certbot certonly --standalone -d seu-dominio.com

# Atualizar nginx/reverse proxy
# Apontar porta 443 → 3000 (backend)
# Apontar porta 443 → 3001 (frontend)

# Resultado:
# https://seu-dominio.com/ → Frontend
# https://seu-dominio.com/api/ → Backend
```

---

## 🎯 Checklist de Validação

Ao implementar Multi Lives em seu ambiente:

- [ ] Docker Compose iniciado (4/4 containers UP)
- [ ] Frontend acessível em http://localhost:3001
- [ ] Backend respondendo em http://localhost:3000/health
- [ ] PostgreSQL conectado (test_layers.py Test 2 ✓)
- [ ] Redis funcionando (test_layers.py Test 3 ✓)
- [ ] JWT protection ativo (test_layers.py Test 4 ✓)
- [ ] Pode registrar novo user
- [ ] Pode criar live
- [ ] Pode criar sala
- [ ] Pode adicionar live à sala
- [ ] Multi player renderiza 2+ vídeos
- [ ] Cache está funcionando (test_step5_logs.py mostra hit)
- [ ] Performance dentro do esperado (12-16ms)
- [ ] Testes 6/6 passando
- [ ] Documentação consultada

---

## 📚 Referência de Endpoints

### Autenticação
```
POST   /auth/register          - Registrar novo usuário
POST   /auth/login             - Fazer login (não implementado, use register + token)
GET    /health                 - Verificar saúde da API
```

### Usuários
```
GET    /users                  - Listar todos os usuários (com cache)
GET    /users/{id}            - Obter usuário específico
PATCH  /users/{id}            - Atualizar usuário
DELETE /users/{id}            - Deletar usuário
```

### Lives
```
GET    /lives                  - Listar todas as lives (com cache)
GET    /lives/{id}            - Obter live específica
POST   /lives                  - Criar nova live
PATCH  /lives/{id}            - Atualizar live
DELETE /lives/{id}            - Deletar live
```

### Salas
```
GET    /lives/rooms            - Listar todas as salas
GET    /lives/rooms/{id}      - Obter sala específica
POST   /lives/rooms            - Criar nova sala
PATCH  /lives/rooms/{id}      - Atualizar sala
DELETE /lives/rooms/{id}      - Deletar sala
POST   /lives/rooms/{roomId}/lives/{liveId}    - Adicionar live à sala
DELETE /lives/rooms/{roomId}/lives/{liveId}   - Remover live da sala
```

---

**Desenvolvido com ❤️ para tornar a experiência de assistir múltiplas lives simultâneas simples e agradável.**

