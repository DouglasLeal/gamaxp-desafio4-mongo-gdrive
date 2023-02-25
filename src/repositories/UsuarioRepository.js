import Usuario from "../models/Usuario.js";

class UsuarioRepository {
    static async listar() {
        return await Usuario.find();
    }

    static async buscarPorId(id) {
        return await Usuario.findById(id);
    }

    static async buscarPorEmail(email) {
        return await Usuario.findOne({ email });
    }

    static async criar(dados) {
        let novoUsuario = new Usuario({
            nome: dados.nome,
            email: dados.email,
            senha: dados.senha,
            admin: false
        });

        return await novoUsuario.save();
    }

    static async criarAdm(dados) {
        let novoUsuario = new Usuario({
            nome: dados.nome,
            email: dados.email,
            senha: dados.senha,
            admin: dados.admin || false
        });

        return await novoUsuario.save();
    }

    static async atualizar(id, dados) {
        return await Usuario.findByIdAndUpdate(
            id,
            {
                nome: dados.nome,
                email: dados.email,
                senha: dados.senha,
                admin: dados.admin || false,
            }
        );
    }

    static async excluir(id) {
        return await Usuario.findByIdAndDelete(id);
    }
}

export default UsuarioRepository;