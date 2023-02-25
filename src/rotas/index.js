import express from "express";

import authRotas from "./authRotas.js";
import categoriaRotas from "./categoriaRotas.js";
import usuarioRotas from "./usuarioRotas.js";

const routes = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/", authRotas);
    app.use("/categorias", categoriaRotas);
    app.use("/usuarios", usuarioRotas);      
}

export default routes;