import prisma from "../../../../prisma/prisma.js"
import { buscarClientePorNif } from "../../clientes/repository/buscarClientePorNif.js"
import { registrarCliente } from "../../clientes/repository/registrarCliente.js"
import { buscarUtilizadorPorId } from "../../utilizador/repository/buscarUserPorId.js"
import {buscarFarmaciaPorId} from "../../farmacia/repository/buscarFarmaciaPorId.js"

export const criarVendaService = async (farmaciaId,idUser, totalBruto, totalDesconto, dadosConsumidor) =>
{
    const farmacia = await buscarFarmaciaPorId(farmaciaId)
    if(!farmacia)return {
        success: false,
        status: 404,
        message: "Farmácia não encontrada."
    }

    const farmacia_id= parseInt(farmacia.id)

    const encontrarUser = await buscarUtilizadorPorId(farmacia_id,idUser)
    if (!encontrarUser) return {
        success: false,
        status: 404,
        message: "Usuário não encontrado."
    }

    let dadosCliente
    if (dadosConsumidor) {
        const nifEnviado = dadosConsumidor.nif
        const nifClienteExistente = await buscarClientePorNif(farmacia_id,nifEnviado)
        if (!nifClienteExistente) {
            const novoCliente = await registrarCliente(farmacia_id,dadosConsumidor)
            dadosCliente = {
                id: novoCliente.id
            }
        } 
        
        dadosCliente = {
            id: nifClienteExistente.id
        }

    } else {
        const nifParaConsumidorFinal = "999999999"
        const consumidorFinal = await buscarClientePorNif(farmacia_id,nifParaConsumidorFinal)
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
            total_desconto: totalDesconto,
            farmacia:{
                connect:{
                    id: farmacia_id
                }
            }
        }
    })

    return {
        success: true,
        status: 201,
        message: "Venda inicializada.",
        data: iniciarVenda
    }
}