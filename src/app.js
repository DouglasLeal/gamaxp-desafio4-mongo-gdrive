import express from "express";
import cors from "cors";

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

const corsOptions = {
    exposedHeaders: ['token']
}
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.header("Acess-Control-Allow-Origin", "*");
    res.header("Acess-Control-Allow-Headers", true);
    res.header("Acess-Control-Allow-Credentials", "Content-Type");
    res.header("Acess-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    next();
});

routes(app);

app.use(HandleErrorMiddleware.handle);

export default app;