const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../db/sample.db");
let db = new sqlite3.Database(dbPath);

exports.insertUsuarios = function (
  nome_usuario,
  email,
  tipo,
  senha,
  foto
) {
  db.run(
    `INSERT INTO usuarios (nome_usuario,email,tipo,senha,foto, acesso) VALUES(?,?,?,?,?,?)`,
    [nome_usuario, email, tipo, senha, foto, false],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );
};

exports.selectAllUsuarios = function (callback) {
  db.serialize(function () {
    db.all("SELECT * FROM usuarios", function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}

exports.deleteUsuarios = function (idProduto) {
  db.run(`DELETE FROM usuarios WHERE ID == ${idProduto}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}

exports.loginUsuario = function (usuario, tokenLogin) {
  db.run(`UPDATE usuarios SET acesso = ${tokenLogin} WHERE ID == ${usuario.ID}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}

exports.logoffUsuario = function (usuario) {
  db.run(`UPDATE usuarios SET acesso = 0 WHERE ID == ${usuario.ID}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}
