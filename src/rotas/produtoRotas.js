import express from "express";
import multer from "multer";

import Controller from "../controllers/ProdutoController.js";
import auth from "../middlewares/AuthMiddleware.js";
import validation from "../validations/produtoValidation.js";

const router = express.Router();
const upload = multer();

router
    .get("/", auth.autenticar, Controller.listar)
    .get("/:id", auth.autenticar, Controller.buscarPorId)
    .post("/", auth.autenticarAdm, upload.any(), validation, Controller.criar)
    .put("/:id", auth.autenticarAdm, upload.any(), validation, Controller.atualizar)
    .delete("/:id", auth.autenticarAdm, Controller.excluir);

export default router;