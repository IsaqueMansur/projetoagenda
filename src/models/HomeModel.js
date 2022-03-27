const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: Number
});

const HomeModel = mongoose.model('RNCS', HomeSchema);

class Home {

}

module.exports = HomeModel;