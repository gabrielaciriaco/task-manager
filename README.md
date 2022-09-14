# Sistema de gerenciamento de tasks

## Equipe:
  * [Gabriela Ciríaco](https://github.com/gabrielaciriaco): Software Engineer front-end
  * [Gabriel Araújo](https://github.com/GabrielGAM25): Software Engineer full-stack
  * [Victor Hugo Magalhães](https://github.com/victormagalhaess): Software Engineer back-end
  * [Matheus Marques](https://github.com/mathmarqq): Software Engineer full-stack
  
## Tecnologias:
  * Front: React (Typescript)
  * Back: Node.js
  * BD: MongoDB
  
## Sobre o sistema:

 ### Objetivo:
  O sistema em questão tem como finalidade ser um organizador de tarefas, buscando facilitar a organização de tarefas e trazer uma interface amigável e agradável. Além disso, temos como proposta trazer estatísticas sobre as tarefas e apresentar ao usuário uma melhor visualização do cumprimento das suas tarefas.
 
 ### Principais features:
   * Criar quadros de tarefas
   * Criar classificações de tarefas
   * Criar cards de tarefas
   * Gerenciar (Apagar, renomear etc) quadros e cards de tarefas
   * Classificar tarefas
   * Apresentar estatísticas das tarefas cumpridas/não cumpridas
   * Autenticação do usuário.

### Backlog do produto:

Tarefas Técnicas
- Criar estrutura do projeto frontend
- Criar estrutura do projeto backend
- Preparar CI e CD para o frontend
- Preparar CI e CD para o backend
- Preparar estrutura de banco de dados

História: Como usuário quero gerenciar tasks em um board
- Frontend
 - Criar header navegável
 - Criar componente de coluna
 - Criar componente de card
 - Criar componente do board
 - Criar componente de nova coluna
 - Criar componente de novo card
 - Implementar funcionalidade de nova coluna
 - Implementar funcionalidade de novo card
 - Implementar funcionalidade de editar card
 - Implementar funcionalidade de editar nome da coluna
 - Implementar funcionalidade de buscar cards e colunas
 - Implementar funcionalidade de mover cards dentro de uma coluna
 - Implementar funcionalidade de mover cards entre colunas
 - Implementar funcionalidade de mover colunas
- Backend
 - Criar rota para buscar colunas + cards
 - Criar rota para editar coluna
 - Criar rota para editar card
 - Criar rota para criar card
 - Criar rota para criar coluna
 - Criar rota para mover cards entre colunas
 - Criar rota para mover colunas

História: Como usuário quero ver gráficos relativos ao board
- Frontend
 - Criar gráfico Cards x Users
 - Criar gráfico Cards x Month
 - Criar gráfico Cards x Columns
 - Criar gráfico Cards x Users x Month
- Backend
 - Criar rota para gráfico Cards x Users
 - Criar rota para gráfico Cards x Month
 - Criar rota para gráfico Cards x Columns
 - Criar rota para gráfico Cards x Users x Month

História: Como usuário quero logar no sistema
- Frontend
 - Criar tela de login
 - Implementar funcionalidade para deixar o usuário logado
- Backend
 - Criar rota para logar o usuário no sistema

História: Como usuário quero deslogar do sistema
- Frontend
 - Criar popup de logout
 - Implementar funcionalidade para deixar o usuário deslogado
- Backend
 - Criar rota de invalidação de token

História: Como usuário quero recuperar minha senha
- Frontend
 - Criar tela de recuperação de senha
 - Criar tela de Confirmação de código
 - Criar tela de Nova senha
- Backend
 - Criar rota de envio de código por email
 - Criar rota de alteração de senha

História: Como usuário quero ter um feedback se eu acessar uma página inexistente
- Frontend
 - Criar tela de Not Found
