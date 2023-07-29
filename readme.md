# Pharmacy Central System API

O Pharmacy Central System API é uma excelente solução para cadastro de usuários, depósitos e medicamentos.

## Descrição do Projeto

O Pharmacy Central System API é uma API desenvolvida em JavaScript usando o framework Express.js para permitir o cadastro e gerenciamento de usuários, depósitos e medicamentos. Os dados são armazenados localmente em um banco de dados relacional com o SGBD PostgreSQL e o ORM Sequelize para facilitar o acesso e manipulação dos dados no banco.

## Como executar

1. Faça o download ou clone do repositório através do GitHub.
2. Dentro da pasta raiz do repositório, execute o comando `npm i` para instalar todas as dependências necessárias.
3. Crie o arquivo .env na pasta raiz do projeto e certifique-se declarar as variáveis de ambiente corretamente.
4. Após instalar as dependências e configurar as variáveis de ambiente, você pode executar a aplicação em modo de desenvolvimento usando o comando `npm run start:dev` dentro da mesma pasta.
5. A API estará disponível em http://localhost:3333. Utilize os endpoints abaixo para fazer requisições à API.

## Endpoints

- Todos os endpoints são privados (exigem token jwt) com exceção do cadastro de usuário e login (gera o token).
- Certifique-se de fornecer o token através de Authorization no header da request para endpoints privados. O token tem validade de um dia.
- Certifique-se de sempre enviar um JSON formatado corretamente no body da request.

#### Usuário

- HTTP POST http://localhost:3333/api/usuarios - cadastrar usuário.
- HTTP POST http://localhost:3333/api/usuarios/login - fazer login.
- HTTP PATCH http://localhost:3333/api/usuarios/:identificador - atualizar dados do usuário.
- HTTP PATCH http://localhost:3333/api/usuarios/:identificador/status - atualizar status do usuário.
- HTTP PATCH http://localhost:3333/api/usuarios/:identificador/senha - alterar senha do usuário.
- HTTP GET http://localhost:3333/api/usuarios/:identificador - listar dados do usuário.

#### Depósito

- HTTP POST http://localhost:3333/api/depositos - cadastrar depósito.
- HTTP PATCH http://localhost:3333/api/depositos/:identificador - atualizar dados do depósito.
- HTTP PATCH http://localhost:3333/api/depositos/:identificador/status - atualizar status do depósito.
- HTTP GET http://localhost:3333/api/depositos - listar dados de todos os depósitos.
  - query param opcional: /api/depositos?status=ATIVO ou INATIVO
- HTTP GET http://localhost:3333/api/depositos/:identificador - listar dados do depósito.
- HTTP DELETE http://localhost:3333/api/depositos/:identificador - excluir depósito.

#### Medicamento

- HTTP POST http://localhost:3333/api/medicamentos - cadastrar medicamento.
- HTTP PATCH http://localhost:3333/api/medicamentos/:identificador - atualizar dados do medicamento.
- HTTP GET http://localhost:3333/api/medicamentos - listar dados de todos os medicamentos.
  - query param opcional: /api/medicamentos?tipo=CONTROLADO ou NAOCONTROLADO
- HTTP GET http://localhost:3333/api/medicamentos/:identificador - listar dados do medicamento.
- HTTP DELETE http://localhost:3333/api/medicamentos/:identificador - excluir medicamento.

## Tecnologias

- Linguagem: JavaScript
- Framework: Express.js
- SGBD: PostgreSQL
- ORM: Sequelize
- Pacotes Adicionais: dotenv, jsonwebtoken

## Sobre o Pharmacy Central System API

Ainda é uma versão bastante inicial do projeto portanto muitas funcionalidades e melhorias ainda podem ser adicionadas, principalmente melhorias na parte das models e migrations.
