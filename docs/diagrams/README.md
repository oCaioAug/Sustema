# Diagramas do Sistema Sustema

Este diretório contém todos os diagramas UML e documentação visual do sistema Sustema.

## 📁 Estrutura

```
docs/diagrams/
├── use-cases/           # Diagramas de Caso de Uso
│   ├── sustema-use-cases.puml     # PlantUML
│   └── sustema-use-cases.mermaid  # Mermaid
├── class-diagrams/      # Diagramas de Classe
│   ├── domain-model.puml          # PlantUML
│   └── domain-model.mermaid       # Mermaid
├── sequence-diagrams/   # Diagramas de Sequência (futuro)
└── README.md           # Este arquivo
```

## 🛠️ Ferramentas

### PlantUML (.puml)
Os diagramas são criados em **PlantUML** (arquivos `.puml`) por oferecer:
- ✅ Versionamento com Git
- ✅ Integração com VS Code
- ✅ Geração automática de imagens
- ✅ Fácil manutenção e edição

### Mermaid (.mermaid)
Também disponibilizamos em **Mermaid** (arquivos `.mermaid`) que oferece:
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
- Abra um arquivo `.mermaid`
- Use preview integrado

#### 2. **GitHub/GitLab**
- Os arquivos `.mermaid` são renderizados automaticamente
- Podem ser incluídos diretamente em README.md

#### 3. **Online**
- Acesse: https://mermaid.live/
- Cole o código do arquivo `.mermaid`

## 📊 Diagramas Disponíveis

### 1. Casos de Uso
- **PlantUML**: `use-cases/sustema-use-cases.puml`
- **Mermaid**: `use-cases/sustema-use-cases.mermaid`
- Atores: Cidadão, Empresa, Admin
- Casos de uso principais do sistema
- Permissões por perfil de usuário

### 2. Diagrama de Classes
- **PlantUML**: `class-diagrams/domain-model.puml`
- **Mermaid**: `class-diagrams/domain-model.mermaid`
- Modelo de domínio completo
- Entidades principais: User, CollectionPoint, RecyclingAction
- Relacionamentos e cardinalidades
- Enums: PerfilUsuario, ContentType

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

## 🔄 Atualização dos Diagramas

### Quando Atualizar
- ✅ Novos requisitos funcionais
- ✅ Mudanças no modelo de dados
- ✅ Novos atores ou casos de uso
- ✅ Alterações na arquitetura

### Como Atualizar
1. Edite o arquivo `.puml` ou `.mermaid` correspondente
2. Teste a visualização
3. Mantenha ambos os formatos sincronizados
4. Commit as mudanças no Git
5. Documente as alterações no PR/commit

## 📋 Convenções

### Nomenclatura
- **Arquivos**: `kebab-case.puml` / `kebab-case.mermaid`
- **Classes**: `PascalCase`
- **Atributos**: `camelCase`
- **Casos de Uso**: "Verbo + Objeto"

### Estilo
- Usar temas consistentes
- Incluir títulos em todos os diagramas
- Adicionar comentários/notas para esclarecimentos
- Usar emojis nos atores para facilitar identificação
- Manter cores e estilos padronizados

## 🚀 Próximos Passos

### Diagramas Planejados
- [ ] Diagrama de Sequência - Fluxo de Autenticação
- [ ] Diagrama de Sequência - Registro de Ação de Reciclagem
- [ ] Diagrama de Componentes - Arquitetura do Sistema
- [ ] Diagrama de Atividade - Processo de Gamificação

### Integração
- [ ] Configurar geração automática de imagens no CI/CD
- [ ] Incluir diagramas no README principal
- [ ] Criar documentação de API baseada nos diagramas
- [ ] Automatizar sincronização entre PlantUML e Mermaid