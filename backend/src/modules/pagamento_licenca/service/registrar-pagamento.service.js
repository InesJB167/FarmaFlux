import prisma from "../../../../prisma/prisma.js"
import { buscarPlanoLicencaPorId } from "../../planos_licenca/repos/buscarPlanoPorId.js"
import { buscarTenantPorId } from "../../tenants/repository/buscarTenantPorId.js"
import { buscarPagamentoPorReferencia } from "../../pagamento_licenca/repos/buscarPagamentoPorReferencia.js"

export const registrarPagamentoService = async (idTenant, dadosPagamento) =>
{
    const tenant = await buscarTenantPorId(idTenant)
    if (!tenant) return {
        success: false,
        status: 404,
        message: "Tenant não encontrado."
    }

    if (tenant.estado === "CANCELADO") return {
        success: false,
        status: 409,
        message: "Este tenant foi cancelado."
    }

    const planoLicenca = await buscarPlanoLicencaPorId(dadosPagamento.idPlano)
    if (!planoLicenca) return {
        success: false,
        status: 404,
        message: "Plano licença não encontrado."
    }

    const custoPlano = parseFloat(planoLicenca.custo)
    if (dadosPagamento.valorPago < custoPlano) {
        return {
            success: false,
            status: 409,
            message: `Valor inferior ao custo deste plano. Valor exigido: ${custoPlano}.`
        }
    } else if (dadosPagamento.valorPago > custoPlano) return {
        success: false,
        status: 409,
        message: `Valor superior ao custo deste plano. Valor exigido: ${custoPlano}.`
    }

    const dataAtual = new Date()
    const duracao = planoLicenca.duracao_dias
    const dataProximoPagamento = new Date(tenant.data_proximo_pagamento)
    //*e se o user renovar a subscriçao antes dela expirar ?? nesse caso a data fim vai ser data proximo pagamento + duracao se nao vai ser hoje mesmo
    let diaPagamento = dataAtual < dataProximoPagamento ? new Date(dataProximoPagamento) : new Date(dataAtual)
    
    const somandoDias = diaPagamento.getDate() + duracao
    const dataFim = new Date(diaPagamento)
    dataFim.setDate(somandoDias)

    const dataAtualFormatada = dataAtual.toLocaleDateString('pt-BR');
    const diaPagamentoFormatado = diaPagamento.toLocaleDateString('pt-BR');
    const dataFimFormatada = dataFim.toLocaleDateString('pt-BR');

    if(dataProximoPagamento > dataAtual){
        let diasFaltando = ( dataAtual.getDate() - dataProximoPagamento.getDate())
        console.log(`dia usado pra contagem ${diaPagamentoFormatado}`)
        console.log(`o plano ainda nao expirou faltam ${diasFaltando}`)
    } else{
        console.log(`o plano ainda ja expirou `)
    }

    console.log(`dia atual ${dataAtualFormatada}, dia do pagamento ${diaPagamentoFormatado}, dias somados ${duracao}, data fim ${dataFimFormatada}`);

    const encontrarPagamento = await buscarPagamentoPorReferencia(dadosPagamento.referencia)
    if (encontrarPagamento) return {
        success: false,
        status: 409,
        message: "Ja existe um pagamento com esta referencia bancária."
    }

    const dadosParaRegistro = {
        valor_pago: dadosPagamento.valorPago,
        metodo: dadosPagamento.metodoUsado,
        data_inicio: diaPagamento,
        data_fim: dataFim,
        referencia: dadosPagamento.referencia
    }

    const realizarPagamento = await prisma.$transaction(async (tx) =>
    {
        const registrarPagamento = await tx.pagamento_licenca.create({
            data: {
                tenant: {
                    connect: {
                        id: idTenant
                    }
                },
                plano: {
                    connect: {
                        id: planoLicenca.id
                    }
                },
                ...dadosParaRegistro
            },
            select: {
                id: true,
                data_pagamento: true,
                valor_pago: true,
                metodo: true
            }
        })

        const alterarStatusTenant = await tx.tenants.update({
            where: {
                id: idTenant
            },
            data: {
                estado: "ATIVO",
                data_proximo_pagamento: dadosParaRegistro.data_fim
            },
            select: {
                tenant_id: true,
                estado: true,
                data_proximo_pagamento: true
            }
        })
        return {
            registrarPagamento,
            alterarStatusTenant
        }
    })

    return {
        success: true,
        status: 201,
        message: "Pagamento registrado com sucesso.",
        data: realizarPagamento
    }

}