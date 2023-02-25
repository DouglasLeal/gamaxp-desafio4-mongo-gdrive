import express from "express";

import authRotas from "./authRotas.js";
import categoriaRotas from "./categoriaRotas.js";
import produtoRotas from "./produtoRotas.js";
import usuarioRotas from "./usuarioRotas.js";
import vendaRotas from "./vendaRotas.js";

const routes = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/", authRotas);
    app.use("/categorias", categoriaRotas);
    app.use("/produtos", produtoRotas);
    app.use("/usuarios", usuarioRotas);
    app.use("/vendas", vendaRotas);       
}

export default routes;