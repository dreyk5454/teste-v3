#!/usr/bin/env python3
import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:3000"

def log(msg):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}")

# Passo 1: Registrar e obter token
log("1️⃣ Registrando usuário...")
import uuid
random_email = f"test_{uuid.uuid4().hex[:8]}@example.com"

register_data = {
    "email": random_email,
    "username": "testuser",
    "password": "Pass123!@"
}

response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
register_response = response.json()
token = register_response.get('access_token')
user_id = register_response.get('user', {}).get('id')

log(f"✅ Usuário registrado: {user_id}")

# Passo 2: Criar uma live
log("\n2️⃣ Criando uma live...")

live_data = {
    "title": "Live de Teste Visível",
    "description": "Uma live que deve aparecer",
    "url": "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    "thumbnail": "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
    "creatorId": user_id
}

headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

response = requests.post(f"{BASE_URL}/lives", json=live_data, headers=headers)
log(f"Status: {response.status_code}")
live_response = response.json()
log(f"📺 Live criada:")
log(f"   ID: {live_response.get('id')}")
log(f"   Title: {live_response.get('title')}")
log(f"   isActive: {live_response.get('isActive')}")
log(f"   URL: {live_response.get('url')}")

# Passo 3: Listar TODAS as lives (com filtro)
log("\n3️⃣ Listando TODAS as lives (filtradas por isActive=true)...")
response = requests.get(f"{BASE_URL}/lives", headers=headers)
log(f"Status: {response.status_code}")
lives = response.json()
log(f"📝 Total de lives ativas: {len(lives)}")
for i, live in enumerate(lives):
    log(f"   {i+1}. {live.get('title')} (isActive={live.get('isActive')})")
    if live.get('title') == "Live de Teste Visível":
        log(f"      ✅ ENCONTRADA!")

# Passo 4: Verificar se a live foi realmente gravada no banco
log("\n4️⃣ Testando GET direto para a live criada...")
live_id = live_response.get('id')
response = requests.get(f"{BASE_URL}/lives/{live_id}", headers=headers)
log(f"Status: {response.status_code}")
log(f"Response: {json.dumps(response.json(), indent=2)}")
