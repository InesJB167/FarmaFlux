import prisma from "../../../../prisma/prisma.js"
import { buscarTenantPorId } from "../../tenants/repository/buscarTenantPorId.js"
import { buscarFarmaciaPeloNif } from "../repository/buscarFarmaciaPeloNif.js"

export const registrarFarmaciaService = async (idUser, tenantId, dadosFarmacia) =>
{
    const tenant = await buscarTenantPorId(tenantId)
    if (!tenant) return {
        success: false,
        status: 404,
        message: "Tenant não encontrado."
    }

    if (tenant.estado !== "ATIVO") return {
        success: false,
        status: 409,
        message: "Tenant inativo: não é possível registrar a farmácia."
    }

    if (tenant.farmacia) return {
        success: false,
        status: 409,
        message: "Tenant em uso: ja possui uma farmácia registrada."
    }

    const farmacia = await buscarFarmaciaPeloNif(dadosFarmacia.nif)
    if (farmacia) return {
        success: false,
        status: 409,
        message: "Ja foi registrada uma Farmácia com este nif."
    }

    const novaFarmacia = await prisma.farmacia.create({
        data: {
            utilizador: {
                connect: {
                    id: idUser
                }
            },
            tenant: {
                connect: {
                    id: tenantId
                }
            },
            ...dadosFarmacia
        }
    })

    return {
        success: true,
        status: 201,
        message: "Farmácia registrada com sucesso.",
        data: novaFarmacia
    }
}