const mongoose = require('mongoose');
const validator = require('validator');
const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});
const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        this.valida();
        if (this.errors.length > 0) return;
        try {
            const salt = bcryptjs.genSalsSync();
            this.body.password = bcryptjs.hashSync(this.body.password, salt);
            this.user = await LoginModel.create(this.body);
        }
        catch(e) {
            console.log(e);
            return e;
        }
    }

    valida() {

        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
        if (this.body.password.length < 2 || this.body.password.length > 49 ) {
            this.errors.push('Senha inválida (a senha deverá ter entre 3 e 50 caracteres)');
        }
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login;