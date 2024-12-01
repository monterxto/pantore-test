# Instalação e execução

---

## Sumário

- [Iniciar modo de desenvolvimento](#iniciar-modo-de-desenvolvimento)
- [Início rápido (docker)](#início-rápido-docker)
- [Links](#links)

---

## Iniciar modo de desenvolvimento

1. Clonar repositório

   ```bash
   git clone https://github.com/monterxto/pantore-test.git
   ```

1. Dentro do diretório do projeto copie o conteudo de `env-example` para `.env`.

   ```bash
   cd pantore-test
   cp env-example .env
   ```

1. Altere `DATABASE_URL=mongodb://mongo:27017` para `DATABASE_URL=mongodb://localhost:27017`

1. Inicie containers do `mongodb` e `mongo-express`:

   ```bash
   docker compose up -d mongo mongo-express
   ```

1. Instalar dependências

   ```bash
   npm install
   ```

1. Executar seed

   ```bash
   npm run seed:run
   ```

1. Executar aplicação em modo `dev`

   ```bash
   npm run start:dev
   ```

1. Aberto em <http://localhost:3000>

---

## Início rápido (docker)

Para iniciar rápido, utilize os comandos a seguir:

1. Clonar repositório

   ```bash
   git clone https://github.com/monterxto/pantore-test.git
   ```

1. Dentro do diretório do projeto copie o conteudo de `env-example` para `.env`.

   ```bash
   cd pantore-test/
   cp env-example .env
   ```

1. Inicie containers

   ```bash
   docker compose up -d
   ```

1. Para checar status, execute o comando abaixo

   ```bash
   docker compose logs
   ```

1. Aberto em <http://localhost:3000>

---

## Links

- Swagger (Docs da API): <http://localhost:3000/docs>
- MongoDB Express (Visualizar mongodb): <http://localhost:8081/>

---

Próximo: [Architecture](architecture.md)
