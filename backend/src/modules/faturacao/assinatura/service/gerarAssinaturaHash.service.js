import { buscarFaturaPorId } from "../../codigo-fatura/repository/buscarFaturaPorId.js"
import crypto from "crypto"
import prisma from "../../../../../prisma/prisma.js"

export const gerarAssinaturaHashDeFatura = async (idFatura, dadosVenda, client = prisma) =>
{
    //?essa função vai gerar a assinatura hash de uma fatura para garantir a integridade da mesma, o hash vai ser composto pelos dados da venda e o hash da fatura anterior.

    const fatura = await buscarFaturaPorId(idFatura, client)
    if (!fatura) return {
        success: false,
        status: 404,
        message: "Fatura não encontrada."
    }

    const assinaturaExistente = fatura.hash_assinatura
    if (assinaturaExistente) return {
        success: false,
        status: 409,
        message: "Essa fatura ja possui assinatura."
    }

    let hashAssinatura
    const stringDadosVenda = JSON.stringify(Object.values(dadosVenda))
    let dadosHash

    let faturaAnteriorId = fatura.id - 1
    if (faturaAnteriorId > 0) {
        const faturaAnterior = await buscarFaturaPorId(faturaAnteriorId, client)
        if (faturaAnterior) {
            console.log("fatura anterior 2", faturaAnterior)
            const hashAnterior = faturaAnterior.hash_assinatura
            console.log("hashAnterior", hashAnterior)

            const dadosAssinatura = stringDadosVenda + hashAnterior
            hashAssinatura = crypto.createHash('sha256').update(dadosAssinatura).digest('hex')
            console.log("hash assinatura com hash anterior ", hashAssinatura)
            dadosHash = {
                hash_anterior: hashAnterior,
                hash_assinatura: hashAssinatura
            }
        }
    } else {
        hashAssinatura = crypto.createHash('sha256').update(stringDadosVenda).digest('hex')
        console.log("assinatura se nao tiver mais de uma fatura ", hashAssinatura)
        dadosHash = {
            hash_assinatura: hashAssinatura
        }
    }

    console.log("dados para registrar assinatura ", dadosHash)

    const registrarHashAsssintura = await client.fatura.update({
        where: {
            id: idFatura
        },
        data: {
            ...dadosHash
        }
    })

    return {
        success: true,
        status: 200,
        message: "Assinatura da fatura gerada com sucesso. ",
        data: registrarHashAsssintura
    }
}