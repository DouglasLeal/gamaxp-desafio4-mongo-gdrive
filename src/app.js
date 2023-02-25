import express from "express";

import db from "./config/db.js";
import routes from "./rotas/index.js";
import HandleErrorMiddleware from "./middlewares/HandleErrorMiddleware.js";
import GoogleDriveUtil from "./utils/GoogleDriveUtil.js";

GoogleDriveUtil.criarArquivoCredenciais();

db.on("error", console.log.bind(console, "DB - Erro ao conectar."));
db.once("open", () => {
    console.log("DB - Conectado com sucesso.");
});

const app = express();

routes(app);

app.use(HandleErrorMiddleware.handle);

export default app;