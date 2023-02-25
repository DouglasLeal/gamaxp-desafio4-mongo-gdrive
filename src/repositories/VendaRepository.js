import Venda from "../models/Venda.js";

class VendaRepository {
    static async listar() {
        return await Venda.find();
    }

    static async buscarPorId(id) {
        return await Venda.findById(id);
    }

    static async criar(dados) {
        let novaVenda = new Venda({
            usuario: dados.usuario,
            valorTotal: dados.valorTotal,
            itens: dados.itens
        });

        return await novaVenda.save();
    }

    static async atualizar(id, dados) {
        return await Venda.findByIdAndUpdate(
            id,
            {
                usuario: dados.usuario,
                valorTotal: dados.valorTotal,
                itens: dados.itens
            }
        );
    }

    static async excluir(id) {
        return await Venda.findByIdAndDelete(id);
    }
}

export default VendaRepository;