import Categoria from "../models/Categoria.js";

class CategoriaRepository{
    static async listar(){
        return await Categoria.find();
    }

    static async buscarPorId(id){
        return await Categoria.findById(id);
    }

    static async buscarPorNome(nome){
        return await Categoria.findOne({nome});
    }

    static async criar(dados){
        let novaCategoria = new Categoria({
            nome: dados.nome
        });

        return await novaCategoria.save();
    }

    static async atualizar(id, dados){
        return await Categoria.findByIdAndUpdate(
            id,
            {
                nome: dados.nome
            }
        );
    }

    static async excluir(id){
        return await Categoria.findByIdAndDelete(id);
    }
}

export default CategoriaRepository;