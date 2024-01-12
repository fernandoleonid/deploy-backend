create database db_contatos_fecaf;

use db_contatos_fecaf;

create table tbl_contatos (
	id int not null auto_increment primary key,
	nome varchar(80) not null,
    cpf  varchar(18) not null,
    email varchar(255) not null,
    
    unique index(id),
    unique key(id)
);

show tables;

insert into tbl_contatos (nome, cpf, email) 
values ('Joao da Silva', '12004567899', 'joao@gmail.com');


select * from tbl_contatos;