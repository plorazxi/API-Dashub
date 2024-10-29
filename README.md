
# API do Dashub

Esta é a parte back-end de um trabalho da faculdade de Engenharia de Software da matéria de programação WEB.
Neste trabalho, tinhamos que criar uma aplicação WEB com modelo de Dashbards.

Então, eu e [Paulo Ávila](https://github.com/paulinbrgamer) criamos este app, o Dashub.
Eu fiquei reponsável por esta parte, o back-end, e ele pelo front-end.

Este app consegue criar diversos dashbords, dentro deles, é possível criar varios graficos, dentre eles de pizza, de colunas e entre outros.
Além disso, tem um sistema de autenticação de usuários com tokens, ou seja, no momento do login é retornado um token e, somente com ele, é possível fazer a requisição das outras rotas.
## Aprendizados

Neste projeto, aprendi a utilizar o Typescript, uma linguagem de tipagem do Javascript.

Aprendi a utilizar o `prisma`, um ORM, utilizado para fazer as relações com o banco de dados (criar, deletar, inserir).

Além disso, aprendi a criar tipagens com o `zod`, uma biblioteca para fazer a tipagem dos objetos.

Outra coisa que foi utilizada, porém já tinha conhecimento, foi as bibliotecas de criptgrafia, o `bcrypt`, que faz o hash da senha para salvar no banco de dados e faz as comparações com as novas requisições, e o `jsonwebtoken`, que cria e valida os tokens.
## Estruturas de pastas

- `DOCS/` --> É a pasta onde contém documentada todas as rotas que este servidor fornece.
- `prisma/` --> É a pasta onde contém todas as migrations e configurações do Banco de Dados.
- `src/` --> É a pasta que contém todo o codigo fonte do servidor
    - `interfaces/` --> Pasta contendo as interfaces e tipos criados (criados com o `zod`).
    - `routes/` --> Pasta contendo as rotas do servidor.
      - `auth.ts` --> Rotas de autenticação.
      - `dash.ts` --> Rotas com relação aos Dashboards.
      - `graph.ts` --> Rotas com relação aos graficos. 
    - `env.ts` --> Arquivo que processa as variaveis de ambiente e salva dentro da const `ENV`.
    - `main.ts` --> Arquivo contendo o servidor principal.
- `.env.example` --> Arquivo contendo um exemplo de variaveis que precisam conter no `.env`.
- `package.json` --> Arquivo contendo todas as dependências do codigo.
- `tsconfig.json` --> Arquivo contendo as configurações do Typescript.

## Documentação

[DOCS](https://github.com/plorazxi/API-Dashub/tree/main/DOCS) - pasta com as rotas exemplificadas


## Rotas

### Auth - de autenticação

#### Registro de usuário

```http
  POST /auth/register
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**. O nome do usuário |
| `email` | `string` | **Obrigatório**. O email do usuário |
| `senha` | `string` | **Obrigatório**. A senha do usuário |

#### Login do usuário

```http
  POST /auth/login
```

| Parâmetro   | Tipo       | Descrição                  |
| :---------- | :--------- | :------------------------- |
| `email` | `string` | **Obrigatório**. O email do usuário |
| `senha` | `string` | **Obrigatório**. A tentativa da senha |

#### Esqueci minha senha

```http
  PUT auth/esqueci-senha
```

| Parâmetro   | Tipo       | Descrição  |
| :---------- | :--------- | :------------------------------- |
| `email` | `string` | **Obrigatório**. O email do usuário |
| `senha` | `string` | **Obrigatório**. A nova senha do usuário |

#### Mudar nome

```http
  PUT /auth/mudar-nome
```

| Parâmetro   | Tipo       | Descrição  |
| :---------- | :--------- | :------------------------------- |
| `email` | `string` | **Obrigatório**. O email do usuário |
| `senha` | `string` | **Obrigatório**. A senha do usuário |
| `nome` | `string` | **Obrigatório**. O novo nome |


#### Mudar email

```http
  PUT /auth/mudar-email
```

| Parâmetro   | Tipo       | Descrição  |
| :---------- | :--------- | :------------------------------- |
| `email` | `string` | **Obrigatório**. O email antigo do usuário |
| `email_novo` | `string` | **Obrigatório**. O novo email do usuário |
| `senha` | `String` | **Obrigatório**. A senha do usuário |

### Dash - relacionada aos dashboards

#### Pegar os dashboards do usuário

```http
  GET /dash/${token}
```

| Parâmetro   | Tipo       | Descrição  |
| :---------- | :--------- | :------------------------------- |
| `token` | `string` | **Obrigatório**. O token vindo da autenticação |

#### Criar dashboard

```http
  POST /dash/create
```

| Parâmetro   | Tipo       | Descrição  |
| :---------- | :--------- | :------------------------------- |
| `nome` | `string` | **Obrigatório**. O o nome do novo dashboard |
| `token` | `String` | **Obrigatório**. O token vindo da autenticação |

#### Alterar o nome do dashboard

```http
  PUT /dash/mudar-nome
```

| Parâmetro   | Tipo       | Descrição  |
| :---------- | :--------- | :------------------------------- |
| `id` | `Int` | **Obrigatório**. O ID do dashboard |
| `novo_nome` | `String` | **Obrigatório**. O novo nome do dashboard |
| `token` | `string` | **Obrigatório**. O token vindo da autenticação |

#### Deletar o dashboard

```http
  DELETE /dash/delete
```

| Parâmetro   | Tipo       | Descrição  |
| :---------- | :--------- | :------------------------------- |
| `id` | `Int` | **Obrigatório**. O ID do dashboard |
| `token` | `string` | **Obrigatório**. O token vindo da autenticação |

### Graph - relacionada aos graficos

#### Pegar os graficos do dashboard

```http
  POST /graph/
```

| Parâmetro   | Tipo       | Descrição  |
| :---------- | :--------- | :------------------------------- |
| `dashId` | `Int` | **Obrigatório**. O ID do dashboard |
| `token` | `string` | **Obrigatório**. O token vindo da autenticação |

#### Criar um grafico

```http
  POST /graph/create
```

| Parâmetro   | Tipo       | Descrição  |
| :---------- | :--------- | :------------------------------- |
| `nome` | `string` | **Obrigatório**. O nome do grafico |
| `tipo` | `string` | **Obrigatório**. O tipo do grafico |
| `ordem` | `string` | **Obrigatório**. A ordem do grafico (crescente ou descrescente) |
| `elementos` | `string[]` | **Obrigatório**. Lista dos nomes dos dados |
| `dados` | `string[]` | **Obrigatório**. Lista dos valores dos dados |
| `cores` | `string[]` | **Obrigatório**. Lista com as cores dos dados |
| `dashId` | `Int` | **Obrigatório**. O ID do dashboard a qual pertence |
| `token` | `string` | **Obrigatório**. O token vindo da autenticação |

#### Deletar um grafico

```http
  DELETE /graph/delete
```

| Parâmetro   | Tipo       | Descrição  |
| :---------- | :--------- | :------------------------------- |
| `id` | `Int` | **Obrigatório**. O ID do grafico |
| `token` | `string` | **Obrigatório**. O token vindo da autenticação |
 
## Testando o projeto

Para testar este projeto, basta acessar o front-end criado pelo [Paulo Ávila](https://github.com/paulinbrgamer).

Segue o link do repositório: https://github.com/paulinbrgamer/DasHub

Segue o link do site: https://dashbub.netlify.app
    
## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/plorazxi/API-Dashub
```

Entre no diretório do projeto

```bash
  cd API-Dashub
```

Instale as dependências

```bash
  npm install
```

Crie o arquivo `.env` e adicione as variaveis de ambiente

```
PORT = ""
DATABASE_URL = ""
SECRETKEY = ""
```

A `DATABASE_URL` deve ser uma url para um banco de dados **postgreSQL**

A chave secreta (`SECRETKEY`) pode ser criada aleatoriamente pelo seguinte comando

```node
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Crie o build do projeto (a converção do código Typescript para Javascript)

```bash
  npm run build
```

Configure o Banco de dados

```bash
  npm run migrate
```

E, finalmente, inicie o servidor

```bash
  npm run start
```

