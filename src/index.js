const parser = require("body-parser");
const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require("./Routes/authentication");
const animalRoutes = require("./Routes/animal");
const areaRoutes = require("./Routes/area"); // <-- Importa tus rutas de área
const mongoose = require("mongoose");
require('dotenv').config();
app.use(parser.urlencoded({ extended: false })); //permite leer los datos que vienen en la petición
app.use(parser.json()); // transforma los datos a formato JSON


//Gestión de las rutas usando el middleware
app.use("/api", animalRoutes); // Activa las rutas de animal
app.use("/api", areaRoutes); // Activa las rutas de área 
app.use("/api", userRoutes); // Activa las rutas de los usuarios
app.use(express.json());


//Conexión a la base de datos
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexión exitosa"))
    .catch((error) => console.log(error));
//Conexión al puerto
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
