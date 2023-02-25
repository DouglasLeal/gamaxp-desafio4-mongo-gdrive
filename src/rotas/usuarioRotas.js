import express from "express";

import Controller from "../controllers/UsuarioController.js";
import auth from "../middlewares/AuthMiddleware.js";
import usuarioValidation from "../validations/usuarioValidation.js";
import admValidation from "../validations/admValidation.js";

const router = express.Router();

router
    .get("/", Controller.listar)
    .get("/:id", Controller.buscarPorId)
    .post("/", usuarioValidation, Controller.criar)
    .post("/admin", auth.autenticarAdm, admValidation, Controller.criarAdm)
    .put("/:id", usuarioValidation, Controller.atualizar)
    .delete("/:id", Controller.excluir);

export default router;