# Sustema Project

Sustema é um sistema de gestão de reciclagem e sustentabilidade que integra um backend ASP.NET Core (Web API) com um frontend em React (TypeScript). O sistema permite o registro de ações de reciclagem, visualização de pontos de coleta, gerenciamento de conteúdos educativos e gamificação (com badges armazenados como JSON).

--- 

## Índice


- [Pré-requisitos](#pré-requisitos)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração do Backend](#configuração-do-backend)
- [Configuração do Frontend](#configuração-do-frontend)
- [Docker (Opcional)](#docker-opcional)
- [Documentação da API](#documentação-da-api)
- [Comandos Git e Branches](#comandos-git-e-branches)

---

## Pré-Requisitos

- [.NET 9 SDK](https://dotnet.microsoft.com/pt-br/download/dotnet/9.0)
- [Node.js (versão 16 ou superior)](https://nodejs.org/)
- [Git](https://git-scm.com/)
- (Opcional) [Docker](https://www.docker.com/)

--- 

## Estrutura do Projeto
```bash
raiz/
├───backend/
│   └───Sustema.Api/
│   │    ├───Controllers/
│   │    ├───Data/
│   │    ├───Helpers/
│   │    ├───Migrations/
│   │    ├───Models/
│   │    │   └───DTOs/
│   │    ├───Properties/
│   │    ├───Repositories/
│   │    └───Services/
│   │    ├───Program.cs
│   │    ├───appsetting.json
│   │    ├───Dockerfile
│   │    └───Sustema.Api.http
├───frontend/
│  ├───public/
│  ├───src/
│  ├───package.json
│  ├───dockerfile (Opcional)
│  └───tsconfig.json
└───docker-compose.yaml (Opcional)
```
<!-- project-root/ 
├── backend/ # Projeto ASP.NET Core Web API 
│ ├── EcoTech.API.csproj 
│ ├── Program.cs 
│ ├── Data/ # ApplicationDbContext e migrações 
│ ├── Models/ # Entidades: User, CollectionPoint, RecyclingAction, GamificationRecord, EducationalContent, BadgeInfo 
│ ├── Repositories/# Interfaces e implementações do padrão Repository 
│ ├── Services/ # Lógica de negócio, como GamificationService 
│ ├── Controllers/ # Endpoints RESTful (UserController, CollectionPointController, etc.) 
│ └── Dockerfile # (Opcional) Configuração Docker para o backend 

├── frontend/ # Projeto React com TypeScript 
│ ├── package.json 
│ ├── tsconfig.json 
│ ├── public/ 
│ ├── src/ # Componentes, serviços, modelos e rotas 
│ └── Dockerfile # (Opcional) Configuração Docker para o frontend 
└── docker-compose.yml # (Opcional) Orquestração dos serviços via Docker Compose -->

---

## Configuração do Backend

1. **Navegue até a pasta `backend`:**
  ```bash
  cd backend
  ```

2. **Restaure as dependências e compile o projeto**
  ```bash
  dotnet restore
  dotnet build
  ```

3. **Configuração**
- Defina a string de conexão e demais configurações no arquivo `appsettings.json`.
- O `ApplicationDbContext` está configurado para mapear as entidades conforme o modelo.

---

## Configuração do Frontend

1. **Navegue até a pasta `frontend`:**
```bash
cd frontend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Inicie o projeto em modo de desenvolvimento:**
```bash
npm start
```

4. **Acesso:**
O aplicativo React será servido na porta 3000 e realizará chamadas para a API em `https://localhost:5001/api`.

---

## Docker (Opcional)

#### Backend

O Dockerfile na pasta backend define o build e publicação do projeto ASP.NET Core:
```dockerfile
# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["Sustema.Api.csproj", "./"]
RUN dotnet restore "Sustema.Api.csproj"
COPY . .
RUN dotnet publish "Sustema.Api.csproj" -c Release -o /app/publish

# Etapa final
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "Sustema.Api.dll"]
```

#### Frontend

O Dockerfile na pasta frontend para o projeto React com TypeScript:
```dockerfile
# Etapa de build
FROM node:16-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa final: usando Nginx para servir os arquivos estáticos
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose

No diretório raiz, o arquivo docker-compose.yml orquestra ambos os serviços:
```yaml
version: '3.8'
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5001:80"
    environment:
      - ASPNETCORE_ENVIRONMENT=Development

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
```

Para rodar os containers:

```bash
docker compose up --build -d
```

---

## Documentação da API

A documentação interativa da API é gerada usando Swagger (Swashbuckle.AspNetCore) e segue a especificação OpenAPI.

- **Configuração:**
No `Program.cs` do backend, o Swagger é configurado e estará disponível na raiz (ex.:` https://localhost:5001/`) em ambiente de desenvolvimento.

- **Acesso:**
Após executar o backend, abra o navegador e acesse a URL configurada para visualizar e interagir com a documentação.

---

## Comandos GIT e Branches

#### Clonar o repositório
```bash
git clone https://github.com/oCaioAug/Sustema
```

#### Configurar o repositório
```bash
cd raiz-projeto
```

#### Comandos Básicos
- **Verificar status:**
```bash
git status
```

- **Adicionar alterações:**
```bash
git add .
```

- **Fazer commit:**
```bash
git commit -m "Descrição do commit"
```

- **Enviar alterações para o repositório remoto (GitHub):**
```bash
git push origin main
```

##### Trabalhando com Branches

- **Criar uma nova branch:**
```bash
git checkout -b feature/noma-da-feature
```

- **Mudar de branch:**
```bash
git checkout nome-da-branch
```

- **Atualizar a branch `main`:**
```bash
git checkout main
git pull origin main
```

- **Mesclar branch de feature com `main`:**
```bash
git checkout main
git merge feature/nome-da-feature
```

- **Excluir branch (local):**
```bash
git branch -d feature/nome-da-feature
```

---

## Execução e Deploy

- **Backend**
Para executar o projeto:
```bash
dotnet run
```
A API estará disponível na porta configurada (ex.: https://localhost:5001).

- **Frontend**
Para executar o projeto:
```bash
npm start
```
O aplicativo React abrirá em `http://localhost:3000`.

- **Deploy com Docker:**
Utilize o Docker Compose para build e execução conjunta:
```bash
docker compose up --build -d
```

