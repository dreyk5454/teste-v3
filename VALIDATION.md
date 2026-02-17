# ✅ Validação de Instalação - Multi Lives

## 🔍 Verificar Tudo Está Funcionando

Execute este checklist após iniciar o projeto:

---

## 🐳 1. Docker & Containers

### ✅ Verificar Containers Rodando
```bash
docker-compose ps
```

Saída esperada:
```
NAME                    SERVICE      STATUS
multi_lives_postgres    postgres     Up (healthy)
multi_lives_redis       redis        Up (healthy)
multi_lives_backend     backend      Up
multi_lives_frontend    frontend     Up
```

### ✅ Verificar Volumes
```bash
docker volume ls | grep multi
```

---

## 🗄️ 2. PostgreSQL

### �� Conectar ao Banco
```bash
docker-compose exec postgres psql -U postgres -d multi_lives
```

### ✅ Verificar Tabelas
```sql
\dt
```

Saída esperada:
```
           List of relations
 Schema | Name  | Type  | Owner
────────┼───────┼───────┼─────
 public | users | table | postgres
 public | lives | table | postgres
 public | rooms | table | postgres
(3 rows)
```

### ✅ Verificar Dados

```sql
-- Ver usuários
SELECT * FROM users;

-- Ver lives
SELECT * FROM lives;

-- Ver rooms
SELECT * FROM rooms;

-- Sair
\q
```

---

## ⚡ 3. Redis

### ✅ Conectar ao Redis
```bash
docker-compose exec redis redis-cli
```

### ✅ Verificar Status
```
PING
```

Saída esperada: `PONG`

### ✅ Listar Keys
```
KEYS *
```

### ✅ Ver Valores
```
GET live:*
HGETALL room:*
```

### ✅ Sair
```
EXIT
```

---

## 🔌 4. Backend API

### ✅ Health Check
```bash
curl http://localhost:3000/health
```

Saída esperada:
```json
{
  "status": "ok",
  "timestamp": "2024-02-16T10:30:45.123Z",
  "uptime": 120.456
}
```

### ✅ Verificar Logs
```bash
docker-compose logs backend | tail -20
```

Saída esperada:
```
[NestFactory] Starting Nest application...
...
[InstanceLoader] AppModule dependencies initialized
Application is running on: http://localhost:3000
```

### ✅ Testar Endpoints

**Registrar Usuário:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "Test123456!"
  }'
```

Saída esperada:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid-xxx",
    "email": "test@example.com",
    "username": "testuser"
  }
}
```

**Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456!"
  }'
```

**Listar Lives:**
```bash
curl http://localhost:3000/lives
```

Saída esperada: `[]` (array vazio no início)

---

## 🎨 5. Frontend

### ✅ Acessar Frontend
```
http://localhost:3001
```

Verificar:
- [ ] Página carrega sem erros
- [ ] Ver página de login/registro
- [ ] Console do browser vazio (sem erros)

### ✅ Testar Frontend

**Registro:**
1. Clique em "Cadastro"
2. Preencha:
   - Email: `test@example.com`
   - Username: `testuser`
   - Senha: `Test123456!`
3. Clique "Cadastro"
4. Deve redirecionar para dashboard

**Login:**
1. Use credenciais do registro acima
2. Clique "Login"
3. Deve aparecer navbar com "Bem-vindo, testuser!"

**Criar Live:**
1. Clique "🔴 Nova Live"
2. Preencha:
   - Título: "Test Stream"
   - URL: `https://www.youtube.com/watch?v=jNgP6d9HraI`
   - Descrição: "Test"
3. Clique "Criar"
4. Deve aparecer toast "Live criada com sucesso!"

**Criar Sala:**
1. Clique "+ Nova Sala"
2. Preencha:
   - Nome: "Test Room"
   - Descrição: "Test"
3. Clique "Criar"
4. Deve aparecer em "🎬 Salas"

**Adicionar Live à Sala:**
1. Clique em sala criada
2. Clique em live criada
3. Deve aparecer toast "Live adicionada à sala!"
4. Deve ir para aba "Assistindo"

---

## 🔐 6. Autenticação

### ✅ JWT Token

**Obter token:**
```bash
TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123456!"}' \
  | jq -r '.access_token')

echo $TOKEN
```

**Usar token em requisição protegida:**
```bash
curl http://localhost:3000/lives \
  -H "Authorization: Bearer $TOKEN"
```

### ✅ Proteção de Rotas

**Tentar acessar sem token (deve falhar):**
```bash
curl -X POST http://localhost:3000/lives \
  -H "Content-Type: application/json" \
  -d '{"title":"Test"}'
```

Saída esperada: 401 Unauthorized

---

## 📊 7. Performance

### ✅ Tempos de Resposta

```bash
# Medir tempo de resposta
time curl http://localhost:3000/lives
```

Esperado: < 200ms

### ✅ Cache Redis

```bash
# Primeira requisição (sem cache)
time curl http://localhost:3000/lives/uuid

# Segunda requisição (com cache)
time curl http://localhost:3000/lives/uuid
```

Segunda deve ser mais rápida!

---

## 🧪 8. Validação de Dados

### ✅ Validação de Entrada

**Email inválido (deve falhar):**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid","username":"test","password":"123"}'
```

Saída esperada: 400 Bad Request

**Senha muito curta (deve falhar):**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","username":"test","password":"123"}'
```

Saída esperada: 400 Bad Request (password < 6 chars)

---

## 📝 9. Logs e Debugging

### ✅ Ver Logs Backend
```bash
docker-compose logs -f backend
```

### ✅ Ver Logs Frontend
```bash
docker-compose logs -f frontend
```

### ✅ Ver Logs PostgreSQL
```bash
docker-compose logs -f postgres
```

### ✅ Ver Logs Redis
```bash
docker-compose logs -f redis
```

---

## 🔄 10. Full Test Flow

### ✅ Fazer Tudo do Zero

```
1. ✅ Registrar novo usuário
2. ✅ Fazer login
3. ✅ Criar live com URL válida
4. ✅ Criar sala
5. ✅ Adicionar live à sala
6. ✅ Visualizar múltiplas lives
7. ✅ Remover live da sala
8. ✅ Deletar sala
9. ✅ Fazer logout
10. ✅ Tentar acessar protegido (deve falhar)
```

---

## 📋 Checklist Final

- [ ] Docker containers rodando
- [ ] PostgreSQL saudável
- [ ] Redis saudável
- [ ] Backend responde (health check)
- [ ] Frontend carrega
- [ ] Pode registrar novo usuário
- [ ] Pode fazer login
- [ ] Pode criar live
- [ ] Pode criar sala
- [ ] Pode adicionar live a sala
- [ ] Pode assistir múltiplas lives
- [ ] Toasts funcionam
- [ ] Logout funciona
- [ ] Sem erros no console
- [ ] Tempo de resposta < 200ms

---

## ✅ Tudo Funcionando!

Se todos os testes acima passaram, seu projeto está **100% funcionando!** 🎉

---

## 🆘 Se Algo Não Funcionou

### Problema: Containers não iniciam
```bash
docker-compose logs
# Verifique erros
docker-compose down
docker-compose up --build
```

### Problema: Banco não conecta
```bash
docker-compose restart postgres
docker-compose logs postgres
```

### Problema: Frontend vazio
```bash
# Abra F12 (DevTools)
# Console → procure por erros
# Verifique NEXT_PUBLIC_API_URL
```

### Problema: API não responde
```bash
docker-compose logs backend
# Verifique erros
# Restart: docker-compose restart backend
```

---

**Parabéns! Seu Multi Lives está funcionando perfeitamente! 🚀**

Para mais ajuda, veja [SETUP.md](./SETUP.md)
