import express from "express";

import Controller from "../controllers/CategoriaController.js";
import auth from "../middlewares/AuthMiddleware.js";
import validation from "../validations/categoriaValidation.js";

const router = express.Router();

router
    .get("/", auth.autenticar, Controller.listar)
    .get("/:id", auth.autenticarAdm, Controller.buscarPorId)
    .post("/", auth.autenticarAdm, validation, Controller.criar)
    .put("/:id", auth.autenticarAdm, validation, Controller.atualizar)
    .delete("/:id", auth.autenticarAdm, Controller.excluir);

export default router;