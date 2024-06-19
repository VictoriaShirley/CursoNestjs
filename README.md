# Gerenciador de Tarefas com NestJS 📝

Este repositório contém o código-fonte de um curso de NestJS no [YouTube](https://youtube.com/playlist?list=PLpcf8hdkpCYseV2ctwAhE4dY-AQ7v5D9S&feature=shared), onde desenvolvemos um gerenciador de tarefas completo com autenticação de usuários e integração com o banco de dados PostgreSQL usando TypeORM.

## Visão Geral 👀

O objetivo deste curso é ensinar como criar uma aplicação back-end robusta utilizando o framework NestJS. Durante o curso, abordamos os seguintes tópicos:

- Criação de uma API para gerenciar tarefas e usuários.
- Implementação de autenticação e autorização.
- Boas práticas de desenvolvimento com NestJS.

Obs: no main, o código foi criado para armazenamento em memória e na develop foi feita a conexão com o Banco de Dados.

## Funcionalidades 🔍

- **Gerenciamento de Tarefas**: Criação, leitura, atualização e exclusão de tarefas.
- **Autenticação de Usuários**: Registro e login de usuários.
- **Autorização**: Controle de acesso baseado em papéis (roles).
- **Armazenamento em Memória**: Dados armazenados em estruturas de dados na memória.

## Tecnologias Utilizadas 👩‍💻

- [NestJS](https://nestjs.com/)

## Pré-requisitos ✅

Antes de começar, certifique-se de ter instalado em sua máquina:

- Node.js (versão 14 ou superior)
- NPM ou Yarn

## Instalação ⬇️

1. Clone o repositório e instale as dependências:


```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio


npm install
# ou
yarn install

```

## Configurando as variáveis de ambiente: ⚙️

Crie um arquivo .env na raiz do projeto e adicione as seguintes configurações:

```bash
env

JWT_SECRET=uma_chave_secreta

```


## Executando a Aplicação ▶️

Para iniciar a aplicação em modo de desenvolvimento, execute:

```bash

npm run start:dev
# ou
yarn start:dev

```

A aplicação estará disponível em http://localhost:3000.
Você pode testar a API usando o [Insomnia](https://insomnia.rest/) ou qualquer outra ferramenta de sua escolha.