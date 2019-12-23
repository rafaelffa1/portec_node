const ProdutosModel = require("../model/ProdutosModel");
const fs = require('fs');


exports.selectAllProdutos = function (callback) {
  ProdutosModel.selectAllProdutos(callback);
};

exports.selectIdProduto = function (callback, produtoId) {
  ProdutosModel.selectIdProduto(callback, produtoId);
};

exports.insertProdutos = function (nomeProduto, catProduto, descProduto, urlImagem) {
  ProdutosModel.insertProtdutos(nomeProduto, catProduto, descProduto, urlImagem)
}

exports.salvarFotos = async function (fotos) {
  fotos.forEach(async element => {
    fs.writeFile(`app/public/img/${element.name}`, element.b64, { encoding: 'base64' }, function (err) {
      console.log('File created');
    });
  });
}

exports.deleteProduto = async function (idProduto) {
  ProdutosModel.deleteProdutos(idProduto);
}