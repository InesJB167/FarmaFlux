import prisma from "../../../../prisma/prisma.js"
import { buscarCodigoPlanoLicenca } from "../repos/buscarCodigoPlanoLicenca.js"

export const criarPlanoLicenca = async (tipoLicenca, custo) =>
{
    let duracaoPlano
    let codigoLicenca
    switch (tipoLicenca) {
        case "MENSAL":
            duracaoPlano = 30
            codigoLicenca = "LCM"
            break
        case "TRIMESTRAL":
            duracaoPlano = 90
            codigoLicenca = "LCT"
            break
        case "SEMESTRAL":
            duracaoPlano = 180
            codigoLicenca = "LCS"
            break
        case "ANUAL":
            duracaoPlano = 365
            codigoLicenca = "LCA"
            break
        default:
            duracaoPlano = 30
            codigoLicenca = "LCM"
    }

    const codigoExiste = await buscarCodigoPlanoLicenca(codigoLicenca)
    if(codigoExiste) return{
        success: false,
        status: 409,
        message: "Ja existe uma licença deste tipo."
    }

    const criarPlano = await prisma.planos_licenca.create({
        data:{
            codigo: codigoLicenca,
            tipo: tipoLicenca,
            custo: custo,
            duracao_dias: duracaoPlano
        }
    })

    return {
        success: true,
        status: 201,
        message: "Plano de licença criado com sucesso.",
        data: criarPlano
    }

}