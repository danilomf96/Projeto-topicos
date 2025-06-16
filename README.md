# 🛒 Projeto: Mercadinho.API

Sistema de gerenciamento de produtos para um mercadinho.

## ✅ Tecnologias usadas

- **Back-end:** .NET 8 Minimal API com SQLite
- **Front-end:** React + TypeScript + Material UI + Axios

---

## ✅ Requisitos antes de começar

- .NET SDK 8 instalado → https://dotnet.microsoft.com/download
- Node.js (16.x ou superior) → https://nodejs.org/en/download/

---

## ✅ Como Rodar o Back-end (.NET 8 API)

1. No terminal, navegue até a pasta do back-end:

cd Mercadinho.API


Restaure os pacotes:

dotnet restore


Crie o banco de dados:

dotnet ef database update


Execute a API:

dotnet run

A API será executada em:

http://localhost:5035

(Se aparecer outra porta no terminal, use a porta mostrada pelo comando dotnet run.)


## ✅ Como Executar o Front-end (React + TypeScript)

Navegue até a pasta do front-end:

cd front-end


Instale as dependências:

npm install

Importe o Axios:

npm install axios


Configure o endereço da API:
Abra o arquivo onde o Axios foi configurado (src/api.ts) e ajuste a URL base, se necessário:

const api = axios.create({
  baseURL: 'http://localhost:5035'
});


Execute o front-end:

npm start
