import prisma from "../../../../prisma/prisma.js"
import { randomInt } from "node:crypto"
import { buscarCodigoAtivacao } from "../repos/buscarCodigoAtivacao.js"
import { buscarTenantPorId } from "../../tenants/repository/buscarTenantPorId.js"

export const gerarCodigoAtivacaoService = async(tenantId)=>{
    /**
     * ? essa funçao vai gerar o codigo de ativaçao para o uso do sistema 
     */

    const tenant = await buscarTenantPorId(tenantId)
    if(!tenant) return{
        success: false,
        status: 404,
        message: "Tenant não encontrado."
    }

    const estadoTenant = tenant.estado
    if(estadoTenant !== "ATIVO") return{
        succes: false,
        status: 409,
        message: "Status inativo: não é possivel gerar o código de ativação."
    }

    const sequencia = randomInt(0,10000)
    const codigoAtivacao = `FJB-${sequencia}`
    const idTenant = tenant.id
    const data = new Date()
    const expirando = new Date(data.setMinutes((data.getMinutes()) + 30))

    const codigoExiste = await buscarCodigoAtivacao(codigoAtivacao)
    if(codigoExiste) return{
        success: false,
        status: 409,
        message:"Este codigo ja está sendo usado."
    }

    const registrarCodigo = await prisma.codigos_ativacao.create({
        data:{
            codigo: codigoAtivacao,
            tenant:{
                connect:{
                    id: idTenant
                }
            },
            expira_em: expirando
        }
    })

    return {
        succes: true,
        status: 201,
        message: "Codigo de ativação criado com sucesso.",
        data: registrarCodigo
    }
}