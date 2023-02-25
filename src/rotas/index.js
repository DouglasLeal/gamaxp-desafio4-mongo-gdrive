import express from "express";

import authRotas from "./authRotas.js";

import usuarioRotas from "./usuarioRotas.js";

const routes = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/", authRotas);
    app.use("/usuarios", usuarioRotas);      
}

export default routes;