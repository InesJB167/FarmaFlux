import jwt from "jsonwebtoken"
import { buscarDispositivoPorId } from "../repos/buscarDispositivoPorId.js"
import prisma from "../../../../prisma/prisma.js"
import { buscarTenantPorId } from "../../tenants/repository/buscarTenantPorId.js"

export const renovarTokenDipositivoService = async (token) =>
{
    //* ignorando a data de expiração pra poder verificar os dados do token
    const dadosToken = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true })

    const device = await buscarDispositivoPorId(dadosToken.id)
    if (!device) return {
        success: false,
        status: 404,
        message: "Dispositivo não encontrado."
    }

    if (device.ativo === false) return {
        success: false,
        status: 409,
        message: "Dispositivo inativo."
    }

    const tenantDoDispositivo = parseInt(device.tenant_id_fk)
    const tenantIdDoToken = parseInt(dadosToken.tenant_id)
    const tenant = await buscarTenantPorId(tenantDoDispositivo)
    if(!tenant) return {
        success: false,
        status: 404,
        message: "Tenant não encontrado."
    }

    if(tenant.estado !== "ATIVO") return {
        success: false,
        status: 409,
        message: "Tenant inativo."
    }

    if (tenant.id !== tenantIdDoToken) return {
        success: false,
        status: 409,
        message: "Este dispositivo não pertence ao tenant referenciado."
    }

    if ((!tenant.data_proximo_pagamento || new Date(tenant.data_proximo_pagamento)) <= new Date()) return {
        success: false,
        status: 402,
        message: "Licensa expirada."
    }

    const payload = {
        tenant_id: tenantDoDispositivo,
        type: "dispositivo",
        id: device.id
    }

    const novoToken = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: "8h"
        }
    )

    const atualizarToken = await prisma.dispositivos.update({
        where: {
            id: device.id
        },
        data:{
            token_jwt: novoToken,
            ultimo_acesso: new Date()
        }, 
        select:{
            id: true,
            token_jwt: true
        }
    })

    return {
        success: true,
        status: 200,
        message: "Token renovado com sucesso.",
        data: atualizarToken
    }
}