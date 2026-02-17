# GitHub Copilot Instructions for Multi Lives

## Project Overview
Multi Lives é uma plataforma para assistir múltiplas lives simultaneamente com:
- **Backend**: NestJS + PostgreSQL + Redis
- **Frontend**: Next.js + React + TailwindCSS + React Player
- **Infraestrutura**: Docker + Docker Compose

## Conventions

### Backend (NestJS)
- Padrão de pastas: módulos com controller, service, entity, dto
- Controllers com decorators: `@Get()`, `@Post()`, `@UseGuards(JwtGuard)`
- Services com lógica de negócio
- DTOs com class-validator
- Entidades com TypeORM

### Frontend (Next.js)
- Componentes em `src/components` com extensão `.tsx`
- Páginas em `src/app` seguindo Next.js App Router
- Stores em `src/store` usando Zustand
- Utilitários em `src/utils`
- Estilos com TailwindCSS
- API calls via `src/utils/api.ts`

## Common Tasks

### Todo: Adicionar novo endpoint
1. Criar DTO em `src/module/dto/`
2. Adicionar método no service
3. Expor em controller com decorators
4. Adicionar rota no cliente API frontend

### Todo: Criar novo componente React
1. Arquivo em `src/components/ComponentName.tsx`
2. Use `'use client'` no topo para Client Components
3. Importe stores necessários
4. Use TailwindCSS para estilos
5. Adicione toast notifications onde apropriado

### Todo: Adicionar nova store
1. Criar em `src/store/newStore.ts`
2. Usar Zustand com tipos TypeScript
3. Exportar hook useNewStore
4. Usar em componentes com `const { ... } = useNewStore();`

## Key Files

**Backend**:
- `backend/src/app.module.ts` - Configuração principal
- `backend/src/main.ts` - Entry point
- `backend/.env.example` - Template de variáveis

**Frontend**:
- `frontend/src/app/layout.tsx` - Layout principal
- `frontend/src/app/page.tsx` - Página home
- `frontend/tailwind.config.js` - Configuração Tailwind

## Code Style

### Backend
```typescript
// Controllers com type-safety
@Controller('route')
@UseGuards(JwtGuard)
export class MyController {
  @Post()
  create(@Body() dto: CreateDto): Promise<Entity> {
    return this.service.create(dto);
  }
}
```

### Frontend
```typescript
// Componentes com React 18 e Zustand
'use client';

export default function MyComponent() {
  const { state, action } = useStore();
  
  return (
    <div className="tailwind-classes">
      Content
    </div>
  );
}
```

## Testing

- Backend: `npm run test` em `/backend`
- Frontend: Testes unitários com Jest

## Deployment

- Docker Compose para desenvolvimento local
- Backend em porta 3000
- Frontend em porta 3001
- PostgreSQL em porta 5432
- Redis em porta 6379

## Useful Commands

**Backend**:
- `npm run start:dev` - Desenvolvimento
- `npm run build` - Build
- `npm run lint` - Lint + fix

**Frontend**:
- `npm run dev` - Desenvolvimento  
- `npm run build` - Build
- `npm run lint` - Lint + fix

**Docker**:
- `docker-compose up` - Todos os serviços
- `docker-compose logs -f` - Logs em tempo real

## Common Patterns

### API Call com Tratamento de Erro
```typescript
try {
  const response = await apiClient.someMethod(data);
  toast.success('Sucesso!');
} catch (error: any) {
  toast.error(error.response?.data?.message || 'Erro');
}
```

### Store Update
```typescript
const { setData } = useStore();
setData(newData);
```

### Protected Route
```typescript
@UseGuards(JwtGuard)
@Post('protected')
protectedMethod() { }
```

## Git Workflow

1. Crie feature branch: `git checkout -b feature/description`
2. Faça commits: `git commit -m "feat: description"`
3. Push: `git push origin feature/description`
4. Crie Pull Request

## Resources

- Backend README: `/backend/README.md`
- Frontend README: `/frontend/README.md`
- Setup Guide: `/SETUP.md`
- Main README: `/README.md`
