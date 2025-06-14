# Diagramas de Sequência - Sistema Sustema

## 1. Fluxo de Autenticação (Login)

```mermaid
sequenceDiagram
    participant U as 👤 Usuário
    participant F as 🌐 Frontend (React)
    participant API as 🔧 Backend API
    participant DB as 🗄️ Banco de Dados
    participant JWT as 🔑 JWT Service
    
    Note over U,JWT: Processo de Login do Usuário
    
    U->>F: 1. Insere email e senha
    F->>F: 2. Valida formato dos dados
    
    alt Dados válidos
        F->>API: 3. POST /api/User/login
        Note right of F: { email: "user@email.com", password: "senha" }
        
        API->>DB: 4. Busca usuário por email
        
        alt Usuário encontrado
            DB-->>API: 5. Retorna dados do usuário
            API->>API: 6. Verifica senha (PasswordHelper)
            
            alt Senha correta
                API->>JWT: 7. Gera token JWT
                Note right of JWT: Inclui: UserId, Email, Perfil, Exp
                JWT-->>API: 8. Token gerado
                
                API-->>F: 9. 200 OK + { token, user }
                F->>F: 10. Armazena token (localStorage)
                F->>F: 11. Redireciona para dashboard
                F-->>U: 12. Usuário autenticado
                
            else Senha incorreta
                API-->>F: 13. 401 Unauthorized
                F-->>U: 14. Exibe erro "Credenciais inválidas"
            end
            
        else Usuário não encontrado
            API-->>F: 15. 401 Unauthorized
            F-->>U: 16. Exibe erro "Usuário não encontrado"
        end
        
    else Dados inválidos
        F-->>U: 17. Exibe erros de validação
    end
```

## 2. Fluxo de Registro de Ação de Reciclagem

```mermaid
sequenceDiagram
    participant U as 👤 Usuário
    participant F as 🌐 Frontend
    participant API as 🔧 Backend API
    participant DB as 🗄️ Banco de Dados
    participant GS as 🏆 Gamification Service
    
    Note over U,GS: Registro de Nova Ação de Reciclagem
    
    U->>F: 1. Acessa formulário de reciclagem
    F->>API: 2. GET /api/CollectionPoint (carrega pontos)
    API->>DB: 3. Busca pontos ativos
    DB-->>API: 4. Lista de pontos
    API-->>F: 5. Retorna pontos disponíveis
    F-->>U: 6. Exibe mapa/lista de pontos
    
    U->>F: 7. Seleciona ponto e preenche dados
    Note right of U: Material, quantidade, unidade
    
    F->>F: 8. Valida dados do formulário
    
    alt Dados válidos
        F->>API: 9. POST /api/RecyclingAction
        Note right of F: { UserId, CollectionPointId, TipoMaterial, Quantidade, UnidadeMedida }
        
        API->>API: 10. Valida autorização (JWT)
        API->>DB: 11. Verifica se ponto existe
        
        alt Ponto válido
            DB-->>API: 12. Ponto confirmado
            API->>DB: 13. Salva ação de reciclagem
            DB-->>API: 14. Ação salva (ID gerado)
            
            % Processo de Gamificação
            API->>GS: 15. Calcula pontos da ação
            Note right of GS: Baseado em tipo e quantidade
            GS-->>API: 16. Pontos calculados
            
            API->>DB: 17. Busca registro de gamificação do usuário
            DB-->>API: 18. Registro atual ou null
            
            alt Primeiro registro
                API->>DB: 19. Cria novo GamificationRecord
            else Atualiza existente
                API->>DB: 20. Atualiza pontos totais
            end
            
            API->>GS: 21. Verifica conquista de badges
            GS-->>API: 22. Novas badges (se houver)
            
            opt Novas badges conquistadas
                API->>DB: 23. Atualiza badges do usuário
                DB-->>API: 24. Badges atualizadas
            end
            
            API-->>F: 25. 201 Created + { ação, pontos, badges }
            F->>F: 26. Atualiza interface
            F-->>U: 27. Sucesso + pontos ganhos
            
        else Ponto inválido
            API-->>F: 28. 400 Bad Request
            F-->>U: 29. Erro "Ponto de coleta inválido"
        end
        
    else Dados inválidos
        F-->>U: 30. Exibe erros de validação
    end
```

## 3. Fluxo de Criação de Conteúdo Educacional (Admin)

```mermaid
sequenceDiagram
    participant A as 🔧 Admin
    participant F as 🌐 Frontend
    participant Auth as 🔒 Auth Guard
    participant API as 🔧 Backend API
    participant DB as 🗄️ Banco de Dados
    participant FS as 📁 File Storage
    
    Note over A,FS: Criação de Conteúdo Educacional (Admin Only)
    
    A->>F: 1. Acessa /educational-content/create
    F->>Auth: 2. Verifica permissão de admin
    
    alt É Admin
        Auth-->>F: 3. Acesso autorizado
        F->>API: 4. GET /api/EducationalContent/tipos
        API-->>F: 5. Lista tipos de conteúdo
        F-->>A: 6. Exibe formulário de criação
        
        A->>F: 7. Preenche dados e seleciona tipo
        Note right of A: Título, descrição, tipo, URL/texto
        
        opt Upload de imagem
            A->>F: 8. Seleciona arquivo de imagem
            F->>FS: 9. Upload da imagem
            FS-->>F: 10. URL da imagem salva
        end
        
        A->>F: 11. Submete formulário
        F->>F: 12. Valida dados obrigatórios
        
        alt Dados válidos
            F->>API: 13. POST /api/EducationalContent
            Note right of F: { Titulo, Descricao, Tipo, URL, TextoArtigo, ImagemUrl }
            
            API->>API: 14. Verifica autorização admin
            
            alt Admin autorizado
                API->>API: 15. Valida conteúdo por tipo
                Note right of API: Vídeo=URL obrigatória, Artigo=Texto obrigatório
                
                alt Conteúdo válido
                    API->>DB: 16. Salva conteúdo educacional
                    DB-->>API: 17. Conteúdo salvo (ID gerado)
                    
                    API-->>F: 18. 201 Created + conteúdo
                    F->>F: 19. Redireciona para lista
                    F-->>A: 20. Sucesso "Conteúdo criado"
                    
                else Conteúdo inválido
                    API-->>F: 21. 400 Bad Request
                    F-->>A: 22. Erros de validação
                end
                
            else Não é admin
                API-->>F: 23. 401 Unauthorized
                F-->>A: 24. Erro "Acesso negado"
            end
            
        else Dados inválidos
            F-->>A: 25. Exibe erros do formulário
        end
        
    else Não é admin
        Auth->>F: 26. Redireciona para login
        F-->>A: 27. Tela de login
    end
```

## 4. Fluxo de Visualização do Mapa de Pontos de Coleta

```mermaid
sequenceDiagram
    participant U as 👤 Usuário
    participant F as 🌐 Frontend
    participant Map as 🗺️ Leaflet Map
    participant API as 🔧 Backend API
    participant DB as 🗄️ Banco de Dados
    participant Geo as 📍 Geolocation API
    
    Note over U,Geo: Visualização Interativa do Mapa
    
    U->>F: 1. Acessa página do mapa
    F->>Map: 2. Inicializa mapa Leaflet
    
    par Carrega pontos de coleta
        F->>API: 3. GET /api/CollectionPoint
        API->>DB: 4. Busca todos os pontos ativos
        DB-->>API: 5. Lista de pontos
        API-->>F: 6. Retorna pontos com coordenadas
        F->>Map: 7. Adiciona marcadores no mapa
    and Obtém localização do usuário
        F->>Geo: 8. navigator.geolocation.getCurrentPosition()
        Geo-->>F: 9. Coordenadas do usuário
        F->>Map: 10. Centraliza mapa na localização
    end
    
    Map-->>U: 11. Mapa carregado com pontos
    
    U->>Map: 12. Clica em marcador do ponto
    Map->>F: 13. Evento de clique
    F->>F: 14. Exibe popup com informações
    Note right of F: Nome, endereço, tipos aceitos, distância
    
    opt Usuário quer mais detalhes
        U->>F: 15. Clica "Ver detalhes"
        F->>API: 16. GET /api/CollectionPoint/{id}
        API->>DB: 17. Busca detalhes do ponto
        DB-->>API: 18. Dados completos do ponto
        API-->>F: 19. Detalhes do ponto
        F-->>U: 20. Modal com informações completas
    end
    
    opt Usuário quer navegar até o ponto
        U->>F: 21. Clica "Como chegar"
        F->>F: 22. Abre Google Maps/Waze
        Note right of F: URL: maps.google.com/dir/current+location/lat,lng
    end
    
    opt Admin quer gerenciar pontos
        U->>F: 23. Clica "Gerenciar Pontos" (se admin)
        F->>F: 24. Verifica permissão de admin
        alt É Admin
            F->>F: 25. Redireciona para /collection-points
        else Não é admin
            F->>F: 26. Botão não visível (useIsAdmin)
        end
    end
```

## Descrição dos Fluxos

### 🔐 **Fluxo de Autenticação**
- **Validação em camadas**: Frontend → Backend → Banco
- **Segurança**: Hash de senha, JWT com expiração
- **UX**: Mensagens de erro específicas e redirecionamento

### ♻️ **Registro de Ação de Reciclagem**
- **Gamificação automática**: Cálculo de pontos e badges
- **Validação de negócio**: Verificação de pontos de coleta
- **Feedback imediato**: Pontos ganhos e conquistas

### 📚 **Criação de Conteúdo (Admin)**
- **Controle de acesso**: Verificação de permissão admin
- **Upload de arquivos**: Gestão de imagens
- **Validação por tipo**: Regras específicas por tipo de conteúdo

### 🗺️ **Mapa Interativo**
- **Carregamento paralelo**: Pontos e geolocalização simultâneos
- **Interatividade**: Popups, detalhes, navegação
- **Responsividade**: Adaptação para mobile e desktop