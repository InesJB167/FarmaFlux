import prisma from "../../../../prisma/prisma.js"
import { buscarVendaPorId } from "../../vendas/repository/buscarVendaPorId.js"
import { verificarStatusVenda } from "../../vendas/repository/verificarStatusVenda.js"
import { buscarItemVendaPorId } from "../repository/buscarItemVendaPorId.js"
import { verificarItemDaVenda } from "../repository/verificarItemDaVenda.js"


export const removerItemVendaService = async (idItem,idVenda)=>{
    const encontrarItem = await buscarItemVendaPorId(idItem)

    if(!encontrarItem) return{
        success: false,
        status: 404,
        message: "Item venda não encontrado."
    }

    const vendaEncontrada = await buscarVendaPorId(idVenda)
    if(!vendaEncontrada) return{
        success: false,
        status: 404,
        message: "Venda não encontrada."
    }

    const itemDaVenda = await verificarItemDaVenda(idVenda,idItem)
    if(!itemDaVenda) return{
        success: false,
        status: 409,
        message: "Este item não pertence a esta venda."
    }

    const statusVendaPermitido = await verificarStatusVenda(idVenda)
    if(!statusVendaPermitido) return{
        success: false,
        status: 409,
        message: "Esta venda não pode ser alterada."
    }

    const eliminarItemVenda = await prisma.itens_venda.delete({
        where:{
            id: idItem
        },
        select:{
            id: true,
            medicamento:{
                select:{
                    id: true,
                    nome: true
                }
            }
        }
    })

    return{
        success: true,
        status: 200,
        message: "Item venda eliminado.",
        data: eliminarItemVenda
    }
    
}