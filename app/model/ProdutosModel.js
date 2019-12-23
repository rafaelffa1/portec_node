const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../db/sample.db");
const util = require('util')

let db = new sqlite3.Database(dbPath);

exports.insertProtdutos = function (
  nomeProduto,
  catProduto,
  descProduto,
  urlImagem
) {
  db.run(
    `INSERT INTO produtos (nome_produto,categoria,desc_produto,imagem) VALUES(?,?,?,?)`,
    [nomeProduto, catProduto, descProduto, urlImagem],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );
};

exports.selectAllProdutos = function (callback) {
  db.serialize(function () {
    db.all("SELECT * FROM produtos", function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}

exports.selectIdProduto = function (callback, idProduto) {
  db.serialize(function () {
    db.all(`SELECT * FROM produtos WHERE ID == ${idProduto}`, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}

exports.deleteProdutos = function (idProduto) {
  db.run(`DELETE FROM produtos WHERE ID == ${idProduto}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}
