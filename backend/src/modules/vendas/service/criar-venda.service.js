import prisma from "../../../../prisma/prisma.js"
import { buscarClientePorNif } from "../../clientes/repository/buscarClientePorNif.js"
import { registrarCliente } from "../../clientes/repository/registrarCliente.js"
import { buscarUtilizadorPorId } from "../../utilizador/repository/buscarUserPorId.js"

export const criarVendaService = async (idUser, totalBruto, totalDesconto, dadosConsumidor) =>
{
    const encontrarUser = await buscarUtilizadorPorId(idUser)
    if (!encontrarUser) return {
        success: false,
        status: 404,
        message: "Usuário não encontrado."
    }

    let dadosCliente
    if (dadosConsumidor) {
        const nifEnviado = dadosConsumidor.nif
        const nifClienteExistente = await buscarClientePorNif(nifEnviado)
        if (!nifClienteExistente) {
            const novoCliente = await registrarCliente(dadosConsumidor)
            dadosCliente = {
                id: novoCliente.id
            }
        } 
        dadosCliente = {
            id: nifClienteExistente.id
        }

    } else {
        const nifParaConsumidorFinal = "999999999"
        const consumidorFinal = await buscarClientePorNif(nifParaConsumidorFinal)
        dadosCliente = {
            ...consumidorFinal
        }
    }

    const iniciarVenda = await prisma.vendas.create({
        data: {
            utilizador: {
                connect: {
                    id: idUser
                }
            },
            cliente: {
                connect: {
                    id: dadosCliente.id
                }
            },
            total_bruto: totalBruto,
            total_desconto: totalDesconto
        }
    })

    return {
        success: true,
        status: 201,
        message: "Venda inicializada.",
        data: iniciarVenda
    }
}