#!/usr/bin/env python3
import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:3000"

def log(msg):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}")

# Passo 1: Registrar e obter token
log("1️⃣ Registrando usuário e obtendo token...")
import uuid
random_email = f"test_{uuid.uuid4().hex[:8]}@example.com"

register_data = {
    "email": random_email,
    "username": "testuser",
    "password": "Pass123!@"
}

response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
if response.status_code not in [200, 201]:
    log(f"❌ Falha no registro: {response.json()}")
    exit(1)

register_response = response.json()
token = register_response.get('access_token')
user_id = register_response.get('user', {}).get('id')

log(f"✅ Usuário registrado!")
log(f"   Token: {token[:30]}...")
log(f"   User ID: {user_id}")

# Passo 2: Criar uma live
log("\n2️⃣ Criando uma live...")

live_data = {
    "title": "Minha Primeira Live",
    "description": "Uma live de teste",
    "url": "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    "thumbnail": "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
    "creatorId": user_id
}

headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

log(f"📤 POST /lives com dados:")
log(f"   Title: {live_data['title']}")
log(f"   URL: {live_data['url']}")
log(f"   CreatorId: {user_id}")

response = requests.post(f"{BASE_URL}/lives", json=live_data, headers=headers)
log(f"📥 Status: {response.status_code}")
log(f"📥 Resposta: {json.dumps(response.json(), indent=2)}")

if response.status_code in [200, 201]:
    log("✅ Live criada com sucesso!")
else:
    log(f"❌ Falha ao criar live")

# Passo 3: Listar LiveS
log("\n3️⃣ Listando lives criadas...")
response = requests.get(f"{BASE_URL}/lives", headers=headers)
log(f"📥 Status: {response.status_code}")
lives = response.json()
log(f"📝 Total de lives: {len(lives)}")
for live in lives:
    log(f"   - {live.get('title')} ({live.get('url')})")
