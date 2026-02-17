# 🔍 STEP 5: Debug Detalhado de Conexões Específicas

## 📋 Objetivo
Monitorar em tempo real o fluxo de requisições através de cada camada:
- Frontend → Backend (requisições HTTP)
- Backend → PostgreSQL (queries SQL)
- Backend → Redis (cache operations)
- Response path (dados retornando)

## 🎯 Testes que Serão Executados

### Teste 1: Requisição com Monitoramento Completo
```
1. Fazer requisição GET /users COM token
2. Verificar logs do Backend (console)
3. Verificar logs do PostgreSQL (query executado)
4. Verificar logs do Redis (GET/SET operations)
5. Validar resposta no Frontend
```

### Teste 2: Cache Layer Performance
```
1. Primeira requisição GET /lives (Cache MISS)
2. Verificar tempo de resposta (~50-100ms)
3. Segunda requisição GET /lives (Cache HIT)
4. Verificar tempo de resposta (~1-5ms)
5. Comparar performance
```

### Teste 3: Error Handling
```
1. Requisição SEM autenticação
2. Requisição com token EXPIRADO
3. Requisição com payload INVÁLIDO
4. Verificar status codes e mensagens de erro
```

### Teste 4: Database Query Analysis
```
1. Debug SQL gerado pelo TypeORM
2. Verificar índices usados
3. Tempo de execução de queries
4. Cache effectiveness
```

### Teste 5: Full Request Lifecycle
```
1. Login (obter token)
2. Criar Live (POST com autenticação)
3. GET Lives (com cache)
4. Atualizar Live (invalidar cache)
5. GET Lives novamente (cache miss)
6. Deletar Live
7. Verificar cascade delete
```

## 📊 Logs que Monitoraremos

### Backend (NestJS)
```
[NestFactory] Starting NestApplication...
[InstanceLoader] AuthModule dependencies initialized
[InstanceLoader] LivesModule dependencies initialized
[InstanceLoader] RedisModule dependencies initialized
[JwtGuard] Validating JWT token...
[LivesService] Querying lives from DB...
[RedisService] Cache MISS - fetching from DB
[RedisService] Storing in cache for 3600s
[RedisService] Cache HIT - returning cached data
```

### PostgreSQL
```
LOG: execute <unnamed>: SELECT * FROM "user" WHERE "user"."email" = $1
LOG: execute <unnamed>: INSERT INTO "live" (...) VALUES (...)
LOG: execute statement: SELECT * FROM "live"
```

### Redis
```
COMMAND: GET lives:all
REPLY: nil (MISS)
COMMAND: SET lives:all "..." EX 3600
REPLY: OK
COMMAND: GET lives:all
REPLY: "[{...}]" (HIT)
```

## 🚀 Executando Step 5

### Parte 1: Monitorar Logs durante requisições

**Terminal 1**: Iniciar Docker com logs visíveis
```bash
cd c:\Users\dreyk\Desktop\testes 3v
docker-compose down
docker-compose up --build
# Ver logs em tempo real
```

**Terminal 2**: Executar Python test com timing detalhado

**Terminal 3**: Opcional - Redis CLI para verificar cache
```bash
docker exec -it multi_lives_redis redis-cli
> KEYS *
> GET live:1
```

### Parte 2: Análise de Performance

Criar script Python que:
1. Faz múltiplas requisições
2. Mede tempo de cada uma
3. Imprime informações de timing
4. Compara cache MISS vs HIT
5. Gera relatório de performance

### Parte 3: Error Scenarios

Testar:
- [ ] Token ausente → 403 Forbidden
- [ ] Token inválido → 403 Unauthorized
- [ ] Token expirado → 403 Token expired
- [ ] Payload inválido → 400 Bad Request
- [ ] Email duplicado → 409 Conflict
- [ ] Resource não encontrado → 404 Not Found

## 📈 Métricas a Coletar

1. **Latência de Requisição**
   - Time to First Byte (TTFB)
   - Total request time
   - Network latency

2. **Cache Performance**
   - Cache hit rate
   - Cache miss latency
   - Cache hit latency

3. **Database Performance**
   - Query execution time
   - Data serialization time
   - Network round-trip

4. **Authentication**
   - JWT verification time
   - Token validation overhead

## ✅ Checklist de Debug

- [ ] Logs do Backend mostram todos os passos
- [ ] Queries SQL aparecem nos logs do PostgreSQL
- [ ] Redis operations aparecem em tempo real
- [ ] Timing de cache MISS vs HIT é prametrizado
- [ ] Todas as camadas comunicando corretamente
- [ ] Error handling funcionando como esperado
- [ ] Performance dentro de specifications

## 🎯 Esperado ao Final

1. **Visibilidade completa** do fluxo de requisição
2. **Confirmação** de que cada camada está respondendo corretamente
3. **Métricas** de performance documentadas
4. **Relatório** com estatísticas finais
5. **Confiança** de que o sistema está pronto para produção

---

**Próximo**: Executar os testes com monitoramento de logs em tempo real.
