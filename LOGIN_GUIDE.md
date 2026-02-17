# 🔐 Login Funcionando!

## ✅ Como Testar no Frontend

### Passo-a-passo:

1. **Acesse**: http://localhost:3001

2. **PRIMEIRO: Registre-se**
   - Email: `seu-email@example.com` (use um email novo)
   - Username: `seu_username`
   - Senha: `Pass123!@` (mínimo 6 caracteres)
   - Clique em "Registrar"

3. **ENTÃO: Faça Login**
   - Email: `seu-email@example.com` (mesmo do registro)
   - Senha: `Pass123!@` (mesma do registro)
   - Clique em "Login"

## ❌ Por que pode dar 401 (Unauthorized)?

1. ❌ **Usuário não existe** → Registre-se primeiro
2. ❌ **Senha errada** → Use exatamente a senha que registrou
3. ❌ **Senha muito curta** → Mínimo 6 caracteres
4. ❌ **Email inválido** → Use um email válido

## ✅ Status da API

- Backend: http://localhost:3000 ✅
- Frontend: http://localhost:3001 ✅
- PostgreSQL: Conectado ✅
- Redis: Conectado ✅

## 🧪 Testar via Terminal (curl/Python)

### Registrar
```bash
python -c "import requests; r = requests.post('http://localhost:3000/auth/register', json={'email': 'teste@ex.com', 'username': 'testuser', 'password': 'Pass123!@'}); print(r.json())"
```

### Login
```bash
python -c "import requests; r = requests.post('http://localhost:3000/auth/login', json={'email': 'teste@ex.com', 'password': 'Pass123!@'}); print(r.json())"
```

## 📋 Exemplo de Credenciais Válidas

| Campo | Valor |
|-------|-------|
| Email | usuario@example.com |
| Username | usuario123 |
| Senha | Pass123!@ |

Tente registrar com essas credenciais e depois fazer login!
