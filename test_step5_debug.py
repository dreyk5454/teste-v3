#!/usr/bin/env python3
"""
Step 5: Debug Detalhado de Conexões com Timing e Análise
Monitora cada requisição através de todas as camadas
"""

import requests
import json
import time
import tempfile
import os
from datetime import datetime
from statistics import mean, stdev

BASE_URL = "http://localhost:3000"
TEMP_DIR = tempfile.gettempdir()

# Cores para output
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def log_section(title):
    print(f"\n{Colors.HEADER}{Colors.BOLD}{'='*70}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{title:^70}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{'='*70}{Colors.ENDC}\n")

def log_success(msg):
    print(f"{Colors.OKGREEN}✓ {msg}{Colors.ENDC}")

def log_warning(msg):
    print(f"{Colors.WARNING}⚠ {msg}{Colors.ENDC}")

def log_error(msg):
    print(f"{Colors.FAIL}✗ {msg}{Colors.ENDC}")

def log_info(msg):
    print(f"{Colors.OKBLUE}ℹ {msg}{Colors.ENDC}")

def log_time(label, duration_ms):
    if duration_ms < 10:
        color = Colors.OKGREEN
        status = "🚀 RÁPIDO"
    elif duration_ms < 50:
        color = Colors.OKCYAN
        status = "✓ BOM"
    elif duration_ms < 100:
        color = Colors.WARNING
        status = "⚠ LENTO"
    else:
        color = Colors.FAIL
        status = "✗ MUITO LENTO"
    
    print(f"{color}{label}: {duration_ms:.2f}ms ({status}){Colors.ENDC}")

# ============================================================================
# TESTE 1: Performance de Autenticação
# ============================================================================
log_section("TESTE 1: Performance de Autenticação")

email = f"teste.{int(time.time())}@example.com"
token = None
user_id = None

print("📝 Registrando novo usuário...")
print(f"Email: {email}")

start = time.time()
response = requests.post(
    f"{BASE_URL}/auth/register",
    json={
        "email": email,
        "username": "debuguser",
        "password": "Pass123!@"
    },
    timeout=5
)
duration = (time.time() - start) * 1000

print(f"Status: {response.status_code}")
log_time("Tempo de autenticação", duration)

if response.status_code == 201:
    result = response.json()
    token = result.get('access_token')
    user = result.get('user')
    user_id = user.get('id')
    
    log_success(f"Usuário criado: {user_id}")
    log_success(f"JWT token gerado: {token[:30]}...")
    
    # Salvar para próximos testes
    token_file = os.path.join(TEMP_DIR, 'auth_token.txt')
    user_id_file = os.path.join(TEMP_DIR, 'user_id.txt')
    with open(token_file, 'w') as f:
        f.write(token)
    with open(user_id_file, 'w') as f:
        f.write(user_id)
else:
    log_error(f"Falha na autenticação: {response.text}")
    exit(1)

# ============================================================================
# TESTE 2: Análise de Cache MISS vs HIT
# ============================================================================
log_section("TESTE 2: Análise de Cache - MISS vs HIT")

if not token:
    log_error("Token não disponível, skip teste 2")
else:
    headers = {"Authorization": f"Bearer {token}"}
    
    # ======= CACHE MISS =======
    print("📝 Primeira requisição (CACHE MISS - Database Query)")
    print("Endpoint: GET /users\n")
    
    start = time.time()
    response1 = requests.get(f"{BASE_URL}/users", headers=headers, timeout=5)
    time_miss = (time.time() - start) * 1000
    
    print(f"Status: {response1.status_code}")
    data1 = response1.json()
    print(f"Registros retornados: {len(data1)}")
    if data1:
        print(f"Primeiro registro: {data1[0].get('email', 'N/A')}")
    
    log_time("Latência (MISS)", time_miss)
    print(f"└─ Incluí: network + database query + JSON serialization")
    
    # ======= CACHE HIT =======
    print("\n🚀 Segunda requisição (CACHE HIT - Redis Cache)")
    time.sleep(0.5)  # Aguardar antes de próxima requisição
    
    start = time.time()
    response2 = requests.get(f"{BASE_URL}/users", headers=headers, timeout=5)
    time_hit = (time.time() - start) * 1000
    
    print(f"Status: {response2.status_code}")
    data2 = response2.json()
    print(f"Registros retornados: {len(data2)}")
    
    log_time("Latência (HIT)", time_hit)
    print(f"└─ Incluí: network + Redis GET + JSON parsing")
    
    # ======= COMPARAÇÃO =======
    print(f"\n📊 COMPARAÇÃO:")
    speedup = time_miss / time_hit
    improvement = ((time_miss - time_hit) / time_miss) * 100
    
    print(f"{Colors.OKGREEN}Cache MISS: {time_miss:.2f}ms{Colors.ENDC}")
    print(f"{Colors.OKBLUE}Cache HIT:  {time_hit:.2f}ms{Colors.ENDC}")
    print(f"{Colors.OKCYAN}Speedup: {speedup:.1f}x mais rápido{Colors.ENDC}")
    print(f"{Colors.OKCYAN}Melhoria: {improvement:.1f}% redução{Colors.ENDC}")
    
    if speedup > 5:
        log_success("Cache performance excelente!")
    else:
        log_warning("Cache performance poderia ser melhor")

# ============================================================================
# TESTE 3: Error Handling & Edge Cases
# ============================================================================
log_section("TESTE 3: Error Handling & Edge Cases")

test_cases = [
    {
        "name": "Requisição SEM autenticação",
        "endpoint": "/users",
        "headers": {},
        "expected_status": 403,
        "expected_msg": "Forbidden"
    },
    {
        "name": "Token inválido",
        "endpoint": "/users",
        "headers": {"Authorization": "Bearer invalid_token_xyz"},
        "expected_status": 403,
        "expected_msg": "Unauthorized"
    },
    {
        "name": "Email duplicado na criação",
        "endpoint": "/auth/register",
        "method": "POST",
        "data": {
            "email": email,  # Email já existe
            "username": "outro",
            "password": "Pass123!@"
        },
        "headers": {},
        "expected_status": 409,
        "expected_msg": "Conflict"
    },
    {
        "name": "Live ID não encontrado",
        "endpoint": "/lives/00000000-0000-0000-0000-000000000000",
        "headers": headers if token else {},
        "expected_status": 404,
        "expected_msg": "Not Found"
    }
]

for i, test in enumerate(test_cases, 1):
    print(f"Teste 3.{i}: {test['name']}")
    
    try:
        if test.get('method') == 'POST':
            response = requests.post(
                f"{BASE_URL}{test['endpoint']}",
                json=test['data'],
                headers=test['headers'],
                timeout=5
            )
        else:
            response = requests.get(
                f"{BASE_URL}{test['endpoint']}",
                headers=test['headers'],
                timeout=5
            )
        
        status_ok = response.status_code == test['expected_status']
        status_color = Colors.OKGREEN if status_ok else Colors.FAIL
        
        print(f"  Status: {status_color}{response.status_code} (esperado {test['expected_status']}){Colors.ENDC}")
        
        if status_ok:
            log_success(f"✓ Teste passed")
        else:
            log_warning(f"Status inesperado")
        
    except Exception as e:
        log_error(f"Erro na requisição: {e}")
    
    print()

# ============================================================================
# TESTE 4: Full Lifecycle - CRUD Completo
# ============================================================================
log_section("TESTE 4: Full Lifecycle - Criar → Ler → Atualizar → Deletar")

if not token:
    log_error("Token não disponível, skip teste 4")
else:
    headers = {"Authorization": f"Bearer {token}"}
    live_id = None
    
    # 1. CREATE
    print("1️⃣  CREATE - Criar nova live")
    start = time.time()
    response = requests.post(
        f"{BASE_URL}/lives",
        json={
            "title": "Debug Live Test",
            "url": "http://example.com/stream.m3u8",
            "thumbnail": "http://example.com/thumb.jpg",
            "description": "Debug test for performance analysis",
            "creatorId": user_id
        },
        headers=headers,
        timeout=5
    )
    time_create = (time.time() - start) * 1000
    
    print(f"  Status: {response.status_code}")
    if response.status_code == 201:
        live = response.json()
        live_id = live.get('id')
        log_time("  Tempo", time_create)
        log_success(f"Live criada: {live_id}")
    else:
        log_error(f"Falha: {response.text}")
    
    if live_id:
        # 2. READ
        print("\n2️⃣  READ - Ler live criada")
        start = time.time()
        response = requests.get(
            f"{BASE_URL}/lives/{live_id}",
            headers=headers,
            timeout=5
        )
        time_read = (time.time() - start) * 1000
        
        print(f"  Status: {response.status_code}")
        if response.status_code == 200:
            live = response.json()
            log_time("  Tempo", time_read)
            log_success(f"Live lida: {live.get('title')}")
        else:
            log_error(f"Falha: {response.text}")
        
        # 3. UPDATE
        print("\n3️⃣  UPDATE - Atualizar live")
        start = time.time()
        response = requests.patch(
            f"{BASE_URL}/lives/{live_id}",
            json={
                "title": "Debug Live Test - Updated",
                "isActive": False
            },
            headers=headers,
            timeout=5
        )
        time_update = (time.time() - start) * 1000
        
        print(f"  Status: {response.status_code}")
        if response.status_code == 200:
            log_time("  Tempo", time_update)
            log_success("Live atualizada")
        else:
            log_warning(f"Update status: {response.status_code}")
        
        # 4. DELETE
        print("\n4️⃣  DELETE - Deletar live")
        start = time.time()
        response = requests.delete(
            f"{BASE_URL}/lives/{live_id}",
            headers=headers,
            timeout=5
        )
        time_delete = (time.time() - start) * 1000
        
        print(f"  Status: {response.status_code}")
        if response.status_code == 200:
            log_time("  Tempo", time_delete)
            log_success("Live deletada")
        else:
            log_error(f"Falha: {response.text}")
        
        # 5. VERIFY DELETE
        print("\n5️⃣  VERIFY - Confirmar deleção")
        response = requests.get(
            f"{BASE_URL}/lives/{live_id}",
            headers=headers,
            timeout=5
        )
        
        if response.status_code == 404:
            log_success("Confirmado: Live não encontrada após deleção")
        else:
            log_warning(f"Live ainda existe (status {response.status_code})")

# ============================================================================
# TESTE 5: Comparativa de Performance - Múltiplas Requisições
# ============================================================================
log_section("TESTE 5: Performance Statistical Analysis")

if not token:
    log_error("Token não disponível, skip teste 5")
else:
    headers = {"Authorization": f"Bearer {token}"}
    times = []
    
    print("Executando 10 requisições para calcular estatísticas...\n")
    
    for i in range(10):
        start = time.time()
        response = requests.get(
            f"{BASE_URL}/users",
            headers=headers,
            timeout=5
        )
        duration = (time.time() - start) * 1000
        times.append(duration)
        
        status_color = Colors.OKGREEN if response.status_code == 200 else Colors.FAIL
        print(f"  Req #{i+1:2d}: {status_color}{duration:6.2f}ms{Colors.ENDC}")
    
    # Cálculos estatísticos
    print(f"\n📊 ANÁLISE ESTATÍSTICA:")
    print(f"  Mín:    {min(times):.2f}ms (melhor caso)")
    print(f"  Máx:    {max(times):.2f}ms (pior caso)")
    print(f"  Média:  {mean(times):.2f}ms (típico)")
    print(f"  StdDev: {stdev(times):.2f}ms (variação)")
    
    # Análise de consistência
    coefficient_variation = (stdev(times) / mean(times)) * 100
    print(f"  CV:     {coefficient_variation:.1f}% (coeficiente de variação)")
    
    if coefficient_variation < 10:
        log_success("Performance muito consistente!")
    elif coefficient_variation < 25:
        log_success("Performance consistente")
    else:
        log_warning("Performance com alta variação")

# ============================================================================
# RESUMO FINAL
# ============================================================================
log_section("RESUMO FINAL - STEP 5")

print(f"""
{Colors.OKGREEN}✅ DEBUG COMPLETO{Colors.ENDC}

Validações executadas:
  ✓ Performance de autenticação
  ✓ Cache MISS vs HIT analysis
  ✓ Error handling e edge cases
  ✓ Full CRUD lifecycle
  ✓ Statistical performance analysis

Próximas ações recomendadas:
  1. Monitorar logs do Docker em tempo real
  2. Verificar queries lentas no PostgreSQL
  3. Otimizar índices do banco de dados
  4. Considerar mais agressivo caching
  5. Implementar metrics/monitoring em produção

{Colors.BOLD}Sistema pronto para análise em profundidade!{Colors.ENDC}
""")
