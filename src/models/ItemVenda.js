import mongoose from "mongoose";

const itemVendaSchema = new mongoose.Schema({
    quantidade: {
        type: String,
        trim: true,
        required: "O campo quantidade é obrigatório."
    },
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "produtos",
        required: "O campo produto é obrigatório."
    }
});

const ItemVenda = mongoose.model("itemVendas", itemVendaSchema);

export default ItemVenda;