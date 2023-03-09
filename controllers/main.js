'use strict';
const Deuda = require('../models/deudas');
 
// Listar todos mis deudas :() en la vista principal  
exports.getAll = function(req, res) {
  Deuda.getAll(function(err, deuda) {    
    if (err)
    res.send(err);
    console.log('Datos de la deuda:', deuda);
    res.status(200).send(deuda)
  });
};

exports.detailDeuda = function(req, res) {
  Deuda.detailDeuda(req.params.id, function(err, deuda) {
    if (err)
    res.send(err);
    res.json(deuda);
  });
}; 

exports.create = function(req, res) { 
  // Mostramos un mensaje cuando los campos esten vacios 
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Por favor proporciona todos los campos requeridos !' });
  }else{
 
    // Creo un objeto para añadir el nombre de la imagen 
    const deuda = {
      nombre_deuda: req.body.nombre,
      valor_deuda: req.body.valor,
      saldo_deuda: 0,
      descripcion_deuda: req.body.descripcion,
      fecha_deuda: req.body.fecha
    }; 
  
    const nueva_deuda = new Deuda(deuda);
    
    Deuda.create(nueva_deuda, function(err, deuda) {
      if (err)
      res.send(err);
      req.flash('message', 'Deuda Creada Correctamente :(  !');
      res.redirect('/home');
    });
  }
};

exports.modifica = function(req, res) {
    console.log('hello world')
    console.log(req.body)
    Deuda.detailDeuda(req.params.id, function(err, deuda) {
 
      // Creo un objeto para mantener el nombre actual de la imagen 
      const deudaa = {
        nombre_deuda: req.body.nombre_deuda,
        valor_deuda: req.body.valor_deuda,
        saldo_deuda: 0,
        descripcion_deuda: req.body.descripcion_deuda,
        fecha_deuda: req.body.fecha_deuda
      }; 
 
      Deuda.update(req.params.id, new Deuda(deudaa), function(err, deudaa) {      
        req.flash('message', 'Deuda Actualizado Correctamente !');
        res.json({status:true});
      });
 
    });
};
 

 