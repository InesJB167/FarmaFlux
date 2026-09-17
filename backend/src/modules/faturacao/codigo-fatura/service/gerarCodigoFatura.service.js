import prisma from "../../../../../prisma/prisma.js"
import { buscarVendaPorId } from "../../../vendas/repository/buscarVendaPorId.js"
import { buscarFaturaPorCodigo } from "../repository/buscarFaturaPorCodigo.js"
import { listarFaturasAnual } from "../repository/listarFaturas.js"

export const gerarCodigoFaturaService = async (vendaId ,client = prisma) =>
{
    //?essa função vai gerar o codigo da fatura assim uma venda é finalizada.

    const venda = await buscarVendaPorId(vendaId, client)
    if (!venda) return {
        success: false,
        status: 404,
        message: "Venda não encontrada."
    }

    const vendaComFatura = venda.fatura
    if (vendaComFatura) return {
        success: false,
        status: 409,
        message: "Esta venda ja possui uma fatura."
    }

    const serie = "FAT"
    const dataAtual = new Date()

    const ano = parseInt(dataAtual.getFullYear())

    let sequencial = 1
    const faturasAnual = await listarFaturasAnual(ano, client)

    if (faturasAnual.length > 0) {
        const ultimaFatura = faturasAnual.findLast(element => faturasAnual)
        const ultimaFaturaSequencial = ultimaFatura.sequencial

        sequencial = ultimaFaturaSequencial + 1
    }

    const codigoFatura = serie + " " + ano + "/" + sequencial

    const verificarCodigoFatura = await buscarFaturaPorCodigo(codigoFatura, client)
    if (verificarCodigoFatura) {
        console.log("ja existe uma fatura com esse codigo.")
        return {
            success: false,
            status: 409,
            message: "Erro ao gerar o codigo da fatura"
        }
    }

    const dadosFatura = {
        codigo_fatura: codigoFatura,
        serie: serie,
        ano: ano,
        sequencial: sequencial
    }

    const registrarCodigoFatura = await client.fatura.create({
        data: {
            venda:{
                connect:{
                    id: vendaId
                }
            },
            ...dadosFatura
        }
    })

    return{
        success: true,
        status: 201,
        message: "Codigo de fatura gerado.",
        data: registrarCodigoFatura
    }

}