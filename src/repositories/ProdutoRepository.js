import Produto from "../models/Produto.js";

class ProdutoRepository {
    static async listar() {
        return await Produto.find();
    }

    static async buscarPorId(id) {
        return await Produto.findById(id);
    }

    static async buscarPorNome(nome) {
        return await Produto.findOne({ nome });
    }

    static async criar(dados) {
        let novoProduto = new Produto({
            nome: dados.nome,
            foto: dados.foto,
            preco: dados.preco,
            descricao: dados.descricao,
            categoria: dados.categoria,
        });

        return await novoProduto.save();
    }

    static async atualizar(id, dados) {
        return await Produto.findByIdAndUpdate(
            id,
            {
                nome: dados.nome,
                foto: dados.foto,
                preco: dados.preco,
                descricao: dados.descricao,
                categoria: dados.categoria,
            }
        );
    }

    static async excluir(id) {
        return await Produto.findByIdAndDelete(id);
    }
}

export default ProdutoRepository;