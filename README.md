# Desafio-Fullstack-Alex-sampaio-lima
Entrega 1 | Tech | 🏁 Desafio Fullstack
### Aplicação desenvolvida utilizando o banco de dados PostgreSQL

1. Clonar repositorio

## Primeiros passos:


# Front-end
1. Entre na pasta do Front-End: cd desafio-fullstack-front
2. Instale o React usando o Vite: npm create vite@latest 
3. Rode o comando : npm install
4. Rode esse comando para iniciar o servidor :npm run dev


# Back-end
1. Entre na pasta do banc-end : cd desafio-fullstack-front
2. Depois inicie uma aplicação em node : npm init -y
3. crie o arquivo .env com base no arquivo .env.example
4. Gere a migração : npm run typeorm migration:generate src/migrations/mensagemDescritiva -- -d src/data-source
5. Executre a migração : npm run typeorm migration:run -- -d src/data-source
6. Agora rode o comando para iniciar o servidor : npm run dev



Métodos | EndPoints | Descrição| Autenticação e Autorização|
--------|-----------|----------|---------------------------|
| GET    | /client      | Lista todos os clientes     | Apenas os administradores              |
| POST   | /client      | Cadastrar clientes          | Todos clientes, token não é necessário |
| PATCH  | /client/{id} | Atualizar dados de clientes | Administradores e donos da conta       | 
| DELETE | /client/{id} | Cadastrar clientes          | Todos clientes, token não é necessário |
