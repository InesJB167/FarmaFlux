import prisma from "../../../../prisma/prisma.js"
import { buscarVendaPorId } from "../repository/buscarVendaPorId.js"
import { finalizarVendaService } from "./finalizar-venda.service.js"
import { registrarLog } from "../../logs-auditoria/registrar-log.js"

export const alterarStatusVendaService = async (idVenda, statusVenda, utilizadorId) =>
{
    const encontrarVenda = await buscarVendaPorId(idVenda)

    if (!encontrarVenda) return {
        success: false,
        status: 404,
        message: "Venda não encontrada."
    }

    const statusAtual = encontrarVenda.status
    console.log("o status desta venda ", statusAtual)

    if (statusAtual === "CANCELLED" || statusAtual === "COMPLETED") return {
        success: false,
        status: 409,
        message: "O status desta venda não pode ser alterado."
    }

    if (statusAtual === statusVenda) return {
        success: false,
        status: 409,
        message: "Status Atual."
    }


    if (statusVenda === "CANCELLED") {
        const realizarAteracaoComLog = await prisma.$transaction(async (tx) =>
        {
            const cancelarVenda = await tx.vendas.update({
                where: {
                    id: idVenda
                },
                data: {
                    status: statusVenda,
                    updated_at: new Date()
                },
                select: {
                    id: true,
                    utilizador: {
                        select: {
                            id: true,
                            nome: true
                        }
                    },
                    status: true,
                    updated_at: true
                }
            })

            const dadosParaLog = {
                utilizador_id: utilizadorId,
                acao: "CANCELAR_VENDA",
                tabela: "vendas",
                id_registro: idVenda,
                valor_antigo: encontrarVenda.status,
                valor_novo: cancelarVenda.status
            }

            const logAuditoria = await registrarLog(dadosParaLog, tx)
        })

        return {
            success: true,
            status: 200,
            message: "Status da venda Atualizado.",
            data: realizarAteracaoComLog
        }
    }

    const alterarStatus = await prisma.vendas.update({
        where: {
            id: idVenda
        },
        data: {
            status: statusVenda,
            updated_at: new Date()
        },
        select: {
            id: true,
            utilizador: {
                select: {
                    id: true,
                    nome: true
                }
            },
            status: true,
            updated_at: true
        }
    })

    return {
        success: true,
        status: 200,
        message: "Status da venda Atualizado.",
        data: alterarStatus
    }

}