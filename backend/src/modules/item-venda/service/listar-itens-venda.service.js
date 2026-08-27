import { buscarVendaPorId } from "../../vendas/repository/buscarVendaPorId.js"
import {listarItensVenda} from "../repository/listarItensVenda.js"

export const listarItensVendaService = async (idVenda)=>{
    const vendaExistente = await buscarVendaPorId(idVenda)
    if(!vendaExistente) return{
        success: false,
        status: 404,
        message: "Venda não encontrada."
    }

    const todosItens = await listarItensVenda(idVenda)

    if(todosItens.length <= 0) return {
        success: true,
        status: 200,
        message: "Nenhum item adicionado a esta venda."
    }

    return{
        success: true,
        status: 200,
        message: "Itens adicionados a venda.",
        data: todosItens
    }
}