# Diagramas do Sistema Sustema

Este diretório contém todos os diagramas UML e documentação visual do sistema Sustema.

## 📁 Estrutura

```
docs/diagrams/
├── use-cases/                    # Diagramas de Caso de Uso
│   └── sustema-use-cases.md      # Casos de uso completos
├── class-diagrams/               # Diagramas de Classe
│   ├── domain-model.puml         # PlantUML (existente)
│   ├── domain-model.md           # Mermaid (existente)
│   └── sustema-domain-model.md   # Modelo completo em Mermaid
├── entity-relationship/          # Diagramas ER
│   └── sustema-erd.md           # Modelo de dados completo
├── sequence-diagrams/            # Diagramas de Sequência
│   └── sustema-sequence-flows.md # Fluxos principais do sistema
└── README.md                     # Este arquivo
```

## 🛠️ Ferramentas

### PlantUML (.puml)
Os diagramas são criados em **PlantUML** (arquivos `.puml`) por oferecer:
- ✅ Versionamento com Git
- ✅ Integração com VS Code
- ✅ Geração automática de imagens
- ✅ Fácil manutenção e edição

### Mermaid (.md)
Também disponibilizamos em **Mermaid** (arquivos `.md`) que oferece:
- ✅ Integração nativa com GitHub/GitLab
- ✅ Renderização automática em markdown
- ✅ Sintaxe mais simples
- ✅ Suporte nativo em muitas plataformas

## 🔍 Como Visualizar

### PlantUML

#### 1. **VS Code** (Recomendado)
- Instale a extensão: `PlantUML`
- Abra um arquivo `.puml`
- Use `Alt + D` para preview

#### 2. **Online**
- Acesse: https://www.plantuml.com/plantuml/uml/
- Cole o código do arquivo `.puml`

#### 3. **Local (Java)**
```bash
# Instalar PlantUML
java -jar plantuml.jar arquivo.puml
```

### Mermaid

#### 1. **VS Code**
- Instale a extensão: `Mermaid Editor`
- Abra um arquivo `.md` com diagramas Mermaid
- Use preview integrado

#### 2. **GitHub/GitLab**
- Os arquivos `.md` com diagramas são renderizados automaticamente
- Visualização direta no repositório

#### 3. **Online**
- Acesse: https://mermaid.live/
- Cole o código do diagrama Mermaid

## 📊 Diagramas Disponíveis

### 1. 🎯 Casos de Uso (`use-cases/sustema-use-cases.md`)
- **Atores**: Cidadão, Empresa, Admin
- **Funcionalidades por nível de acesso**
- **Casos de uso detalhados**
- **Matriz de permissões**

**Principais funcionalidades:**
- 🌐 Públicas: Cadastro, login, visualização de pontos e conteúdo
- 👤 Cidadão: Registro de ações, gamificação
- 👔 Empresa: Criação de pontos de coleta
- 🔧 Admin: Gestão completa do sistema

### 2. 🏗️ Diagrama de Classes (`class-diagrams/sustema-domain-model.md`)
- **Entidades principais**: User, CollectionPoint, RecyclingAction, GamificationRecord, EducationalContent
- **DTOs**: UserDto, RegisterRequest, LoginRequest
- **Enums**: PerfilUsuario, ContentType
- **Relacionamentos e cardinalidades**
- **Métodos de negócio**

**Padrões implementados:**
- Repository Pattern
- DTO Pattern
- Service Layer
- Enum Pattern

### 3. 🗃️ Entidade Relacionamento (`entity-relationship/sustema-erd.md`)
- **Estrutura completa do banco de dados**
- **Relacionamentos 1:N e N:M**
- **Índices para performance**
- **Constraints e validações**
- **Sistema de badges (USER_BADGE)**

**Tabelas principais:**
- USER (usuários e perfis)
- COLLECTION_POINT (pontos de coleta)
- RECYCLING_ACTION (ações de reciclagem)
- GAMIFICATION_RECORD (sistema de pontos)
- EDUCATIONAL_CONTENT (conteúdo educativo)

### 4. 🔄 Diagramas de Sequência (`sequence-diagrams/sustema-sequence-flows.md`)
- **Fluxo de Autenticação**: Login completo com JWT
- **Registro de Ação de Reciclagem**: Com gamificação automática
- **Criação de Conteúdo Educacional**: Fluxo administrativo
- **Visualização do Mapa**: Interação com pontos de coleta

**Aspectos cobertos:**
- Validação em camadas
- Segurança e autorização
- Gamificação em tempo real
- Upload de arquivos
- Geolocalização

## ⚖️ Comparação: PlantUML vs Mermaid

| Aspecto | PlantUML | Mermaid |
|---------|----------|---------|
| **Sintaxe** | Mais complexa, mais poderosa | Simples e intuitiva |
| **GitHub Integration** | Requer extensão/plugin | Nativo |
| **Customização** | Muito alta | Moderada |
| **Curva de Aprendizado** | Maior | Menor |
| **Tipos de Diagrama** | Mais tipos suportados | Tipos principais |
| **Performance** | Mais lenta (Java) | Mais rápida (JavaScript) |

## 📋 Quando Usar Cada Um?

### Use **PlantUML** quando:
- ✅ Precisar de máxima customização
- ✅ Criar diagramas complexos
- ✅ Trabalhar com equipes técnicas
- ✅ Precisar de tipos específicos de diagrama

### Use **Mermaid** quando:
- ✅ Quiser integração nativa com GitHub
- ✅ Priorizar simplicidade
- ✅ Criar documentação rápida
- ✅ Trabalhar com equipes mistas

## 🎯 Matriz de Funcionalidades por Diagrama

| Funcionalidade | Casos de Uso | Classes | ER | Sequência |
|----------------|:------------:|:-------:|:--:|:---------:|
| **Autenticação** | ✅ | ✅ | ✅ | ✅ |
| **Gestão de Usuários** | ✅ | ✅ | ✅ | - |
| **Pontos de Coleta** | ✅ | ✅ | ✅ | ✅ |
| **Ações de Reciclagem** | ✅ | ✅ | ✅ | ✅ |
| **Gamificação** | ✅ | ✅ | ✅ | ✅ |
| **Conteúdo Educacional** | ✅ | ✅ | ✅ | ✅ |
| **Controle de Acesso** | ✅ | ✅ | ✅ | ✅ |
| **Geolocalização** | ✅ | ✅ | ✅ | ✅ |

## 🔄 Atualização dos Diagramas

### Quando Atualizar
- ✅ Novos requisitos funcionais
- ✅ Mudanças no modelo de dados
- ✅ Novos atores ou casos de uso
- ✅ Alterações na arquitetura
- ✅ Novos fluxos de negócio

### Como Atualizar
1. Edite o arquivo `.puml` ou `.md` correspondente
2. Teste a visualização no VS Code ou online
3. Mantenha consistência entre diagramas relacionados
4. Commit as mudanças no Git
5. Documente as alterações no PR/commit

### Checklist de Consistência
- [ ] Nomes de entidades consistentes entre diagramas
- [ ] Relacionamentos alinhados entre Classes e ER
- [ ] Casos de uso refletidos nos fluxos de sequência
- [ ] Perfis de usuário consistentes em todos os diagramas

## 📋 Convenções

### Nomenclatura
- **Arquivos**: `kebab-case.md` ou `kebab-case.puml`
- **Classes**: `PascalCase`
- **Atributos**: `camelCase`
- **Casos de Uso**: "Verbo + Objeto"
- **Tabelas**: `UPPER_CASE` (no ER)

### Estilo
- Usar temas consistentes
- Incluir títulos em todos os diagramas
- Adicionar comentários/notas para esclarecimentos
- Usar emojis nos atores e seções para facilitar identificação
- Manter cores e estilos padronizados

### Estrutura de Arquivos
- Um diagrama principal por arquivo
- Documentação explicativa junto com o diagrama
- Versionamento através do Git
- README em cada subdiretório se necessário

## 🚀 Próximos Passos

### Diagramas Complementares
- [ ] Diagrama de Componentes - Arquitetura do Sistema
- [ ] Diagrama de Atividade - Processo de Gamificação
- [ ] Diagrama de Estado - Ciclo de vida dos pontos de coleta
- [ ] Diagrama de Comunicação - Interação entre serviços

### Melhorias Planejadas
- [ ] Diagramas de infraestrutura (deployment)
- [ ] Fluxos de erro e exceções
- [ ] Diagramas de segurança e autenticação
- [ ] Modelos de dados históricos

### Integração
- [ ] Configurar geração automática de imagens no CI/CD
- [ ] Incluir diagramas no README principal do projeto
- [ ] Criar documentação de API baseada nos diagramas
- [ ] Automatizar sincronização entre PlantUML e Mermaid
- [ ] Validação automática de consistência entre diagramas

## 📖 Guia de Leitura Recomendado

Para melhor compreensão do sistema, sugerimos a seguinte ordem de leitura:

1. **Casos de Uso** - Entenda o que o sistema faz
2. **Diagrama de Classes** - Compreenda a estrutura do código
3. **Entidade Relacionamento** - Visualize o modelo de dados
4. **Diagramas de Sequência** - Veja como tudo funciona em tempo de execução

Esta documentação visual serve como referência técnica completa para desenvolvedores, analistas e stakeholders do projeto Sustema.