module.exports = function (app) {

    app.get('/produtos', function (req, res) {

        var connection = app.infra.connectionFactory();
        var produtos = new app.infra.ProdutoDao(connection);

        produtos.lista(function (error, results, fields) {
            res.format({
                html:function(){
                    console.log(results);
                    res.render('produtos/lista', { lista: results });
                },
                json:function(){
                    res.json(results);
                }
            });
        });
        connection.end();  
    });

     app.get('/produtos/form', function (req, res){
        res.render('produtos/form');
     });

     app.post('/produtos', function (req, res){
        var livro=req.body;

        //Validações
        req.assert('titulo', 'Titulo deve ser preenchido').notEmpty();
        req.assert('preco', 'Preço deverá ser um número').isFloat();

        var errors=req.validationErrors();

        if(errors){
            console.log('Há erros de validação!');
            res.format({
                html:function (){
                    res.status(400).render('produtos/form', { validationErrors: errors});
                },
                json:function(){
                    res.status(400).send(errors);
                }
            });
            return;
        }

        var connection=app.infra.connectionFactory();
        var produtos=new app.infra.ProdutoDao(connection);

        produtos.salva(livro, function (exception, result){
            res.redirect('/produtos');
        });
        connection.end();
     });
}