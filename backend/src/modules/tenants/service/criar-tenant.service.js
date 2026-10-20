import prisma from "../../../../prisma/prisma.js"
import { buscarTenantId } from "../repository/buscarTenantId.js"
import { buscarPagamentoPorReferencia } from "../../pagamento_licenca/repos/buscarPagamentoPorReferencia.js"
import { buscarPlanoLicencaPorId } from "../../planos_licenca/repos/buscarPlanoPorId.js"

export const criarTenantService = async (idUser, dadosTenant, dadosPagamento) =>
{
    const tenant = await buscarTenantId(dadosTenant.tenant_id)
    if (tenant) return {
        success: false,
        status: 409,
        message: "Ja exite um tenant com esta identificação."
    }

    const pagamentoDeLicenca = await buscarPagamentoPorReferencia(dadosPagamento.referencia)
    if (pagamentoDeLicenca) return {
        success: false,
        status: 409,
        message: "Essa referência pertence a um pagamento registrado."
    }

    const planoLicenca = await buscarPlanoLicencaPorId(dadosPagamento.idPlano)
    if (!planoLicenca) return {
        success: false,
        status: 404,
        message: "Plano licença não encontrado."
    }

    const custoPlano = parseFloat(planoLicenca.custo)
    const valorPago = dadosPagamento.valorPago
    console.log(`valor pago ${valorPago}, custo ${custoPlano}`)
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

    const diaPagamento = new Date()
    const duracaoPlano = planoLicenca.duracao_dias
    const diasIncrementados = diaPagamento.getDate() + duracaoPlano
    const diaFimPlano = new Date(diaPagamento.setDate(diasIncrementados))

    const dadosParaRegistroPagamento = {
        valor_pago: dadosPagamento.valorPago,
        metodo: dadosPagamento.metodoUsado,
        referencia: dadosPagamento.referencia,
        data_inicio: new Date(),
        data_fim: diaFimPlano
    }

    dadosTenant.data_proximo_pagamento = diaFimPlano

    const registrarTenant = await prisma.$transaction(async (tx) => {
        const novoTenant = await tx.tenants.create({
            data: {
                utilizador: {
                    connect: {
                        id: idUser
                    }
                },
                ...dadosTenant
            }
        })

        const registrarPagamento = await tx.pagamento_licenca.create({
            data:{
                tenant:{
                    connect:{
                        id: novoTenant.id
                    }
                },
                plano:{
                    connect:{
                        id: planoLicenca.id
                    }
                },
                utilizador:{
                    connect :{
                        id: idUser
                    }
                },
                ...dadosParaRegistroPagamento
            }
        })

        return {
            novoTenant,
            registrarPagamento
        }
    })

    return {
        success: false,
        status: 409,
        message: "Tenant criado com sucesso.",
        data: registrarTenant
    }
}