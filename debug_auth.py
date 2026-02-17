#!/usr/bin/env python3
import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:3000"

def log(msg):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}")

# Teste 1: Registrar novo usuário
log("🔐 TESTE 1: Registrando novo usuário...")
register_data = {
    "email": "test@example.com",
    "username": "testuser",
    "password": "Pass123!@"
}
log(f"📤 POST /auth/register com dados: {register_data}")
response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
log(f"📥 Status: {response.status_code}")
log(f"📥 Resposta: {json.dumps(response.json(), indent=2)}")

if response.status_code in [200, 201]:
    register_response = response.json()
    token = register_response.get('access_token')
    log(f"✅ Registro bem-sucedido! Token: {token[:20]}...")
    
    # Teste 2: Fazer login com as mesmas credenciais
    log("\n🔐 TESTE 2: Fazendo login com as mesmas credenciais...")
    login_data = {
        "email": "test@example.com",
        "password": "Pass123!@"
    }
    log(f"📤 POST /auth/login com dados: {login_data}")
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    log(f"📥 Status: {response.status_code}")
    log(f"📥 Resposta: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code in [200, 201]:
        log("✅ Login bem-sucedido!")
    else:
        log(f"❌ Login falhou com status {response.status_code}")
else:
    log(f"❌ Registro falhou! Erro: {response.json()}")

# Teste 3: Verificar usuários no banco
log("\n🔐 TESTE 3: Listando todos os usuários...")
response = requests.get(f"{BASE_URL}/users")
log(f"📥 Status: {response.status_code}")
if response.status_code == 200:
    users = response.json()
    log(f"📝 Total de usuários: {len(users)}")
    for user in users:
        log(f"  - {user.get('email')} ({user.get('username')})")
