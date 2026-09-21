import prisma from "../../../../prisma/prisma.js"
import { gerarAssinaturaHashDeFatura } from "../../faturacao/assinatura/service/gerarAssinaturaHash.service.js"
import { gerarCodigoFaturaService } from "../../faturacao/codigo-fatura/service/gerarCodigoFatura.service.js"
import { listarItensVenda } from "../../item-venda/repository/listarItensVenda.js"
import { efetuarPagamentoService } from "../../pagamento/service/efetuar-pagamento.service.js"
import { efetuarBaixaDeStock } from "../../stock/logica-fefo/efetuar-baixa-de-stock.js"
import { prepararMedicamentosParaVenda } from "../../stock/logica-fefo/preparar-medicamentos-para-venda.js"
import { buscarVendaPorId } from "../repository/buscarVendaPorId.js"

export const finalizarVendaService = async (idVenda, dadosPagamento) =>
{
    /**
     * ?esta funçao vai fechar o ciclo da venda ou seja vai finalizar a venda.
    */

    const venda = await buscarVendaPorId(idVenda)
    if (!venda) return {
        success: false,
        status: 404,
        message: "Venda não encontrada."
    }

    if (venda.status !== "DRAFT") return {
        success: false,
        status: 409,
        message: "Esta venda não pode ser finalizada."
    }

    const itensDaVenda = await listarItensVenda(idVenda)
    if (itensDaVenda.length <= 0) return {
        success: false,
        status: 409,
        message: "Venda sem itens."
    }

    //?foi implementado os dados da venda pra poder gerar o hash de assinatura
    const dadosVenda = {
        id: idVenda
    }

    const finalizarVenda = await prisma.$transaction(async (tx) =>
    {
        const itensParaRetirada = await prepararMedicamentosParaVenda(itensDaVenda, tx)

        if (itensParaRetirada.length <= 0) return {
            success: false,
            status: 409,
            message: "Falha ao buscar possiveis itens para retirada."
        }

        const inserirPagamento = await efetuarPagamentoService(idVenda, dadosPagamento, tx)

        if (!inserirPagamento.success) return inserirPagamento

        const retiradaDosItensNoStock = await efetuarBaixaDeStock(itensParaRetirada, tx)

        const gerarCodigoFatura = await gerarCodigoFaturaService(idVenda, tx)
        if(!gerarCodigoFatura.success) return gerarCodigoFatura

        const gerarAssinatura = await gerarAssinaturaHashDeFatura(idVenda,tx)

        const mudarStatusVenda = await tx.vendas.update({
            where: {
                id: idVenda
            },
            data: {
                status: "COMPLETED"
            },
            select: {
                id: true,
                total_bruto: true,
                total_desconto: true,
                status: true
            }
        })

        return {
            success: true,
            status: 200,
            message: "Venda Finalizada.",
            data: mudarStatusVenda
        }

    })

    return finalizarVenda

}