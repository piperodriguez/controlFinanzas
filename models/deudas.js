'use strict';
var conexion = require('../config/db');

var Deuda = function(deuda){
    this.nombre_deuda = deuda.nombre_deuda;
    this.valor_deuda = deuda.valor_deuda;
    this.saldo_deuda = deuda.saldo_deuda;
    this.descripcion_deuda = deuda.descripcion_deuda;
    this.fecha_deuda = deuda.fecha_deuda;
    this.id_producto = deuda.id_producto;
};

   
  // Leer un Deuda por su ID 
  Deuda.detailDeuda = function (id, result) {
    conexion.query(
      "SELECT * FROM deudas where id = ? ", 
      id, 
      function (err, res) {
        if(err) {
          console.log("error: ", err);
          result(err, null);
        }else{
        result(null, res);
        }
      });
  };
   
  // Listar todos los Deudas en la Vista Principal 
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

  Deuda.create = function (newEmp, result) {
    conexion.query("INSERT INTO deudas set ?", newEmp, function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(err, null);
      }
      else{
        console.log(res.insertId);
        result(null, res.insertId);
      }
    });
  };

  Deuda.update = function(id, deuda, result){
    console.log(deuda)
    conexion.query("UPDATE deudas SET nombre_deuda=?,valor_deuda=?,saldo_deuda=?,descripcion_deuda=?,fecha_deuda=? WHERE id = ?", [deuda.nombre_deuda,deuda.valor_deuda,deuda.saldo_deuda,deuda.descripcion_deuda,deuda.fecha_deuda, id], function (err, res) {
      if(err) {
        console.log("error: ", err);
        result(null, err);
      }else{
        result(null, res);
      }
    });
  };
  module.exports = Deuda;