var express   =    require("express");
var mysql     =    require('mysql');
var app       =    express();


var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '12345',
    database : 'lab5',
    debug    :  false
});



function handle_database(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error de conexión a la base de datos"});
          return;
        }

        console.log('connectado con el id: ' + connection.threadId);

        connection.query("select * from tbl_cliente",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
        });

        connection.on('error', function(err) {
              res.json({"code" : 100, "status" : "Error de conexión a la base de datos"});
              return;
        });
  });
}

app.get("/",function(req,res){-
        handle_database(req,res);
});

app.listen(3000);
