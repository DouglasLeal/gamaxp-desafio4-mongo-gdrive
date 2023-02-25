import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        trim: true,
        required: "O campo nome é obrigatório."
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: "O campo email é obrigatório."
    },
    senha: {
        type: String,
        required: "O campo senha é obrigatório."
    },
    admin: {
        type: Boolean,
        default: false
    }
});

const Usuario = mongoose.model("usuarios", usuarioSchema);

export default Usuario;