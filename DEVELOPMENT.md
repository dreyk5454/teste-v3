# 📝 Guia de Desenvolvimento

## Padrões e Boas Práticas

### Backend (NestJS)

#### Módulos
- Um módulo por feature
- Exportar services que precisam ser importados por outros
- Usar `forRoot()` para módulos configuráveis

```typescript
@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [MyController],
  providers: [MyService],
  exports: [MyService],
})
export class MyModule {}
```

#### Services
- Toda lógica de negócio no service
- Controllers apenas roteiam requisições
- Usar `Injectable()`
- Tipagem completa com TypeScript

```typescript
@Injectable()
export class MyService {
  constructor(
    @InjectRepository(Entity)
    private repo: Repository<Entity>,
  ) {}

  async create(dto: CreateDto): Promise<Entity> {
    // lógica aqui
  }
}
```

#### DTOs
- Validação com class-validator
- Sempre tipados
- Reutilizar quando possível

```typescript
export class CreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
```

#### Entities
- Usar TypeORM decorators
- Timestamps automáticos
- Relations tipadas

```typescript
@Entity('table_name')
export class MyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

#### Error Handling
```typescript
import { BadRequestException, NotFoundException } from '@nestjs/common';

throw new NotFoundException('Entidade não encontrada');
throw new BadRequestException('Dados inválidos');
```

### Frontend (Next.js + React)

#### Components
- Todos devem ter `'use client'` se usarem hooks
- Propsss bem tipadas
- Usar React.FC ou declararreturn type

```typescript
'use client';

interface MyProps {
  title: string;
  onAction?: () => void;
}

export default function MyComponent({ title, onAction }: MyProps) {
  return <div className="...">{title}</div>;
}
```

#### Stores (Zustand)
- Criar um store por feature
- Tipar completamente
- Exportar hook não Store diretamente

```typescript
interface MyStore {
  data: Type[];
  setData: (data: Type[]) => void;
}

export const useMyStore = create<MyStore>((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));
```

#### API Calls
- Sempre usar try/catch
- Toast notifications para feedback
- Tratar errors apropriadamente

```typescript
try {
  const response = await apiClient.method(data);
  toast.success('Sucesso!');
  return response.data;
} catch (error: any) {
  const message = error.response?.data?.message || 'Erro';
  toast.error(message);
  throw error;
}
```

#### Estilos
- Usar TailwindCSS classes
- Criar `className` strings para componentes complexos
- Respeitar paleta de cores do theme

```typescript
const buttonClass = "px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded";
```

## Testing

### Backend
```bash
npm run test              # Testes uma vez
npm run test:watch       # Watch mode
npm run test:cov         # Coverage
```

### Frontend
```bash
npm run test              # Testes
```

Estrutura:
- `*.spec.ts` para testes unitários
- `*.e2e-spec.ts` para testes E2E

## Performance

### Backend
- Usar Redis para cache
- Paginação em endpoints que retornam múltiplos dados
- Lazy loading de relations
- Indexes-on banco de dados

### Frontend
- Code splitting automático (Next.js)
- Lazy load components quando possível
- Memoize componentes que não mudam frequentemente
- Otimizar re-renders

## Security

### Backend
- Sempre validar input com DTOs
- Usar JWT para autenticação
- Princípio de least privilege
- Hash passwords com bcrypt
- CORS configurado

### Frontend
- Não armazene secrets em frontend
- Validação de input
- Sanitize HTML user data
- useGuards para proteger rotas

## Commit Messages

Use convenção Conventional Commits:

```
feat: adiciona novo feature
fix: corrige bug
docs: atualiza documentação
style: formata código
refactor: refatora código
test: adiciona testes
chore: tarefas de manutenção
```

Exemplo completo:
```
feat(auth): implementa autenticação com JWT

- Adiciona módulo JWT
- Implementa guard de proteção
- Adiciona testes
- Atualiza documentação
```

## Branches

```
main              # Produção
develop           # Staging
feature/xyz       # Features em desenvolvimento
fix/xyz          # Bugfixes
```

## Checklist de PR

- [ ] Código segue os padrões do projeto
- [ ] Testes passando
- [ ] Sem console.logs desnecessários
- [ ] TypeScript sem erros
- [ ] Commitmentos bem descritos
- [ ] README atualizado se necessário
- [ ] Sem secrets ou tokens commitados

## Debugging

### Backend
```typescript
// NestJS Logger
import { Logger } from '@nestjs/common';

private readonly logger = new Logger(MyClass.name);
this.logger.log('Message');
this.logger.warn('Warning');
this.logger.error('Error');
```

### Frontend
```typescript
// React DevTools
console.log('Debug:', value);

// Next.js
// npm install -D @next/bundle-analyzer
```

## Documentação

### Backend Endpoint
```typescript
/**
 * Cria novo recurso
 * @param dto Dados do recurso
 * @returns Recurso criado
 * @throws NotFoundException Se dados inválidos
 */
@Post()
create(@Body() dto: CreateDto) {
  return this.service.create(dto);
}
```

### Frontend Function
```typescript
/**
 * Formata data para formato brasileiro
 * @param date Data a formatar
 * @returns String formatada DD/MM/YYYY
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR').format(date);
}
```

---

**Obrigado por seguir os padrões! 🎉**
