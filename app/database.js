const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database('./db/sample.db');

const tableProducts =
  "CREATE TABLE produtos (ID INTEGER PRIMARY KEY AUTOINCREMENT, nome_produto varchar(255), categoria varchar(255), desc_produto varchar(255), imagem varchar(255))"
db.run(tableProducts);

const tableUsers = "CREATE TABLE usuarios ( ID INTEGER PRIMARY KEY AUTOINCREMENT, nome_usuario varchar(255), email varchar(255),  tipo INT,  senha varchar(255), foto varchar(255), acesso INT)"
db.run(tableUsers);


db.close();