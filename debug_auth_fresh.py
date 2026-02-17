#!/usr/bin/env python3
import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:3000"

def log(msg):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}")

# Usar email único
import uuid
random_email = f"test_{uuid.uuid4().hex[:8]}@example.com"

# Teste 1: Registrar novo usuário com email único
log("🔐 TESTE 1: Registrando novo usuário...")
register_data = {
    "email": random_email,
    "username": "testuser123",
    "password": "Pass123!@"  # 8 caracteres OK
}
log(f"📤 POST /auth/register com dados: email={register_data['email']}, username={register_data['username']}")
response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
log(f"📥 Status: {response.status_code}")
log(f"📥 Resposta: {json.dumps(response.json(), indent=2)}")

if response.status_code in [200, 201]:
    register_response = response.json()
    token = register_response.get('access_token')
    user = register_response.get('user')
    log(f"✅ Registro bem-sucedido!")
    log(f"   Email: {user.get('email')}")
    log(f"   Username: {user.get('username')}")
    log(f"   Token: {token[:30]}...")
    
    # Teste 2: Fazer login com as mesmas credenciais
    log("\n🔐 TESTE 2: Fazendo login com as mesmas credenciais...")
    login_data = {
        "email": random_email,
        "password": "Pass123!@"
    }
    log(f"📤 POST /auth/login com dados: email={login_data['email']}")
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    log(f"📥 Status: {response.status_code}")
    log(f"📥 Resposta: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code in [200, 201]:
        log("✅ Login bem-sucedido!")
    else:
        log(f"❌ Login falhou com status {response.status_code}")

    # Teste 3: Tentar login com senha errada
    log("\n🔐 TESTE 3: Tentando login com senha incorreta...")
    login_data = {
        "email": random_email,
        "password": "WrongPassword"
    }
    log(f"📤 POST /auth/login com senha incorreta")
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    log(f"📥 Status: {response.status_code}")
    log(f"📥 Resposta: {json.dumps(response.json(), indent=2)}")
    
    if response.status_code != 201:
        log("✅ Corretamente rejeitou senha incorreta!")
else:
    log(f"❌ Registro falhou! Erro: {response.json()}")
