# Desafio-Fullstack-Alex-sampaio-lima
Entrega 1 | Tech | 🏁 Desafio Fullstack
### Aplicação desenvolvida utilizando o banco de dados PostgreSQL

1. Clonar repositorio

## Primeiros passos:
1. cd front-end
2. npm install  
3. npm run dev

# Front-end
1. Entre na pasta do Front-End: cd desafio-fullstack-front
2. Instale o React usando o Vite: npm create vite@latest 
3. Rode o comando : npm install
4. Rode esse comando para iniciar o servidor :npm run dev


# Back-end
## Primeiros passos:
1. Entre na pasta do banc-end : cd desafio-fullstack-front
2. Depois inicie uma aplicação em node : npm init -y
3. Instale as bibliotecas que ficam como dependência do projeto : npm i -S express dotenv typeorm reflect-metada zod express-async-errors
4. Agora instale as bibliotecas que ficam como dependencias de desenvolvimento : npm i types/express ts-node-dev typescript
5. crie o arquivo .env com base no arquivo .env.example
6. Gere a migração : npm run typeorm migration:generate src/migrations/mensagemDescritiva -- -d src/data-source
7. Executre a migração : npm run typeorm migration:run -- -d src/data-source
8. Agora rode o comando para iniciar o servidor : npm run dev

