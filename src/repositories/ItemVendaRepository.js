import ItemVenda from "../models/ItemVenda.js";

class ItemVendaRepository {
    static async listar() {
        return await ItemVenda.find();
    }

    static async buscarPorId(id) {
        return await ItemVenda.findById(id);
    }

    static async criar(dados) {
        let novoItem = new ItemVenda({
            quantidade: dados.quantidade,
            produto: dados.produto,
        });

        return await novoItem.save();
    }

    static async atualizar(id, dados) {
        return await ItemVenda.findByIdAndUpdate(
            id,
            {
                quantidade: dados.quantidade,
                produto: dados.produto,
            }
        );
    }

    static async excluir(id) {
        return await ItemVenda.findByIdAndDelete(id);
    }
}

export default ItemVendaRepository;