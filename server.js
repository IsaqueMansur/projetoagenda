require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require("./routes");
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');

mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Conectei a base de dados");
    app.emit('pronto');
})
.catch(e => console.log('Falha na conexão com o BD'));

const {middleware, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware.js');

app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'qualquer coisa secreta',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());

//nossos middlewares
app.use(middleware);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes)


app.on('pronto', () => {
    app.listen(3000, () => {
        console.log("servidor on http://localhost:3000")
    });
})

