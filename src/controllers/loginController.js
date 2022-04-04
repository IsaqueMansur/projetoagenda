const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    /* console.log(req.session.user); */ // REQUISIÇÃO ENVIADA PELO USUARIO
    if (req.session.user) return res.render('login-logado');
    res.render('login');
    return
}

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

    if (login.errors.length > 0) {
        req.flash('errors', login.errors);
        req.session.save(function() {
            return res.redirect('back');
        });
        return
    }
    
    req.flash('success', 'Usuário criado com sucesso');
        req.session.save(function() {
            return res.redirect('back');
        });

    }catch(e) {
        console.log(e);
        return res.render('404');
    }  
}

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();

    if (login.errors.length > 0) {
        req.flash('errors', login.errors);
        req.session.save(function() {
            return res.redirect('back');
        });
        return
    }
    
    req.flash('success', 'Você acessou o sistema');
    req.session.user = login.user;
    req.session.save(function() {
        return res.redirect('back');
    });

    }catch(e) {
        console.log(e);
        return res.render('404');
    }  
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
} 