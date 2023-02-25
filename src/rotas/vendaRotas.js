import express from "express";

import Controller from "../controllers/VendaController.js";
import auth from "../middlewares/AuthMiddleware.js";
import validation from "../validations/vendaValidation.js";

const router = express.Router();

router
    .get("/", Controller.listar)
    .get("/:id", Controller.buscarPorId)
    .post("/", auth.autenticar, validation, Controller.criar)
    .put("/:id", Controller.atualizar)
    .delete("/:id", Controller.excluir);

export default router;