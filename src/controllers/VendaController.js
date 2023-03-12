import VendaRepository from "../repositories/VendaRepository.js";
import ItemRepository from "../repositories/ItemVendaRepository.js";
import ProdutoRepository from "../repositories/ProdutoRepository.js";

class VendaController{
    static async listar(req, res){
        try {
            let vendas = await VendaRepository.listar(req.AUTH.id);

            return res.status(200).json(vendas);
        } catch (error) {
            return res.status(500).json({erro: error.message});
        }
    }

    static async buscarPorId(req, res){
        try {
            let {id} = req.params;

            let venda = await VendaRepository.buscarPorId(id);

            return res.status(200).json(venda);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async criar(req, res){
        try {
            let itens = [];
            let valorTotal = 0;

            await Promise.all(req.body.produtos.map(async (produto) => {
                let p = await ProdutoRepository.buscarPorId(produto._id);
            
                valorTotal += p.preco * produto.quantidade;
            
                let item = await ItemRepository.criar({produto: produto._id, quantidade: produto.quantidade});
            
                itens.push(item);
            }));           
            
            let novaVenda = await VendaRepository.criar({
                usuario: req.AUTH.id,
                valorTotal,
                itens
            });

            return res.status(201).json(novaVenda);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async atualizar(req, res){
        try {

            return res.status(200).json();
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async excluir(req, res){
        try {
            let {id} = req.params;

            let vendaCadastrada = await VendaRepository.buscarPorId(id);

            await Promise.all(vendaCadastrada.itens.map(async (item) => {
                await ItemRepository.excluir(item.toString());
            }));

            await VendaRepository.excluir(id);

            return res.status(204).json();
        } catch (error) {
            return res.status(500).json({error});
        }
    }
}

export default VendaController;