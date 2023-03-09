'use strict';
var conexion = require('../config/db');

var Deuda = function(deuda){
    this.nombre_deuda = deuda.nombre_deuda;
    this.valor_deuda = deuda.valor_deuda;
    this.saldo_deuda = deuda.saldo_deuda;
    this.descripcion_deuda = deuda.descripcion_deuda;
};

   
  // Leer un Producto por su ID 

   
  // Listar todos los productos en la Vista Principal 
  Deuda.getAll = function (result) {
    console.log(1)
    conexion.query("select * from deudas", function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(null, err);
      }
      else{
        console.log(1)
        result(null, res);
      }
    });
  }; 

  module.exports = Deuda;