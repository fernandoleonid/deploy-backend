create database db_contatos_fecaf;

use db_contatos_fecaf;

create table tbl_contatos (
	id int not null auto_increment primary key,
	nome varchar(80) not null,
    celular  varchar(15),
    foto varchar(255),
    email varchar(255),
    endereco varchar(255),
    cidade varchar(80),
    unique index(id),
    unique key(id)
);

show tables;

insert into tbl_contatos (nome, celular, foto, email, endereco, cidade) 
values ('Joao da Silva', '11971716565', '../img/ana-oliveira-dias.png', 'joao@gmail.com', 'Av. Dos anjos, 2111', 'Sorocaba');


select * from tbl_contatos;
