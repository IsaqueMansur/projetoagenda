import 'core-js'
import 'regenerator-runtime/runtime';
import './assets/css/style.css';

import Login from './modules/Login'; // pegando a classe Login do frontEnd

const cadastro = new Login('.form-cadastro');
const login = new Login('.form-login');
login.init();
cadastro.init();