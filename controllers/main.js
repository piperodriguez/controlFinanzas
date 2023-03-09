'use strict';
const Deuda = require('../models/deudas');
 
// Listar todos los productos en la vista principal  
exports.getAll = function(req, res) {
  Deuda.getAll(function(err, deuda) {    
    if (err)
    res.send(err);
    console.log('Datos de la deuda:', deuda);
    res.status(200).send(deuda)
  });
};

exports.findById = function(req, res) {
  Deuda.findById(req.params.id, function(err, deuda) {
    if (err)
    res.send(err);
    res.json(deuda);
  });
}; 
 

 