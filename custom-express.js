var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function () {
    var app = express();

    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded());
    app.use(expressValidator());

    app.set('view engine', 'ejs'); //Setando o ejs como motor de visualização
    
    load('routes').then('infra').into(app);

    return app;
};