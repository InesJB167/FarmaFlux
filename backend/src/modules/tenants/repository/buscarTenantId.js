import prisma from "../../../../prisma/prisma.js"

export const buscarTenantId = async(tenantId)=>{
    return await prisma.tenants.findUnique({
        where:{
            tenant_id: tenantId
        }
    })
}