import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        trim: true,
        required: "O campo nome é obrigatório."
    },
    foto: {
        type: String,
        required: "O campo foto é obrigatório."
    },
    preco: {
        type: Number,
        required: "O campo preço é obrigatório."
    },
    descricao: {
        type: String,
        trim: true,
        required: "O campo nome é obrigatório."
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categorias",
        required: "O produto precisa de uma categoria."
    }
});

const Produto = mongoose.model("produtos", produtoSchema);

export default Produto;