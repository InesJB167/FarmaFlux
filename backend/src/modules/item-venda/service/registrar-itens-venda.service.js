import prisma from "../../../../prisma/prisma.js"
import { buscarMedicamentoPorId } from "../../medicamento/repository/buscarMedicamentoPorId.js"
import { buscarVendaPorId } from "../../vendas/repository/buscarVendaPorId.js"
import { buscarItemVendaPeloIdVendaEidmedicamento } from "../repository/buscaritemVendaPorIdVendaEidMedicamento.js"

export const registrarItensVendaService = async (idVenda, idMedicamento, quantidade) => {
    const encontrarVenda = await buscarVendaPorId(idVenda)

    if (!encontrarVenda) return {
        success: false,
        status: 404,
        message: "Venda não encontrada."
    }

    const medicamentoEncontrado = await buscarMedicamentoPorId(idMedicamento)
    if (!medicamentoEncontrado) return {
        success: false,
        status: 404,
        message: "Medicamento não encontrado."
    }

    const precoMedicamento = parseFloat(medicamentoEncontrado.preco_venda)

    let subTotalDoItem
    const itemExistente = await buscarItemVendaPeloIdVendaEidmedicamento(idVenda, idMedicamento)

    if (itemExistente) {

        const quantidadeDoItem = itemExistente.quantidade
        const novaQuantidade = quantidadeDoItem + quantidade
        subTotalDoItem = novaQuantidade * precoMedicamento

        const acrescentarQuantidadeDoItem = await prisma.itens_venda.update({
            where: {
                id: itemExistente.id,
                venda_id: idVenda
            },
            data: {
                quantidade: novaQuantidade,
                subtotal: subTotalDoItem
            },
            select: {
                id: true,
                venda_id: true,
                medicamento: {
                    select: {
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
            message: "Aumento da quantidade do item.",
            data: acrescentarQuantidadeDoItem
        }
    }

    subTotalDoItem = precoMedicamento * quantidade
    console.log("preco medicamneto ", precoMedicamento, "subtotal", subTotalDoItem)
    console.log(typeof (precoMedicamento), typeof (subTotalDoItem))

    const registrarItemVenda = await prisma.itens_venda.create({
        data: {
            quantidade,
            preco_unitario: precoMedicamento,
            subtotal: subTotalDoItem,

            venda: {
                connect: {
                    id: idVenda
                }
            },

            medicamento: {
                connect: {
                    id: idMedicamento
                }
            }
        },
        select: {
            id: true,
            venda_id: true,
            medicamento: {
                select: {
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
        status: 201,
        message: "Item venda registrado.",
        data: registrarItemVenda
    }

}