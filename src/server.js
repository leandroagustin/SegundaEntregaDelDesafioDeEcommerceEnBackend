import express from "express";
const app = express();

import carritosRouter from "../routes/carrito.js";
import productosRouter from "../routes/productos.js";

//Configuracion del servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/productos", productosRouter);
app.use("/api/carrito", carritosRouter);

export default app;
