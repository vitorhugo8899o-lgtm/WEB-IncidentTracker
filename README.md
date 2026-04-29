<div align="center">
  <img width="558" height="447" alt="nexus-logo" src="https://github.com/user-attachments/assets/ea53e544-21cc-45a1-8b98-e6d2395cd7fb" />
</div>

# Nexus Tracker (Frontend)

O **Nexus Tracker** é a interface web do sistema de gestão de incidentes, projetada para fornecer uma experiência intuitiva e eficiente no suporte pós-venda. A aplicação permite que usuários registrem chamados e que técnicos e supervisores realizem o gerenciamento completo desses incidentes.

---

##  Arquitetura

A aplicação frontend se comunica com a API backend via HTTP, seguindo o modelo:

```text
Frontend (React + Vite)
        ↓
     API REST (FastAPI)
        ↓
     Banco de Dados
```

* Comunicação baseada em **requisições HTTP com autenticação via cookies**
* Separação clara entre camada de apresentação (frontend) e lógica de negócio (backend)

---

## 🚀 Funcionalidades

* Interface para criação e acompanhamento de chamados
* Dashboard dinâmico com renderização condicional por tipo de usuário
* Área técnica para resolução e análise de incidentes
* Painel administrativo para gestão de usuários
* Visualização de métricas e desempenho
* Navegação fluida com roteamento client-side

---

##  Tecnologias Utilizadas

| Tecnologia              | Descrição                                         |
| :---------------------- | :------------------------------------------------ |
| **React.js**            | Biblioteca principal para construção da interface |
| **Vite**                | Bundler moderno com foco em performance           |
| **React Router DOM**    | Gerenciamento de rotas SPA                        |
| **CSS / UI Responsiva** | Interface adaptável com foco em UX                |
| **JavaScript (ES6+)**   | Lógica da aplicação                               |

---

##  Autenticação

A autenticação é baseada em **cookies HttpOnly**, fornecidos pelo backend.

### Fluxo:

1. Usuário realiza login
2. Backend retorna cookie seguro
3. Frontend utiliza automaticamente o cookie nas requisições subsequentes
4. Rotas protegidas são renderizadas com base no estado do usuário

---

##  Rotas da Aplicação

| Rota                   | Componente         | Descrição                                    |
| :--------------------- | :----------------- | :------------------------------------------- |
| `/`                    | `App.jsx`          | Landing Page institucional                   |
| `/login`               | `LoginPage`        | Autenticação de usuários                     |
| `/contas/criar`        | `RegisterPage`     | Criação de conta                             |
| `/home`                | `HomeNexusTracker` | Dashboard principal (condicional por perfil) |
| `/buscar-chamado`      | `FetchCall`        | Busca de chamados (Técnico/Supervisor)       |
| `/resolver-chamado`    | `ResolverChamado`  | Resolução de incidentes                      |
| `/metricas`            | `MetricsPage`      | Visualização de métricas                     |
| `/historico`           | `HistoryPage`      | Histórico de chamados                        |
| `/buscar-usuario`      | `UserSearchPage`   | Consulta de usuários (Supervisor)            |
| `/desabilitar-usuario` | `DisableUserPage`  | Gerenciamento de acesso (Supervisor)         |

---

##  Integração com Backend

A API backend está disponível em:

 https://github.com/vitorhugo8899o-lgtm/Incident-Tracker-with-FastAPI

Certifique-se de que o backend esteja em execução antes de iniciar o frontend.

---

##  Interface

### Landing Page

<img width="1000" height="800" alt="LandingPage" src="https://github.com/user-attachments/assets/600ac7be-74d7-4719-922a-957ec1626e6c" />

---

### Dashboard e Chamados

<img width="1000" height="800" alt="PainelSupervisor" src="https://github.com/user-attachments/assets/f206ba20-d3f0-40e3-b3a1-37ba3d5e339d" />
<img width="1000" height="800" alt="Chamado" src="https://github.com/user-attachments/assets/af562813-25ed-4b4c-aabd-2c5f698aa8d8" />

---

### Autenticação

<img width="1000" height="800" alt="Login" src="https://github.com/user-attachments/assets/be4b63bc-6087-4b35-9379-80bd7ad8a8cd" />
<img width="1000" height="800" alt="CreateAccount" src="https://github.com/user-attachments/assets/daa42982-e445-4439-b349-e09b839b2c21" />

---

### Administração

<img width="1000" height="800" alt="DesabilitarUser" src="https://github.com/user-attachments/assets/51061c18-41ff-4ecd-8a03-93692f77899e" />
<img width="1000" height="800" alt="BuscarUser" src="https://github.com/user-attachments/assets/37fa89ad-9a94-4e9d-8c73-8e5163ff5efb" />

---

##  Configuração

Caso necessário, configure a URL da API no frontend:

```env
VITE_API_URL=http://localhost
```

---

##  Como Executar

### Pré-requisitos

* Node.js (v18+ recomendado)
* npm ou yarn

### Passos

1. Clone o repositório:

```bash
git clone https://github.com/vitorhugo8899o-lgtm/WEB-IncidentTracker
```

2. Acesse a pasta do projeto:

```bash
cd WEB-IncidentTracker
```

3. Instale as dependências:

```bash
npm install
```

4. Execute a aplicação:

```bash
npm run dev
```

---

###  Acesso

* Aplicação: http://localhost:5173

---

##  Testes e Validação

* Validação de rotas protegidas via estado de autenticação
* Integração com backend via fetch API
* Testes podem ser adicionados futuramente com ferramentas como Jest ou React Testing Library

---

##  Boas Práticas Aplicadas

* Separação de responsabilidades (componentes, páginas, serviços)
* Componentização reutilizável
* Controle de estado para autenticação
* Navegação SPA otimizada
* Código modular e escalável
