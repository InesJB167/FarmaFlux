import prisma from "../../../../prisma/prisma.js";

export const buscarInformacoesLotesFornecedores = async(id) =>{
    return await prisma.fornecedores.findFirst({
        where:{
            id,
            deleted_at: null
        },
        include:{
            _count:{
                select:{
                    lotes: true
                }
            }
        }
    })
}