const express = require('express')
const router = express.Router()
const productoController =   require('../controllers/productos'); 
const mainController =   require('../controllers/main'); 
// Multer (Subida de imágenes de los productos)
const multer = require('multer'); 
var img;
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function(req, file, callback) {
 
    const img_nombre = file.originalname;  
    // Reemplazamos los espacios en blanco del nombre de la imagen con guiones 
    const img_nuevo_nombre = img_nombre.replace(/\s+/g,'-'); 
 
    // Para evitar que los achivos se reemplazen entre si, le asignamos al nombre de la
    // imagen, la hora, tiempo, etc., actual 
    const img = Date.now() + '-' + img_nuevo_nombre;     
 
    callback(null, img);
  }
}); 
var upload = multer({ storage: storage }) 
 
// Ruta para listar todos los productos 
router.get('/productos', productoController.findAll);

router.get('/home', mainController.getAll);
 
// Ruta para crear un nuevo producto 
router.post('/producto', upload.single('img'), productoController.create);
router.post('/save', upload.single('img'), mainController.create);
 
// Ruta para leer un producto por su ID 
router.get('/producto/:id', productoController.findById);
 
router.get('/deuda/:id', mainController.detailDeuda);
// Ruta para actualizar un producto por su ID 
router.post('/producto/:id', upload.single('img'), productoController.update);

router.post('/modifica/:id',  mainController.modifica);
 
// Ruta para eliminar un producto por su ID 
router.post('/eliminar/:id', productoController.delete); 
 
module.exports = router