const express = require("express");
const verifyToken = require('./validate_token');
const router = express.Router(); //manejador de rutas de express
const animalSchema = require("../Models/animal");
//Nuevo animal
router.post("/animals", verifyToken, (req, res) => {
    const animal = animalSchema(req.body);
    animal
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
module.exports = router;
//Consultar todos los animales
router.get("/animals", verifyToken, (req, res) => {
    animalSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
//Consultar un animal por su id
router.get("/animals/:id",verifyToken, (req, res) => {
    const { id } = req.params;
    animalSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
//Modificar el nombre de un animal por su id
router.put("/animals/:id",verifyToken, (req, res) => {
    const { id } = req.params;
    const { nombre, edad, tipo, fecha } = req.body;
    animalSchema
        .updateOne({ _id: id }, {
            $set: { nombre, edad, tipo, fecha }
        })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
//Eliminar un animal por su id

router.delete("/animals/:id",verifyToken, (req, res) => {
    const { id } = req.params;
    animalSchema
        .findByIdAndDelete(id)
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});
