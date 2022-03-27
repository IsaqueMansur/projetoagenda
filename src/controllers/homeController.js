const HomeModel = require('../models/HomeModel');

exports.paginaInicial = (req, res) => {
    res.render('index', {
        titulo: 'Título página',
        numeros: [0, 1, 2, 3, 4]
    });
    return
}

exports.trataPost = (req, res) => {
    res.send(req.body)
    return
}

/* HomeModel.create({
    titulo: 'Teste',
    descricao: Number(700)
})
.then(dados => console.log(dados))
.catch(e=> console.log(e)); */

/* HomeModel.find()
.then(dados => {
    this.dados = dados;
    for (let i in this.dados) {
        console.log(`Titulo do dado: ${this.dados[i].titulo}`)
        console.log(`Titulo do dado: ${this.dados[i].descricao}`)
    }
}).catch(e => console.log(e)); */