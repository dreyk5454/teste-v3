# 🚀 Quick Start - Multi Lives

## ⚡ Iníciar em 5 minutos

### Com Docker (Recomendado)
```bash
cd "testes 3v"
docker-compose up --build
```

Pronto! Acesse:
- **Frontend**: http://localhost:3001
- **Backend**: http://localhost:3000

### Sem Docker

**Backend:**
```bash
cd backend
npm install
npm run start:dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 🎯 Primeiro Uso

1. **Cadastro**: Crie uma conta com email, username e senha
2. **Login**: Faça login
3. **Nova Live**: Clique em "🔴 Nova Live" e adicione uma URL
4. **Nova Sala**: Clique em "+ Nova Sala"
5. **Assistir**: Selecione a sala e adicione lives!

---

## 📌 Urls de Teste

```
YouTube:  https://www.youtube.com/watch?v=jNgP6d9HraI
Twitch:   https://www.twitch.tv/twitch
```

---

## 🛠️ Troubleshoot Rápido

| Problema | Solução |
|----------|---------|
| "Não conecta ao banco" | `docker-compose down && docker-compose up` |
| "CORS Error" | Verifique `NEXT_PUBLIC_API_URL` |
| "Página em branco" | F12 > Console > verifique erros |
| "Live não carrega" | URL deve ser válida |

---

## 📂 Estrutura

```
testes 3v/
├── backend/          # NestJS API
├── frontend/         # Next.js UI
├── docker-compose.yml
└── README.md
```

---

## 🎬 Pronto para começar!

Para mais detalhes, veja o [SETUP.md](./SETUP.md) completo.
