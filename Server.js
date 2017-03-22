var express = require("express"); // servidor web
var mysql   = require("mysql"); // base de datos
var bodyParser  = require("body-parser"); //Analice los cuerpos de solicitud entrantes en un middleware antes de sus manejadores, disponibles bajo la propiedad req.body.
var md5 = require('MD5'); // función JavaScript para mensajes hash con MD5
var rest = require("./rest.js");
var app  = express();

function REST(){
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : '12345',
        database : 'restful_api_demo',
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use('/api', router);
      var rest_router = new rest(router,connection,md5);
      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(3000,function(){
          console.log("perfecto ! escuchando por el puerto: " + 3000);
      });
}

REST.prototype.stop = function(err) {
    console.log("Problemas con Mysql" + err);
    process.exit(1);
}

new REST();
