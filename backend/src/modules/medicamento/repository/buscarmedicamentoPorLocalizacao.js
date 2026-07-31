import prisma from "../../../../prisma/prisma.js"

export const buscarMedicamentosPorLocalizacao = async(localizacao_id) =>{
    return await prisma.medicamentos.findMany({
        where:{
            localizacao_id,
            deleted_at: null
        },
        include:{
            localizacao:{
                select:{
                    id: true,
                    zona: true,
                    estante:true,
                    nivel: true
                }
            }
        }
    })
}