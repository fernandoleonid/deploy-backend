/***************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação do BD
 * Data: 24/12/2023
 * Autor: Marcel
 * Versão: 1.0
 **************************************************************************************/

//import do Prisma client
const { PrismaClient } = require('@prisma/client');

//Instancia do obejto
const prisma = new PrismaClient();

const selectAllContatos = async function(){

    let sql = 'select * from tbl_contatos';

    //$queryRawUnsafe()
    //$queryRaw()
    //Executa no BD o script SQL de Select
    let rsContatos = await prisma.$queryRawUnsafe(sql);

    if(rsContatos.length > 0)
        return rsContatos
    else
        return false;
}

const selectByNameContato = async function(nomeContato){

    let sql = `select * from tbl_contatos where nome like '%${nomeContato}%' `;

    //$queryRawUnsafe()
    //$queryRaw()
    //Executa no BD o script SQL de Select
    let rsContatos = await prisma.$queryRawUnsafe(sql);

    if(rsContatos.length > 0)
        return rsContatos
    else
        return false;
}

const insertContato = async function(contato){
    let sql = `insert into tbl_contatos (nome, celular, foto, email, endereco, cidade) 
              values ('${contato.nome}', '${contato.celular}', '${contato.foto}', '${contato.email}', '${contato.endereco}', '${contato.cidade}' )`;

    //$executeRaw()
    //$executeRawUnsafe()
    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
        return true;
    else
        return false;
}

const updateContato = async function(contato){
    let sql = `update tbl_contatos set 
        nome='${contato.nome}', 
        celular='${contato.celular}',
        foto='${contato.foto}',
        email='${contato.email}',
        endereco='${contato.endereco}',
        cidade='${contato.cidade}'
        where id = ${contato.id}`;

 
    //$executeRaw()
    //$executeRawUnsafe()
    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
        return true;
    else
        return false;
}

const deleteContato = async function(id){
    let sql = `delete from tbl_contatos where id = ${id}`;
 
    //$executeRaw()
    //$executeRawUnsafe()
    let result = await prisma.$executeRawUnsafe(sql);

    if(result)
        return true;
    else
        return false;
}



module.exports = {
    selectAllContatos,
    insertContato,
    updateContato,
    deleteContato,
    selectByNameContato
};