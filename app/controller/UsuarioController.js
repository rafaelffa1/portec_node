const UsuariosModel = require("../model/UsuariosModel");
const fs = require('fs');
const bcrypt = require('bcryptjs');

exports.selectAllUsuarios = function (callback) {
  UsuariosModel.selectAllUsuarios(callback);
};

exports.insertUsuarios = function (nomeUsuario, email, tipo, senha, foto) {
  UsuariosModel.insertUsuarios(nomeUsuario, email, tipo, senha, foto)
}

exports.salvarFotos = async function (fotos) {
  fs.writeFile(`app/public/img/usuarios/${fotos[0].name}`, fotos[0].b64, { encoding: 'base64' }, function (err) {
    console.log(err);
    console.log('File created');
  });
}

exports.deleteUsuarios = async function (idProduto) {
  UsuariosModel.deleteUsuarios(idProduto);
}

exports.loginUsuario = async function (usuario, callbackReturnHash) {
  const saltRounds = 10;
  const tokenLogin = Math.random() + 2;
  let hashLogin = '';
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(String(tokenLogin), salt, function (err, hash) {
      UsuariosModel.loginUsuario(usuario, String(tokenLogin));
      callbackReturnHash(hash, usuario)
    });
  });
}
