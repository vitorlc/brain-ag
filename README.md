# Brain AG

Um sistema de gestão de fazendas construído com NestJS e MikroORM, projetado para ajudar agricultores a gerenciar suas fazendas, culturas e colheitas de forma eficiente.


## Tecnologias

- **Framework Backend**: NestJS
- **ORM**: MikroORM com PostgreSQL
- **Banco de Dados**: PostgreSQL
- **Testes**: Jest
- **Linguagem**: TypeScript

## Pré-requisitos

- Node.js (v14 ou superior)
- PostgreSQL
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/vitorlc/brain-ag.git
cd brain-ag
```

### Opção 1: Execução via Node

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```
Edite o arquivo `.env` com suas credenciais do banco de dados e outras configurações.

4. Execute as migrações do banco de dados:
```bash
npm run migration:up
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run start:dev
```

### Opção 2: Execução via Docker compose

2. Construa e inicie os containers com o Docker Compose:
```bash
docker-compose up --build
```

## Endpoints da API

### Documentação da API

A documentação completa da API está disponível através do Swagger UI em:
[Link](https://brain-ag-api.limalabs.dev/api)

## Testes

Execute a suite de testes:
```bash
npm run test
```

Execute testes com cobertura:
```bash
npm run test:cov
```

## Estrutura do Projeto

```
src/
├── farms/              # Módulo de gestão de fazendas
├── farmers/            # Módulo de gestão de agricultores
├── cultivation/        # Gestão de culturas e colheitas
│   ├── crops/
│   └── harvests/
├── dashboard/          # Estatísticas do dashboard
└── utils/             # Utilitários compartilhados
```

