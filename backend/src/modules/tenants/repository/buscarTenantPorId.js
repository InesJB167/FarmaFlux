import prisma from "../../../../prisma/prisma.js"

export const buscarTenantPorId = async(idTenant)=>{
    return await prisma.tenants.findUnique({
        where: {
            id: idTenant
        }
    })
}