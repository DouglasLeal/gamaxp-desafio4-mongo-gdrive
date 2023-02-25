import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
    nome: {
        type: String,
        trim: true,
        required: "O campo nome é obrigatório."
    }
});

const Categoria = mongoose.model("categorias", categoriaSchema);

export default Categoria;