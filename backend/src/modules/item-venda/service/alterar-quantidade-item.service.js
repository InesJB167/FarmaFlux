import prisma from "../../../../prisma/prisma.js"
import { buscarVendaPorId } from "../../vendas/repository/buscarVendaPorId.js"
import { verificarStatusVenda } from "../../vendas/repository/verificarStatusVenda.js"
import {buscarItemVendaPorId} from "../repository/buscarItemVendaPorId.js"

export const alterarQuantidadeItemService = async (idItem,idVenda,novaQuantidade) =>{
    const itemExistente = await buscarItemVendaPorId(idItem)

    if(!itemExistente) return{
        success: false,
        status: 404,
        message: "Item venda não encontrado."
    }

    const vendaExistente = await buscarVendaPorId(idVenda) 
    
    if(!vendaExistente) return{
        success: false,
        status: 404,
        message: "Venda não encontrada."
    }

    if(vendaExistente.id !== itemExistente.venda_id){
        return{
            success: false,
            status: 409,
            message: "Este item não pertence a esta venda."
        }
    }

    const statusVendaPermitido = await verificarStatusVenda(idVenda)

    if(!statusVendaPermitido) return{
            success: false,
            status: 409,
            message: "Os dados desta venda não podem ser alterados."
        }

    if(novaQuantidade === itemExistente.quantidade) return{
        success: false,
        status: 409,
        message: "A quantidade informada é igual a quantidade atual."
    }

    const precoMedicamento = itemExistente.preco_unitario
    const subtotalItem = novaQuantidade * precoMedicamento

    const alterarQuantidade = await prisma.itens_venda.update({
        where:{
            id: idItem
        },
        data:{
            quantidade: novaQuantidade,
            subtotal: subtotalItem
        },
        select:{
            id: true,
            venda_id: true,
            medicamento:{
                select:{
                    id: true,
                    nome: true
                }
            },
            quantidade: true,
            preco_unitario: true,
            subtotal: true
        }
    })

    return {
        success: true,
        status: 200,
        message: "Quantidade do item alterada.",
        data: alterarQuantidade
    }
}