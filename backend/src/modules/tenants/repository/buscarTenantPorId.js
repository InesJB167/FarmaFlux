import prisma from "../../../../prisma/prisma.js"

export const buscarTenantPorId = async(idTenant)=>{
    return await prisma.tenants.findUnique({
        where: {
            id: idTenant
        },
        select:{
            id: true,
            tenant_id: true,
            estado: true,
            data_proximo_pagamento: true,
            limite_dispositivos:true,
            created_at: true,
            utilizador_id: true,
            farmacia:true,
            pagamentos: {
                select:{
                    id: true
                }
            },
            dispositivos: true,
            codigos_ativacao: {
                select:{
                    id: true
                }
            }
        }
    })
}