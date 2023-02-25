import mongoose from "mongoose";

const vendaSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usuarios",
        required: "O campo usuário é obrigatório."
    },
    valorTotal: {
        type: Number,
        required: "O campo valor total é obrigatório."
    },
    itens: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "itemVendas",
    }]
});

const Venda = mongoose.model("vendas", vendaSchema);

export default Venda;