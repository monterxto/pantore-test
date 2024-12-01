# Architecture

---

## Sumário
- [Escolha](#escolha)
- [Considerações para Aplicações Maiores](#considerações-para-aplicações-maiores)
  - [Desacoplar Entidade de Domínio e Banco de Dados](#1-desacoplar-entidade-de-domínio-e-banco-de-dados)

---

## Escolha

Escolhi manter a arquitetura do NestJs com o objetivo demonstrar boas práticas e organização de código, mas sem adotar uma complexidade excessiva desnecessária para o escopo proposto.

#### 1. **Separação de Responsabilidades:**   
  - Garantir que cada camada tenha uma responsabilidade clara como:
     - Controllers para lidar com as rotas HTTP.
     - Services para encapsular a lógica de negócio.
     - Repositories para abstrair o acesso aos dados.
#### 2. **Testabilidade:**
  - Organização que facilita a escrita de testes unitários e de integração.

---

## Considerações para Aplicações Maiores

Caso este projeto evolua para algo mais robusto ou escalável, algumas melhorias podem ser implementadas para refinar a arquitetura e torná-la ainda mais flexível:

#### 1. **Desacoplar Entidade de Domínio e Banco de Dados**
   - No estado atual, as entidades refletem diretamente a estrutura do banco de dados (ex.: `user.entity.ts`).
   - Em sistemas mais complexos, seria interessante separar:
      - Entidades de domínio: Representam regras de negócio e abstrações importantes para o contexto da aplicação.
      - Entidades de persistência: Estão diretamente ligadas à estrutura do banco de dados.
  - Essa abordagem aumentaria a resiliência do sistema a mudanças na infraestrutura de dados.

---

Anterior: [Instalação e execução](installing-and-running.md)

Próximo: [Testes](tests.md)
