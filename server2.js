
'use strict';

require('dotenv').config({silent: true}); //carga variables de entorno desde un archivo .env en process.env

var server = require('./app2');
var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

server.listen(port, function() {
  // eslint-disable-next-line
  console.log('Servidor corriendo en el puerto : %d', port);
});
