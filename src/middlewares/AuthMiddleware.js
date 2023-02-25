import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';

dotenv.config();

class AuthMiddleware {
    static autenticar(req, res, next) {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ erro: "O token não foi especificado." });
        }

        const splitToken = authorization.split(" ");

        if (splitToken.length !== 2) {
            return res.status(401).json({ erro: "O token está mal formatado." });
        }

        const [key, token] = splitToken;

        if (key.indexOf("Bearer") < 0) {
            return res.status(401).json({ erro: "O token está mal formatado." });
        }

        try {
            const data = jwt.verify(token, process.env.SECRET);

            req.AUTH = data;

            return next();
        } catch (error) {
            return res.status(401).json({ erro: "Token inválido. Faça login novamente." });
        }
    }

    static autenticarAdm(req, res, next){
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ erro: "O token não foi especificado." });
        }

        const splitToken = authorization.split(" ");

        if (splitToken.length !== 2) {
            return res.status(401).json({ erro: "O token está mal formatado." });
        }

        const [key, token] = splitToken;

        if (key.indexOf("Bearer") < 0) {
            return res.status(401).json({ erro: "O token está mal formatado." });
        }

        let data = null;        

        try {
            data = jwt.verify(token, process.env.SECRET);

            req.AUTH = data;
        } catch (error) {
            return res.status(401).json({ erro: "Token inválido. Faça login novamente." });
        }

        if(data.admin){
            return next();
        }else{
            return res.status(403).json({ erro: "Acesso exclusivo para administradores." });
        }        
    }
}

export default AuthMiddleware;