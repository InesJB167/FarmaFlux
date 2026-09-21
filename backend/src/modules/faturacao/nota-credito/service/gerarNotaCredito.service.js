import prisma from "../../../../../prisma/prisma.js"
import crypto from "crypto"
import { buscarVendaPorId } from "../../../vendas/repository/buscarVendaPorId.js"
import { buscarNotaCreditoPorCodigo } from "../repository/buscarNotaCreditoPorCodigo.js"
import { listarNotasDeCredito } from "../repository/listarNotasDeCredito.js"

export const gerarNotaCreditoService = async (idVenda, motivo, valorAnulado,idUser, client = prisma) =>
{
    //?essa função vai gerar uma nota de crédito(um documento que vai invalidar ou anular uma fatura ou venda anterior), caso uma venda/fatura tenha uma erro no valor total da venda.

    const venda = await buscarVendaPorId(idVenda, client)
    if (!venda) return {
        success: false,
        status: 404,
        message: "Venda não encontrada."
    }

    if (venda.status !== "COMPLETED") return {
        success: false,
        status: 409,
        message: "O status da venda não permite a criação de uma nota crédito."
    }

    const motivosNota = [
        "ERRO_FATURACAO",
        "DEVOLUCAO_PRODUTO",
        "PRODUTO_DEFEITUOSO",
        "ANULACAO_VENDA",
        "DESCONTO_POS_VENDA",
        "TROCA_PRODUTO",
        "OUTRO"
    ]

    console.log("motivo nota",motivo)
    if (!motivosNota.includes(motivo)) return {
        success: false,
        status: 404,
        message: "Este motivo é inválido para ser registrado na nota."
    }

    if (valorAnulado <= 0 || valorAnulado > venda.total_bruto) return {
        success: false,
        status: 404,
        message: "O valor a ser retirado inválido."
    }

    const dataAtual = new Date()
    const anoAtual = dataAtual.getFullYear()
    let numeroSequencial = 1
    let hashAssinatura
    let dadosNotaCredito = {
        motivo: motivo,
        valor_anulado: valorAnulado
    }

    const notasCredito = await listarNotasDeCredito()
    if (notasCredito.length > 0) {
        console.log("notas ", notasCredito)
        const ultimaNotaCredito = notasCredito.at(-1)
        const sequenciaAnterior = ultimaNotaCredito.numero_sequencial
        numeroSequencial = sequenciaAnterior + 1

        const hashAnterior = ultimaNotaCredito.hash_assinatura
        const novoHash = crypto.createHash('sha256').update(hashAnterior).digest('hex')
        hashAssinatura = novoHash

        dadosNotaCredito.hash_assinatura = hashAssinatura,
            dadosNotaCredito.hash_anterior = hashAnterior
    }
    console.log("numero sequencial incrementado ", numeroSequencial)
    dadosNotaCredito.numero_sequencial = numeroSequencial

    const codigoNotaCredito = "NC " + anoAtual + "/" + numeroSequencial
    console.log("codigo da nota de credito ", codigoNotaCredito)

    const codigoNotaExistente = await buscarNotaCreditoPorCodigo(codigoNotaCredito)
    if (codigoNotaExistente) return {
        success: false,
        status: 409,
        message: "Codigo duplicado: Ja existe uma nota com este codigo."
    }

    hashAssinatura = crypto.createHash('sha256').update(codigoNotaCredito).digest('hex')

    dadosNotaCredito.codigo_nota = codigoNotaCredito
    dadosNotaCredito.hash_assinatura = hashAssinatura

    const registrandoNotaComLog = await prisma.$transaction(async (tx) =>
    {
        const registrarNotaCredito = await tx.notas_credito.create({
            data: {
                venda: {
                    connect: {
                        id: idVenda
                    }
                },
                ...dadosNotaCredito
            }
        })

        const dadosLog={
            acao: "CREATE",
            tabela: "notas_credito",
            id_registro: registrarNotaCredito.id
        }

        const registrarLog = await tx.logs_auditoria.create({
            data:{
                utilizador:{
                    connect:{
                        id: idUser
                    }
                },
                ...dadosLog
            }
        })

        return registrarNotaCredito
    })


    return {
        success: true,
        status: 201,
        message: "Nota de crédito criada com sucesso.",
        data: registrandoNotaComLog
    }

}