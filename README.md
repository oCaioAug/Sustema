# 🌱 Sustema Project

Sustema é um sistema completo de gestão de reciclagem e sustentabilidade que integra um backend ASP.NET Core (Web API) com um frontend em React (TypeScript). O sistema permite o registro de ações de reciclagem, visualização de pontos de coleta, gerenciamento de conteúdos educativos e gamificação com sistema de badges e pontuação.

## 🌟 Funcionalidades

### 🔄 Gestão de Reciclagem
- **Registro de ações**: Cadastro de ações de reciclagem com diferentes tipos de materiais
- **Pontos de coleta**: Mapa interativo com pontos de coleta geolocalizados
- **Controle de quantidade**: Registro detalhado com quantidades e unidades de medida

### 🎮 Sistema de Gamificação
- **Sistema de pontos**: Pontuação baseada nas ações de reciclagem
- **Badges**: Sistema de conquistas e medalhas
- **Ranking**: Classificação dos usuários mais ativos

### 📚 Conteúdo Educativo
- **Artigos**: Conteúdo textual sobre sustentabilidade
- **Vídeos**: Material audiovisual educativo
- **Múltiplos formatos**: Suporte a diferentes tipos de conteúdo

### 👥 Gestão de Usuários
- **Autenticação JWT**: Sistema seguro de login e autorização
- **Perfis de usuário**: Diferentes níveis de acesso
- **Histórico de ações**: Acompanhamento das atividades dos usuários

---

## 📑 Índice

- [Pré-requisitos](#pré-requisitos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração do Backend](#configuração-do-backend)
- [Configuração do Frontend](#configuração-do-frontend)
- [Endpoints da API](#endpoints-da-api)
- [Docker (Opcional)](#docker-opcional)
- [Documentação da API](#documentação-da-api)
- [Comandos Git e Branches](#comandos-git-e-branches)
- [Testes](#testes)

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **ASP.NET Core 9.0**: Framework principal da API
- **Entity Framework Core 9.0**: ORM para acesso a dados
- **SQL Server**: Banco de dados relacional
- **JWT Authentication**: Sistema de autenticação
- **Swagger/OpenAPI**: Documentação da API
- **FluentValidation**: Validação de modelos
- **xUnit**: Framework de testes

### Frontend
- **React 19.0**: Biblioteca para interface de usuário
- **TypeScript 4.9**: Linguagem tipada
- **React Router DOM 6.14**: Roteamento SPA
- **Axios**: Cliente HTTP para requisições
- **Bootstrap 5.3**: Framework CSS
- **Leaflet**: Biblioteca para mapas interativos

### Ferramentas
- **Docker**: Containerização (opcional)
- **Git**: Controle de versão
- **Visual Studio Code**: Editor recomendado

---

## 📋 Pré-Requisitos

- [.NET 9 SDK](https://dotnet.microsoft.com/pt-br/download/dotnet/9.0)
- [Node.js 18+](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/sql-server) ou SQL Server Express
- [Git](https://git-scm.com/)
- (Opcional) [Docker](https://www.docker.com/)

---

## 📁 Estrutura do Projeto

```
Sustema/
├── backend/
│   ├── backend.sln                          # Solution do .NET
│   └── Sustema.Api/
│       ├── Controllers/                     # Controladores da API
│       │   ├── UserController.cs
│       │   ├── CollectionPointController.cs
│       │   ├── EducationalContentController.cs
│       │   ├── RecyclingActionController.cs
│       │   └── GamificationRecordController.cs
│       ├── Data/                           # Contexto do banco de dados
│       │   └── ApplicationDbContext.cs
│       ├── Models/                         # Entidades e DTOs
│       │   ├── User.cs
│       │   ├── CollectionPoint.cs
│       │   ├── EducationalContent.cs
│       │   ├── RecyclingAction.cs
│       │   ├── GamificationRecord.cs
│       │   ├── BadgeInfo.cs
│       │   └── DTOs/
│       ├── Repositories/                   # Padrão Repository
│       ├── Services/                       # Lógica de negócio
│       ├── Migrations/                     # Migrações do banco
│       ├── Helpers/                        # Classes auxiliares
│       ├── Middlewares/                    # Middlewares customizados
│       ├── Program.cs                      # Configuração da aplicação
│       ├── appsettings.json               # Configurações
│       └── Dockerfile                      # Container Docker
├── frontend/
│   ├── public/                            # Arquivos públicos
│   │   ├── index.html
│   │   ├── profile.html
│   │   └── tutorials.html
│   ├── src/                               # Código-fonte React
│   │   ├── components/                    # Componentes reutilizáveis
│   │   ├── pages/                         # Páginas da aplicação
│   │   ├── services/                      # Serviços de API
│   │   ├── helper/                        # Funções auxiliares
│   │   ├── styles/                        # Arquivos de estilo
│   │   └── App.tsx                        # Componente principal
│   ├── package.json                       # Dependências do Node.js
│   ├── tsconfig.json                      # Configuração TypeScript
│   └── dockerfile                         # Container Docker
├── docker-compose.yaml                    # Orquestração completa
├── package.json                           # Configurações globais
└── README.md                              # Este arquivo
```

---

## ⚙️ Configuração do Backend

### 1. Navegue até a pasta backend:
```bash
cd backend/Sustema.Api
```

### 2. Restaure as dependências:
```bash
dotnet restore
```

### 3. Configure o banco de dados:
Edite o arquivo `appsettings.json` com sua string de conexão:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=SustemaDb;Integrated Security=true;TrustServerCertificate=true;"
  },
  "Jwt": {
    "Secret": "SuaChaveSecretaAqui",
    "Issuer": "Sustema",
    "Audience": "SustemaUsers",
    "ExpiryMinutes": 60
  }
}
```

### 4. Execute as migrações:
```bash
dotnet ef database update
```

### 5. Execute o projeto:
```bash
dotnet run
```

A API estará disponível em: `http://localhost:5263`

---

## 🎨 Configuração do Frontend

### 1. Navegue até a pasta frontend:
```bash
cd frontend
```

### 2. Instale as dependências:
```bash
npm install
```

### 3. Inicie o projeto em modo de desenvolvimento:
```bash
npm start
```

### 4. Acesso:
O aplicativo React será servido em `http://localhost:3000` e realizará chamadas para a API em `http://localhost:5263/api`.

---

## 🔗 Endpoints da API

### Usuários
- `GET /api/User` - Listar todos os usuários
- `GET /api/User/{id}` - Obter usuário por ID
- `POST /api/User/register` - Registrar novo usuário
- `POST /api/User/login` - Fazer login
- `PUT /api/User/{id}` - Atualizar usuário
- `DELETE /api/User/{id}` - Excluir usuário
- `GET /api/User/perfis` - Listar perfis disponíveis

### Pontos de Coleta
- `GET /api/CollectionPoint` - Listar todos os pontos
- `GET /api/CollectionPoint/{id}` - Obter ponto por ID
- `POST /api/CollectionPoint` - Criar novo ponto
- `PUT /api/CollectionPoint/update/{id}` - Atualizar ponto
- `DELETE /api/CollectionPoint/{id}` - Excluir ponto

### Conteúdo Educativo
- `GET /api/EducationalContent` - Listar todo o conteúdo
- `GET /api/EducationalContent/{id}` - Obter conteúdo por ID
- `POST /api/EducationalContent` - Criar novo conteúdo
- `PUT /api/EducationalContent/{id}` - Atualizar conteúdo
- `DELETE /api/EducationalContent/{id}` - Excluir conteúdo
- `GET /api/EducationalContent/tipos` - Listar tipos de conteúdo

### Ações de Reciclagem
- `GET /api/RecyclingAction` - Listar todas as ações
- `GET /api/RecyclingAction/{id}` - Obter ação por ID
- `POST /api/RecyclingAction` - Registrar nova ação
- `PUT /api/RecyclingAction/update/{id}` - Atualizar ação
- `DELETE /api/RecyclingAction/{id}` - Excluir ação

### Gamificação
- `GET /api/GamificationRecord/user/{userId}` - Obter registros por usuário
- `GET /api/GamificationRecord/{id}` - Obter registro por ID
- `POST /api/GamificationRecord` - Criar novo registro
- `PUT /api/GamificationRecord/{recordId}` - Atualizar pontuação
- `GET /api/GamificationRecord/availableBadges/{recordId}` - Obter badges disponíveis
- `DELETE /api/GamificationRecord/{id}` - Excluir registro

---

## 🐳 Docker (Opcional)

### Execução com Docker Compose

O projeto inclui configuração completa do Docker com banco de dados SQL Server:

```bash
# Executar todos os serviços
docker compose up --build -d

# Parar os serviços
docker compose down

# Ver logs
docker compose logs -f
```

### Serviços incluídos:
- **Backend**: API na porta 5001
- **Frontend**: Aplicação React na porta 3000
- **Database**: SQL Server na porta 1433

### Configuração do docker-compose.yaml:
```yaml
version: '3.8'
services:
  backend:
    build:
      context: ./backend/Sustema.Api
      dockerfile: Dockerfile
    ports:
      - "5001:5001"
    environment:
      ASPNETCORE_ENVIRONMENT: Development
      ASPNETCORE_URLS: "http://+:5001"
    depends_on:
      - db

  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      ACCEPT_EULA: Y
      MSSQL_SA_PASSWORD: Sustema123!
    ports:
      - "1433:1433"
    volumes:
      - sqlserverdata:/var/opt/mssql

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"

volumes:
  sqlserverdata:
```

---

## 📚 Documentação da API

A documentação interativa da API é gerada usando Swagger (Swashbuckle.AspNetCore) e segue a especificação OpenAPI.

### Acesso:
- **Desenvolvimento**: `http://localhost:5263/swagger`
- **Docker**: `http://localhost:5001/swagger`

A documentação inclui:
- Todos os endpoints disponíveis
- Modelos de dados
- Exemplos de requisições e respostas
- Esquemas de autenticação

---

## 🧪 Testes

O projeto inclui testes unitários e de integração:

### Executar testes do backend:
```bash
cd backend
dotnet test
```

### Executar testes do frontend:
```bash
cd frontend
npm test
```

### Cobertura de testes:
```bash
# Backend
dotnet test --collect:"XPlat Code Coverage"

# Frontend
npm test -- --coverage --watchAll=false
```

---

## 🌿 Comandos Git e Branches

### Clonar o repositório:
```bash
git clone https://github.com/oCaioAug/Sustema
cd Sustema
```

### Comandos básicos:
```bash
# Verificar status
git status

# Adicionar alterações
git add .

# Fazer commit
git commit -m "Descrição do commit"

# Enviar alterações
git push origin main
```

### Trabalhando com branches:
```bash
# Criar nova branch
git checkout -b feature/nome-da-feature

# Mudar de branch
git checkout nome-da-branch

# Atualizar branch main
git checkout main
git pull origin main

# Mesclar branch
git checkout main
git merge feature/nome-da-feature

# Excluir branch local
git branch -d feature/nome-da-feature
```

---

## 🚀 Execução e Deploy

### Desenvolvimento Local:

**Backend:**
```bash
cd backend/Sustema.Api
dotnet run
```
API: `http://localhost:5263`

**Frontend:**
```bash
cd frontend
npm start
```
App: `http://localhost:3000`

### Deploy com Docker:
```bash
docker compose up --build -d
```
- API: `http://localhost:5001`
- App: `http://localhost:3000`
- DB: `localhost:1433`

---

## 📝 Notas de Desenvolvimento

### Configurações importantes:
1. **JWT Secret**: Configure uma chave secreta forte em produção
2. **CORS**: Configurado para desenvolvimento, ajuste para produção
3. **SSL**: Desabilitado para desenvolvimento, habilite em produção
4. **Banco de dados**: Use SQL Server Express ou Docker para desenvolvimento

### Estrutura de dados:
- **Users**: Autenticação e perfis
- **CollectionPoints**: Pontos geolocalizados
- **RecyclingActions**: Histórico de reciclagem
- **EducationalContent**: Material educativo
- **GamificationRecords**: Sistema de pontuação e badges

---

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👥 Autores

- **Caio Augusto** - *Desenvolvimento* - [@oCaioAug](https://github.com/oCaioAug)

---

⭐ **Se este projeto foi útil, considere dar uma estrela!** ⭐
