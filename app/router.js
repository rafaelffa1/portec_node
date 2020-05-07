const express = require("express");
const router = express.Router();
const path = require("path");
const ProdutoController = require('./controller/ProdutoController');
const UsuarioController = require('./controller/UsuarioController');
const bcrypt = require('bcryptjs');
// const session = require('express-session');
const app = express();
const nodemailer = require('nodemailer');

router.use('/', express.static(path.join(__dirname + '/public')), function (req, res, next) {
  next();
});

router.use('/', express.static(path.join(__dirname + '/public/panel/')), function (req, res, next) {
  next();
});

verificarLoginToken = (token, callbackResultado) => {
  UsuarioController.selectAllUsuarios(callback);
  function callback(rows) {
    for (let index = 0; index < rows.length; index++) {
      const element = rows[index];
      bcrypt.compare(String(element.acesso), token, function (err, res) {
        callbackResultado(res);
      });
    }
  }
}

// ===================== Site =============================================

router.get("/", function (req, res) {
  res.sendfile(path.join(__dirname + "/page/index.html"));
});

router.get("/portifolio", function (req, res) {
  res.sendfile(path.join(__dirname + "/page/portfolio-grid.html"));
});

router.get("/portifolio-single", function (req, res) {
  res.sendfile(path.join(__dirname + "/page/portfolio-single.html"));
});

router.get("/contato", function (req, res) {
  res.sendfile(path.join(__dirname + "/page/contact.html"));
});

// ===================== Panel =============================================

router.get("/panel", function (req, res) {
  res.sendfile(path.join(__dirname + "/panel/login.html"));
});

router.get("/panel/cadastro_produtos", function (req, res) {
  if (req.param('token') === undefined) {
    res.sendfile(path.join(__dirname + "/panel/login.html"));
  } else {
    verificarLoginToken(String(req.param('token')), callbackResultado);
    function callbackResultado(result) {
      if (result === true) {
        res.sendfile(path.join(__dirname + "/panel/cadastro_produtos.html"));
      } else {
        res.sendfile(path.join(__dirname + "/panel/login.html"));
      }
    }
  }
});

router.get("/panel/lista_produtos", async function (req, res) {
  if (req.param('token') === undefined) {
    res.sendfile(path.join(__dirname + "/panel/login.html"));
  } else {
    verificarLoginToken(String(req.param('token')), callbackResultado);
    function callbackResultado(result) {
      if (result === true) {
        res.sendfile(path.join(__dirname + "/panel/lista_produtos.html"));
      } else {
        res.sendfile(path.join(__dirname + "/panel/login.html"));
      }
    }
  }
});

router.get("/panel/cadastro_usuarios", function (req, res) {
  if (req.param('token') === undefined) {
    res.sendfile(path.join(__dirname + "/panel/login.html"));
  } else {
    verificarLoginToken(String(req.param('token')), callbackResultado);
    function callbackResultado(result) {
      if (result === true) {
        res.sendfile(path.join(__dirname + "/panel/cadastro_usuarios.html"));
      } else {
        res.sendfile(path.join(__dirname + "/panel/login.html"));
      }
    }
  }
});

router.get("/panel/lista_usuarios", function (req, res) {
  if (req.param('token') === undefined) {
    res.sendfile(path.join(__dirname + "/panel/login.html"));
  } else {
    verificarLoginToken(String(req.param('token')), callbackResultado);
    function callbackResultado(result) {
      if (result === true) {
        res.sendfile(path.join(__dirname + "/panel/lista_usuarios.html"));
      } else {
        res.sendfile(path.join(__dirname + "/panel/login.html"));
      }
    }
  }
});

// ===================== Ações ============================================

router.post("/verificar_login", (req, res) => {
  let result = false

  callbackResult = (result) => {
    if (result === true) {
      res.json({ result })
    }
  }

  function callback(rows) {
    for (let index = 0; index < rows.length; index++) {
      const element = rows[index];
      bcrypt.compare(String(element.acesso), req.body.token, function (err, res) {
        callbackResult(res)
      });
    }
  }
  UsuarioController.selectAllUsuarios(callback);
});

router.post("/envio_email", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtpi.portecportas.com.br",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "siteatendimento@portecportas.com.br",
      pass: "Portec2020"
    },
    tls: { rejectUnauthorized: false }
  });

  const mailOptions = {
    from: 'siteatendimento@portecportas.com.br',
    to: 'portec.tec@gmail.com',
    subject: 'E-mail Fale Conosco Site Portec',
    text: '',
    html: `
    <strong>Nome:</strong> ${req.body.name} <br />
    <strong>Email:</strong> ${req.body.email} <br />
    <strong>Assunto:</strong> ${req.body.subject} <br />
    <strong>Telefone:</strong> ${req.body.telefone} <br />
    <strong>Mensagem:</strong> ${req.body.text}
    `
  };

  transporter.sendMail(mailOptions, function (error, info) {
    console.log(error);
    console.log(info);
    if (error) {
      console.log(error);
      res.json({ result: error });
    } else {
      res.json({ result: true });
      console.log('Email enviado: ' + info.response);
    }
  });
});

router.post("/produto/cadastrar", function (req, res) {
  let nomesDasFotos = '';
  ProdutoController.salvarFotos(req.body.fotos);
  req.body.fotos.map(element => {
    nomesDasFotos = nomesDasFotos + element.name + ','
  })
  ProdutoController.insertProdutos(
    req.body.nome,
    req.body.categoria,
    req.body.descricao,
    nomesDasFotos
  )
  res.sendStatus(200)
});

router.get("/produto/listar", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  ProdutoController.selectAllProdutos(callback);
});

router.get("/produto/unidade/listar/:id", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  ProdutoController.selectIdProduto(callback, req.params.id);
});

router.delete("/produto/deletar/:id", (req, res) => {
  ProdutoController.deleteProduto(req.params.id);
  res.sendStatus(200);
});

router.post("/usuario/cadastrar", async function (req, res) {
  let nomeFoto = '';
  if (req.body.foto === undefined) {
    nomeFoto = 'defaultUsuario.png';
  } else {
    await UsuarioController.salvarFotos(req.body.foto);
    nomeFoto = req.body.foto[0].name;
  }
  UsuarioController.insertUsuarios(
    req.body.nome,
    req.body.email,
    req.body.tipo,
    req.body.senha,
    nomeFoto
  )
  res.sendStatus(200)
});

router.get("/usuario/listar", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  UsuarioController.selectAllUsuarios(callback);
});

router.delete("/usuario/deletar/:id", (req, res) => {
  UsuarioController.deleteUsuarios(req.params.id);
  res.sendStatus(200);
});

router.post("/panel/login", (req, res) => {
  let result = false;

  function callbackReturnHash(hash, usuario) {
    res.json({ result: hash, usuario });
  }

  async function callback(row) {
    for (let index = 0; index < row.length; index++) {
      const element = row[index];
      if (element.email === req.body.email && element.senha === req.body.senha) {
        UsuarioController.loginUsuario(element, callbackReturnHash);
        return;
      } else {
        result = false
      }
    }
    res.json({ result });
  }

  UsuarioController.selectAllUsuarios(callback);
});


module.exports = router;
