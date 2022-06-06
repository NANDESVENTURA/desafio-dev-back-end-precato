# Desafio Desenvolvedor Backend

## Sobre
Esta api é um servidor que recebe inscrições em um formulário, caso válido, e armazena os dados em um banco de dados relacional. A api também faz o disparo de mensagens no horario pré-definido.
<br>

## Requisitos
- [x] A inscrição só deve ser feita com um email válido.

- [x] Não devem ser registradas linhas duplicadas com o mesmo email no banco de dados.

- [x] A propriedade "position" da tabela "message_flow" indica o dia em que a mensagem deve ser enviada.

- [x] A propriedade "last_message" da tabela "subscriptions" indica a última mensagem enviada para aquela inscrição.

- [x] A propriedade "last_message" deve ser atualizada todos os dias com a próxima mensagem do fluxo.

- [x]  A propriedade "last_message" não deve ser atualizada em inscrições marcadas com "active" igual a "false".

- [x] Caso a inscrição já tenha recebido todas as mensagens do fluxo, a propriedade "active" deve ser marcada como "false".


## Começando
- Primeiramente, instale as dependências utilizando ```yarn install``` ou ```npm install``` a depende do gerenciador de pacotes de sua preferência
- Antes de começar dever ter:
    - Uma conexão MySQL    
- Criar um arquivo ```.env``` para armezenzar dados sensiveis a aplicação, como as credenciais e a conexão MySQL.

```.env
PORT=<porta que a aplicação vai usar na execução>
MYSQL_USER=<User do banco relacional>
MYSQL_PASSWORD=<Senha do banco relacional>
MYSQL_DATABASE=<Nome do model do banco>
MYSQL_HOST=<host do banco>
MYSQL_PORT=<porta escolhida>
NODEMAILER_EMAIL=<email de onde sera enviada as mensagens>
NODEMAILER_PASSWORD=<senha de acesso gmail>
```
Com essas variáveis de ambiente configuradas podemos executar nossa aplicação. 

## Executando
Para a execução foram criados alguns scripts dentro da aplicação
- dev: Execute  o comando ```yarn dev``` ou ```npm dev``` para executa a aplicação com o nodemon para desenvolvimento, ele vai recarregar a aplicação sempre que uma nova mudança for salva


A aplicação contem oito rotas:
- ```/subscription/list``` : retorna todos as inscrições feitas no banco de dados.
- ```/subscription/get/:id``` : retorna a inscrição no banco de acordo com o Id passado.
- ```/subscription/create```: cria uma inscrição no banco de dados.
- ```/subscription/delete/:id```: deleta a inscrição do banco de dados de acordo com o id passado.
- ```/subscription/patch/:id``` : faz atualização na inscrição, mudando o status da coluna active entre true e false, de acordo com o id passado.
- ```/message/list``` : retorna todos as mensagens criadas no banco de dados.
- ```/message/get/:id``` : retorna a mensagem no banco de acordo com o Id passado.
- ```/message/create```: cria uma mensagem no banco de dados.
- ```/message/delete/:id```: deleta a mensagem do banco de dados de acordo com o id passado.
- ```/message/patch/:id``` : faz atualização no corpo da mensagem e na posição, de acordo com o id passado.


## Autor
*Ernandes Ventura Silva Neto*

[![Twitter Badge](https://img.shields.io/badge/-@nandesventura-6633cc?style=flat-square&labelColor=000000&logo=twitter&logoColor=white&link=https://twitter.com/nandesventura)](https://twitter.com/nandesventura) [![Linkedin Badge](https://img.shields.io/badge/-Ernandes%20Ventura-6633cc?style=flat-square&logo=Linkedin&logoColor=black&link=https://www.linkedin.com/in/ernandes-ventura-892a88119/)](https://www.linkedin.com/in/ernandes-ventura-892a88119/)
