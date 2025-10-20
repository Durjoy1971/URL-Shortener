# Step - 01

pnpm init
pnpm i @types/node @types/express express
pnpm install --save-dev tsx

# Step - 02

"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"dev": "tsx watch index.ts"
},

# Step - 03

Setup docker-compose.yml and type "docker compose up -d"
Setup temporary db using neon 

# Step - 04

Setup Drizzle with postgresql
https://orm.drizzle.team/docs/get-started/postgresql-new
DATABASE_URL=postgres://username:password@localhost:5432/mydatabase

