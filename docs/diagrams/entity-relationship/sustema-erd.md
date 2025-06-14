# Diagrama Entidade Relacionamento - Sistema Sustema

```mermaid
erDiagram
    %% Entidade User
    USER {
        int UserId PK
        string Nome
        string Email UK
        string PasswordHash
        int Perfil "0=Cidadao, 1=Empresa, 2=Admin"
        datetime DataCadastro
    }
    
    %% Entidade CollectionPoint
    COLLECTION_POINT {
        int CollectionPointId PK
        string Nome
        string Endereco
        double Latitude
        double Longitude
        string Descricao
        string TipoMaterialAceito
        datetime DataCriacao
    }
    
    %% Entidade RecyclingAction
    RECYCLING_ACTION {
        int RecyclingActionId PK
        int UserId FK
        int CollectionPointId FK
        datetime Data
        string TipoMaterial
        decimal Quantidade
        string UnidadeMedida
    }
    
    %% Entidade GamificationRecord
    GAMIFICATION_RECORD {
        int GamificationRecordId PK
        int UserId FK
        int Pontos
        string Badges "JSON string"
        datetime DataRegistro
        datetime UltimaAtualizacao
    }
    
    %% Entidade EducationalContent
    EDUCATIONAL_CONTENT {
        int ContentId PK
        string Titulo
        string Descricao
        int Tipo "0=Texto, 1=Imagem, 2=Video, 3=Audio, 4=Artigo, 5=Infografico"
        string URL
        string TextoArtigo
        string ImagemUrl
        datetime DataPublicacao
        string Autor
        int Visualizacoes
        bool IsPublished
    }
    
    %% Entidade BadgeInfo (Sistema de Badges)
    BADGE_INFO {
        int BadgeId PK
        string Nome UK
        string Descricao
        string Icone
        int PontosNecessarios
        string Categoria
        bool IsRare
        datetime DataCriacao
    }
    
    %% Entidade UserBadge (Relacionamento Many-to-Many)
    USER_BADGE {
        int UserBadgeId PK
        int UserId FK
        int BadgeId FK
        datetime DataConquista
        bool IsActive
    }
    
    %% Relacionamentos 1:N
    USER ||--o{ RECYCLING_ACTION : "realiza"
    COLLECTION_POINT ||--o{ RECYCLING_ACTION : "recebe"
    USER ||--o| GAMIFICATION_RECORD : "possui"
    
    %% Relacionamentos N:M
    USER ||--o{ USER_BADGE : "conquista"
    BADGE_INFO ||--o{ USER_BADGE : "é conquistada por"
    
    %% Índices e Constraints
    USER {
        index idx_user_email "Email"
        index idx_user_perfil "Perfil"
    }
    
    RECYCLING_ACTION {
        index idx_recycling_user "UserId"
        index idx_recycling_point "CollectionPointId"
        index idx_recycling_data "Data"
        index idx_recycling_material "TipoMaterial"
    }
    
    COLLECTION_POINT {
        index idx_point_location "Latitude, Longitude"
        index idx_point_material "TipoMaterialAceito"
    }
    
    EDUCATIONAL_CONTENT {
        index idx_content_tipo "Tipo"
        index idx_content_published "IsPublished"
        index idx_content_data "DataPublicacao"
    }
    
    GAMIFICATION_RECORD {
        index idx_gamification_user "UserId"
        index idx_gamification_pontos "Pontos"
    }
```

## Descrição do Modelo de Dados

### 📊 **Estrutura das Tabelas**

#### **USER** - Tabela Principal de Usuários
- **Chave Primária**: UserId (auto increment)
- **Chave Única**: Email (não permite duplicação)
- **Campos obrigatórios**: Nome, Email, PasswordHash, Perfil
- **Perfil**: Enum (0=Cidadão, 1=Empresa, 2=Admin)

#### **COLLECTION_POINT** - Pontos de Coleta
- **Chave Primária**: CollectionPointId
- **Geolocalização**: Latitude/Longitude para mapeamento
- **Índice espacial**: Para consultas de proximidade

#### **RECYCLING_ACTION** - Ações de Reciclagem
- **Chaves Estrangeiras**: UserId, CollectionPointId
- **Relacionamento**: Muitas ações para um usuário e um ponto
- **Constraints**: Quantidade > 0, Data <= DataAtual

#### **GAMIFICATION_RECORD** - Sistema de Pontuação
- **Relacionamento 1:1**: Um registro por usuário
- **Badges**: Armazenado como JSON string
- **Auditoria**: Campos de criação e atualização

#### **EDUCATIONAL_CONTENT** - Conteúdo Educacional
- **Tipos suportados**: Enum com 6 tipos diferentes
- **Campos condicionais**: URL para vídeos, TextoArtigo para artigos
- **Controle de publicação**: IsPublished para drafts

### 🔗 **Relacionamentos**

#### **1:N (Um para Muitos)**
- User → RecyclingAction (Um usuário, muitas ações)
- CollectionPoint → RecyclingAction (Um ponto, muitas ações)
- User → GamificationRecord (Um usuário, um registro)

#### **N:M (Muitos para Muitos)**
- User ↔ BadgeInfo (via USER_BADGE)
- Usuários podem ter múltiplas badges
- Badges podem ser conquistadas por múltiplos usuários

### 📈 **Índices para Performance**

#### **Consultas Frequentes**
- Busca por email (login)
- Ações por usuário (histórico)
- Pontos por localização (mapa)
- Conteúdo por tipo (filtros)

#### **Otimizações**
- Índice composto para geolocalização
- Índice por data para relatórios temporais
- Índice por tipo de material para estatísticas

### 🛡️ **Constraints e Validações**

#### **Integridade Referencial**
- Cascade delete: User → RecyclingAction
- Restrict delete: CollectionPoint (se tiver ações)
- Soft delete: EducationalContent (IsPublished = false)

#### **Validações de Negócio**
- Email único por usuário
- Quantidade de reciclagem > 0
- Data da ação <= data atual
- Coordenadas válidas (-90 a 90, -180 a 180)