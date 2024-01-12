/***************************************************************************************
 * Objetivo: API para realizar requisições de Contatos da UNIFecaf
 * Data: 24/12/2023
 * Autor: Marcel
 * Versão: 1.0
 **************************************************************************************/
/*
    MVC - (model, view, controller)

    Model - Modelagem dos dados (BD)
    Controller - É reposnsável pela regra de negócio do projeto
    View - É responsável pela interação com o cliente (usuário) 

    Dependencias para acesso a banco de dados
    - Sequelize
    - Prisma
    - Fastfy

    Instalação e configuração do prisma
        npm install prisma --save
        npx prisma init
        npm install @prisma/client --save
    yarn && npm install prisma --save && npx prisma db pull && npx prisma generate && npm install @prisma/client --save
*/

//Import das dependências
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Converte o a chegada dos dados em formato JSON
const bodyParserJSON = bodyParser.json();

//Criando um objeto do tipo express
const app = express();

app.use((request, response, next) => {
    
    //configuração de quem poderá acessar a API (IP ou * todos)
    response.header('Access-Control-Allow-Origin', '*');

    //configuração de quais metodos serão aceitos na API
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    app.use(cors());
    next();
})


const controllerContatos = require('./controller/controllerContato.js');

//EndPoint: GET Retornar todos os contatos do BD
app.get('/v1/fecaf/contatos', cors(), async function(request, response, next){
    
    let dadosContato = await controllerContatos.getContatos();

    if(dadosContato){
        response.status(200);
        response.json(dadosContato);
    }else{
        response.status(404);
    }

})

//EndPoint: GET retornar os contatos filtrando pelo nome
app.get('/v1/fecaf/contato', cors(), async function(request, response, next){
    //Recebe uma variável via Query
    let nomeContato = request.query.nome;

    let dadosContato = await controllerContatos.getContatosByName(nomeContato);

    if(dadosContato){
        response.status(200);
        response.json(dadosContato);
    }else{
        response.status(404);
        response.json({"message": "Nenhum item encontrado."})
    }
});


//EndPoint: POST Inserir novo contato no BD
app.post('/v1/fecaf/contato', cors(), bodyParserJSON, async function(request, response, next){
    let dados = request.body;

    let result = controllerContatos.setNewContato(dados)

    if(result)
    {
        response.status(201);
        response.json('{"message": "Registro inserido com sucesso."}');
    }
    else
        response.status(404);

})

//EndPoint: PUT atualizar um contato
app.put('/v1/fecaf/contato/:id', cors(), bodyParserJSON, async function(request, response, next){
    
    //Recebe dados do body e o id do registro
    let dados = request.body;
    let id = request.params.id;

    let result = controllerContatos.setUpdateContato(dados, id)

    if(result)
    {
        response.status(200);
        response.json({"message": "Registro atualizado com sucesso."});
    }
    else
        response.status(404);
})

//EndPoint: DELETE excluir um contato
app.delete('/v1/fecaf/contato/:id', cors(), async function(request, response, next){
    let id = request.params.id;
    let result = controllerContatos.setDeleteContato(id);

    if(result){
        response.status(204);
        response.json({"message": "Registro excluído com sucesso."});
    }else
        response.status(404);

})


app.listen(8080, function(){
    console.log('API funcionando e aguardando novas Requisições ... ');
})