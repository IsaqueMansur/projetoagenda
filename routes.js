const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const contactsController = require("./src/controllers/contactsController");


//rotas da home
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost)

//rotas de contato
route.get('/contatos', contactsController.paginaInicial);


module.exports = route;