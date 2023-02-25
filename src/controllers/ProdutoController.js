import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

import Repository from "../repositories/ProdutoRepository.js";
import GoogleDriveUtil from "../utils/GoogleDriveUtil.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

class ProdutoController {
    static async listar(req, res) {
        try {
            let produtos = await Repository.listar();

            return res.status(200).json(produtos);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    static async buscarPorId(req, res) {
        try {
            let { id } = req.params;

            let produto = await Repository.buscarPorId(id);

            return res.status(200).json(produto);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    static async criar(req, res) {
        try {
            if(req.files){
                let imagem = await GoogleDriveUtil.uploadImage(req.files[0]);

                req.body.foto = imagem;
            }else{
                req.body.foto = " ";
            }
            

            let novoProduto = await Repository.criar(req.body);

            return res.status(201).json(novoProduto);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    static async atualizar(req, res) {
        try {
            let { id } = req.params;

            let produtoCadastrado = await Repository.buscarPorId(id);

            if (req.files) {
                if(!produtoCadastrado.foto == " "){
                    await GoogleDriveUtil.deleteImage(produtoCadastrado.foto);
                }                

                let imagem = await GoogleDriveUtil.uploadImage(req.files[0]);
                req.body.foto = imagem;
            }

            await Repository.atualizar(id, req.body);

            return res.status(204).json();
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    static async excluir(req, res) {
        try {
            let { id } = req.params;

            let produtoCadastrado = await Repository.buscarPorId(id);

            if (produtoCadastrado.foto != " ") {
                await GoogleDriveUtil.deleteImage(produtoCadastrado.foto)
            }

            await Repository.excluir(id);

            return res.status(204).json();
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}

export default ProdutoController;