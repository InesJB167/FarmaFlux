import prisma from "../../../../prisma/prisma.js"
import { buscarTenantPorId } from "../../tenants/repository/buscarTenantPorId.js"
import { buscarFarmaciaPeloNif } from "../repository/buscarFarmaciaPeloNif.js"
import { buscarClientePorNif } from "../../clientes/repository/buscarClientePorNif.js"
import bcrypt from "bcrypt"

export const registrarFarmaciaService = async ( tenantId, dadosFarmacia) =>
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

    const registrandoFarmacia = await prisma.$transaction(async (tx) =>
    {
        const novaFarmacia = await tx.farmacia.create({
            data: {
                tenant: {
                    connect: {
                        id: tenantId
                    }
                },
                ...dadosFarmacia
            },
            select:{
                id: true,
                nif: true,
                razao_social: true,
                nome_comercial: true,
                numero_certificado_software: true,
                tenant: {
                    select:{
                        tenant_id: true
                    }
                },
                clientes: {
                    select:{
                        nome: true
                    }
                },
                utilizadores:{
                    select:{
                        username: true,
                        nome: true,
                        role: true
                    }
                }
            }
        })

        let cliente = await buscarClientePorNif( "999999999",tx)
        if (!cliente) {
            cliente = await tx.clientes.create({
                data: {
                    nome: "Consumidor Final",
                    nif: "999999999",
                    endereco: null,
                    farmacia: {
                        connect: {
                            id: novaFarmacia.id
                        }
                    }
                }
            })
        }

        //?creating user client
        const senhaAdmin = process.env.ADMIN_PASSWORD
        if (!senhaAdmin) {
            throw new Error("Senha não definida na .env")
        }

        const hashAdmin = await bcrypt.hash(senhaAdmin, 10)

        const user = await tx.utilizadores.create({
            data: {
                username: "admin",
                nome: `Administrador - ${novaFarmacia.nif}`,
                password_hash: hashAdmin,
                role: "ADMIN",
                status: "ATIVO",
                farmacia:{
                    connect: {
                        id: novaFarmacia.id
                    }
                }
            }
        })

        return novaFarmacia
    })

    return {
        success: true,
        status: 201,
        message: "Farmácia registrada com sucesso.",
        data: registrandoFarmacia
    }
}