/***************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação do BD
 * Data: 24/12/2023
 * Autor: Marcel
 * Versão: 1.0
 **************************************************************************************/

//Import do arquivo de dados
const contatoDAO = require('../model/DAO/contatoDAO.js');

//Retorna todos os contatos do BD
const getContatos = async function(){
    //Cria um objeto do tipo JSON
    let jsonContatos = {};

    //Solicita os dados do BD na model
    let dadosContatos = await contatoDAO.selectAllContatos();

    //Valida o retorno dos dados
    if(dadosContatos){
        jsonContatos.count = dadosContatos.length;
        jsonContatos.contatos = dadosContatos;
        return jsonContatos
    }else{
        return false;
    }
}

//Retorna todos os contatos do BD
const getContatosByName = async function(nomeContato){
    //Cria um objeto do tipo JSON
    let jsonContatos = {};

    //Solicita os dados do BD na model
    let dadosContatos = await contatoDAO.selectByNameContato(nomeContato);

    //Valida o retorno dos dados
    if(dadosContatos){
        jsonContatos.count = dadosContatos.length;
        jsonContatos.contatos = dadosContatos;
        return jsonContatos
    }else{
        return false;
    }
}

//Inserir um novo contato no BD
const setNewContato = async function(contato){
    //Validação de dados
    if  (   contato.nome == ''   || contato.nome == undefined )
        return false;
    else{
        //encaminha os dados para a inserção no BD
        let result = contatoDAO.insertContato(contato);
        if(result)
            return true;
        else
            return false;
    }
}

//Atualizar um contato no BD
const setUpdateContato = async function(contato, idContato){
    //Validação de dados
    if  (   contato.nome == ''   || contato.nome == undefined ||
            idContato == ''      || idContato == undefined 
        )
        return false;
    else{

        //Adiciona o id no JSON de Contato
        contato.id = idContato;

        //encaminha os dados para a atualização no BD
        let result = contatoDAO.updateContato(contato);
        if(result)
            return true;
        else
            return false;
    }
}

//Excluir contato
const setDeleteContato = async function(id){
    
    if (id == '' || id == undefined)
        return false;
    else{
        let result = contatoDAO.deleteContato(id);
        if(result)
            return true;
        else
            return false;
    }
}

module.exports = {

    getContatos,
    setNewContato,
    setUpdateContato,
    setDeleteContato,
    getContatosByName
}