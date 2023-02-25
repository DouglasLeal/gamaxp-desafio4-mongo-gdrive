import Repository from "../repositories/CategoriaRepository.js";

class CategoriaController{
    static async listar(req, res){
        try {
            let categorias = await Repository.listar();

            return res.status(200).json(categorias);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async buscarPorId(req, res){
        try {
            let {id} = req.params;

            let categoria = await Repository.buscarPorId(id);

            return res.status(200).json(categoria);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async criar(req, res){
        try {
            let {nome} = req.body;

            let categoriaCadastrada = await Repository.buscarPorNome(nome);

            if(categoriaCadastrada){
                return res.status(400).json({erro: "Nome de categoria já cadastrado."});
            }

            let novaCategoria = await Repository.criar({nome});

            return res.status(201).json(novaCategoria);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async atualizar(req, res){
        try {
            let {id} = req.params;
            let {nome} = req.body;

            let categoriaCadastrada = await Repository.buscarPorNome(nome);

            if(categoriaCadastrada && categoriaCadastrada._id != id){
                return res.status(400).json({erro: "Nome de categoria já cadastrado."});
            }

            await Repository.atualizar(id, {nome});

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
}

export default CategoriaController;