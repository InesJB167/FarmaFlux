import prisma from "../../../../prisma/prisma.js"
import { buscarTodosItensDeUmaVenda } from "../../vendas/repository/buscarTodosItensdaVenda.js"
import { buscarVendaPorId } from "../../vendas/repository/buscarVendaPorId.js"

export const efetuarPagamentoService = async (idVenda, dadosPagamento) =>
{
    /**
     * ?essa funçao será responsavel por realizar o pagamento, ela vai receber os dados para tal de modo a garantir que o mesmo seja feito.
     * ?os dados para a realizaçao do pagamento : idvenda ,metodo,valor pago,troco(se houver),referencia manual(se o metodo for por tranferencia ou tpa.
     * ?de lembrar que o pagamento será unico para uma unica venda, por isso será feito um calculo  do  valor total da venda para ser pago de uma so vez.
     * *
     * *por isso primeiro verifico se a venda existe,
     * *depois calculo o valor a se pagar
     * *vejo o metodo de pagamento, se for por dinheiro calculo o troco
     * *se for por transferencia ou tpa registro a referencia manual,
     * *apos ter a todos os dados ponho eles em uma variavel e mando pra funççao que vai registrar o pagamento na bd
     */

    const verificarVenda = await buscarVendaPorId(idVenda)
    if (!verificarVenda) return {
        success: false,
        status: 404,
        message: "Venda não encontrada."
    }

    if (verificarVenda.status !== "DRAFT") return {
        success: false,
        status: 409,
        message: "Esta venda não pode ser paga neste estado."
    }

    const buscarItensDaVenda = await buscarTodosItensDeUmaVenda(idVenda)
    if (!buscarItensDaVenda) return {
        success: false,
        status: 404,
        message: "Não foi encontrado nemhum item nesta venda."
    }

    const vendaPaga = verificarVenda._count.pagamentos
    if (vendaPaga > 0) return {
        success: false,
        status: 409,
        message: "O pagamento desta venda ja foi efetuado."
    }

    const itens = buscarItensDaVenda.itens_venda
    let totalApagar = 0

    for (let item of itens) {
        const subtotal = Number(item.subtotal)
        totalApagar += subtotal
        console.log(`subtotal do item ${subtotal} somado ao total ${totalApagar}`)
    }
    /**
     * !qual é a diferença aqui entre valor pago o que foi dado pelo user e total a paga o que deve ser pago
     */

    const metodoPagamento = dadosPagamento.metodo
    //?o valor dado pelo cliente na venda
    const valorPago = dadosPagamento.valorPago
    if (valorPago <= 0) return {
        success: false,
        status: 400,
        message: "Valor pago não pode ser negativo."
    }

    let troco


    const dadosParaRegistroPagamento = {
        metodo: metodoPagamento,
        valor_pago: valorPago
    }

    if (valorPago < totalApagar) return {
        success: false,
        status: 400,
        message: "O valor fornecido é inferior ao Total a ser pago."
    }

    if (metodoPagamento === "DINHEIRO") {
        troco = valorPago - totalApagar
        dadosParaRegistroPagamento.troco = troco
        console.log(`troco ${troco}`)
    }

    if (dadosPagamento.hasOwnProperty("referenciaManual")) {
        const referenciaManual = dadosPagamento.referenciaManual
        dadosParaRegistroPagamento.referencia_manual = referenciaManual
        console.log("referencia manual ", referenciaManual)
    }

    console.log("dados para o registro ", dadosParaRegistroPagamento)

    const efetuarPagamento = await prisma.$transaction(async (tx) =>
    {
        const registrarPagamento = await tx.pagamentos.create({
            data: {
                venda: {
                    connect: {
                        id: idVenda
                    }
                },
                ...dadosParaRegistroPagamento
            }
        })

        const dadosParaRegistroNaVenda = {
            total_bruto: totalApagar
        }

        const registrarPagamentoNaVenda = await tx.vendas.update({
            where: {
                id: idVenda
            },
            data: {
                ...dadosParaRegistroNaVenda,
                updated_at: new Date()
            }
        })


        return {
            success: true,
            status: 201,
            message: "Pagamento efetuado.",
            data: registrarPagamento
        }
    })

    return efetuarPagamento
}