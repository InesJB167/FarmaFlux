import prisma from "../../../../prisma/prisma.js"

export const buscarMedicamentosPorLocalizacao = async(farmaciaId,localizacao_id) =>{
    return await prisma.medicamentos.findMany({
        where:{
            farmacia_id: farmaciaId,
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