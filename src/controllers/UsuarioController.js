import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

import Repository from "../repositories/UsuarioRepository.js";

dotenv.config();

class UsuarioController{
    static async listar(req, res){
        try {
            let usuarios = await Repository.listar();

            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async buscarPorId(req, res){
        try {
            let {id} = req.params;

            let usuario = await Repository.buscarPorId(id);

            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async criar(req, res){
        try {
            let {email} = req.body;

            let usuarioCadastrado = await Repository.buscarPorEmail(email);

            if(usuarioCadastrado){
                return res.status(400).json({erro: "Email já cadastrado."});
            }

            req.body.senha = bcrypt.hashSync(req.body.senha);

            let novoUsuario = await Repository.criar(req.body);

            return res.status(201).json(novoUsuario);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async criarAdm(req, res){
        try {
            let {email} = req.body;

            let usuarioCadastrado = await Repository.buscarPorEmail(email);

            if(usuarioCadastrado){
                return res.status(400).json({erro: "Email já cadastrado."});
            }

            req.body.senha = bcrypt.hashSync(req.body.senha);

            let novoUsuario = await Repository.criarAdm(req.body);

            return res.status(201).json(novoUsuario);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async atualizar(req, res){
        try {
            let {id} = req.params;
            let {email} = req.body;
            
            let usuarioCadastrado = await Repository.buscarPorEmail(email);

            if(usuarioCadastrado && usuarioCadastrado._id != id){
                return res.status(400).json({erro: "Email já cadastrado."});
            }

            req.body.senha = bcrypt.hashSync(req.body.senha);

            await Repository.atualizar(id, req.body);

            return res.status(204).json();
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async excluir(req, res){
        try {
            let {id} = req.params;

            await Repository.excluir(id);

            return res.status(204).json();
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async login(req, res){
        const {email, senha} = req.body;

        let usuarioCadastrado = await Repository.buscarPorEmail(email);

        if(!usuarioCadastrado) return res.status(401).json({erro: "E-mail e/ou senha inválidos. Tente novamente."})
    
        if(!bcrypt.compareSync(senha, usuarioCadastrado.senha)) return res.status(401).json({erro: "E-mail e/ou senha inválidos. Tente novamente."})
    
        const token = jwt.sign({
            id: usuarioCadastrado._id,
            email: usuarioCadastrado.email,
            admin: usuarioCadastrado.admin
        },
        process.env.SECRET,
        {expiresIn: "7d"}
        );

        res.header('token', token);

        res.status(200).json({mensagem: "Login realizado."});
    }
}

export default UsuarioController;