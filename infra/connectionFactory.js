var mysql=require('mysql');
    function createDBConnection(){        
        return mysql.createConnection({
         host:'localhost',
         user:'root',
         password:'vic26022008',
         database:'casadocodigo'
        });
    };

module.exports=function(){
    return createDBConnection;
};