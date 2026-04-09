# API de Ordens de Serviço

Essa API foi desenvolvida com NestJS, TypeScript e PostgreSQL com o objetivo de gerenciar ordens de serviço de forma simples, mas seguindo boas práticas de organização, validação e autenticação.

---

# Tecnologias utilizadas

* Node.js
* NestJS
* TypeScript
* PostgreSQL
* TypeORM
* JWT (autenticação)
* Swagger (documentação)
* Docker (opcional)

---

# Como rodar o projeto

## 1. Clonar o projeto

```bash
git clone <url-do-repositorio>
cd ordens-servico-api
```

## 2. Instalar dependências

```bash
npm install
```

## 3. Subir o banco (forma mais simples)

```bash
docker run --name postgres-db \
-e POSTGRES_PASSWORD=ordens \
-e POSTGRES_DB=ordens_db \
-p 5432:5432 \
-d postgres
```

## 4. Configurar conexão

No arquivo `app.module.ts`, garantir:

```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ordens',
  database: 'ordens_db',
  autoLoadEntities: true,
  synchronize: true,
})
```

## 5. Rodar a API

```bash
npm run start:dev
```

---

# Acesso

* API: [http://localhost:3000](http://localhost:3000)
* Documentação: [http://localhost:3000/docs](http://localhost:3000/docs)

---

# Autenticação

A API usa JWT para proteger algumas rotas.

## Login

```http
POST /auth/login
```

Body:

```json
{
  "username": "admin"
}
```

Resposta:

```json
{
  "access_token": "TOKEN"
}
```

## Uso do token

Enviar no header:

```http
Authorization: Bearer TOKEN
```

No Swagger, basta clicar em "Authorize" e colar o token com o prefixo `Bearer`.

---

# Endpoints

## Criar ordem

```http
POST /ordens
```

```json
{
  "cliente": "João",
  "descricao": "Troca de peça",
  "valor_estimado": 150
}
```

## Listar ordens (protegido)

```http
GET /ordens
```

## Atualizar ordem

```http
PATCH /ordens/:id
```

## Atualizar status

```http
PATCH /ordens/:id/status
```

```json
{
  "status": "Em andamento"
}
```

---

# Status possíveis

* Aberta
* Em andamento
* Concluída
* Cancelada

---

# Regras de negócio

* Só é possível concluir uma ordem que esteja em andamento
* Ordens canceladas não podem ser alteradas
* A data de atualização é alterada automaticamente

---

# Validação

Os dados são validados automaticamente usando DTOs:

* Campos obrigatórios são verificados
* Tipos são validados
* Campos extras são rejeitados

---

# Documentação

A documentação está disponível em:

```bash
http://localhost:3000/docs
```

Lá é possível testar todas as rotas diretamente.

---

# Exemplos rápidos

## Login

```bash
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d "{\"username\":\"admin\"}"
```

## Criar ordem

```bash
curl -X POST http://localhost:3000/ordens \
-H "Content-Type: application/json" \
-d "{\"cliente\":\"João\",\"descricao\":\"Teste\",\"valor_estimado\":100}"
```

## Listar ordens

```bash
curl http://localhost:3000/ordens \
-H "Authorization: Bearer TOKEN"
```

---

# Docker (opcional)

```yml
version: '3'

services:
  db:
    image: postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ordens
      POSTGRES_DB: ordens_db
    ports:
      - "5432:5432"

  api:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
```

---

# Tratamento de erros

A API retorna erros padronizados. Exemplo:

```json
{
  "statusCode": 400,
  "message": ["cliente deve ser texto"],
  "error": "BadRequestException",
  "timestamp": "2026-04-09T00:00:00.000Z"
}
```

---

# Estrutura

O projeto está dividido em camadas:

* Controller: recebe requisições
* Service: regras de negócio
* DTO: validação
* Entity: modelo do banco
* Middleware: logs
* Filter: tratamento de erros

---

# Considerações finais

O projeto cobre os requisitos propostos, incluindo autenticação, validação, documentação e organização em camadas. Foi pensado para ser simples de entender e fácil de rodar.
