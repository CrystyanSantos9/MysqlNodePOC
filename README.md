## CRUD MYSQL + Node
<br>
<h4 align="center"> 
	🗺️  <a href="https://docs.google.com/document/d/1prG_QRtDRSWSY_HEpdUNAQpTHxcBVIycakdxhw4ANs0/edit?usp=sharing">Documentação de apoio</a>   🗺️
</h4><br>

Repositório de estudos sobre criação de CRUDs  utilizando o [DBMS](https://www.oracle.com/br/database/what-is-database/#:~:text=Um%20banco%20de%20dados%20%C3%A9,banco%20de%20dados%20(DBMS).) Mysql e a [Runtime](https://nodejs.org/en/docs/guides/getting-started-guide/) NodeJS. 

#### Versão da Runtime Node e Banco de dados:
```Dependências:
Node Version - v15.14.0
Mysql - v5.0
```
<br>

## - Drivers e módulos utilizados -

<br>

### Conexão e gerenciamento do banco de dados
> npm install mysql2
### Reiniciar servidor a cada alteração do código
> npm install nodemon
### Controlar variáveis de ambiente
> npm install dotenv

<br>

## - Execução da aplicação - 

<br>

### Executando o banco de dados em container 

####  - Criando volume para armazenar dados do banco:
>docker volume create volume-db-fm
####  - Criando a imagem docker utilizando o arquivo db-image:
>docker build -f "db-image" --tag prefixo/nome_imagem
####  - Executando container 
> docker run -d -p 3336:3306 --rm -v volume-db-fm:/var/lib/mysql --name db-container csantos/db-image
<br>

### Executando o processo da API
> npm start 


 
