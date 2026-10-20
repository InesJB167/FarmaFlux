import prisma from "../../../../prisma/prisma.js"

export const suspenderTenantRepository = async(idUser,idTenant)=>{

    return await prisma.tenants.update({
        where:{
            id: idTenant
        },
        data:{
            estado: "SUSPENSO",
            utilizador:{
                connect:{
                    id: idUser
                }
            }
        }
    })
}