import prisma from "../../../../prisma/prisma.js"

export const listarMedicamentos = async (farmacia_id) =>{

    return await prisma.medicamentos.findMany({
        where:{
            farmacia_id,
            deleted_at: null
        },
        include:{
            categoria:{
                select:{
                    id: true,
                    nome: true
                }
            },
            localizacao:{
                select:{
                    id: true,
                    zona: true,
                    estante: true,
                    nivel: true
                }
            }
        }, 
        orderBy:{
            categoria_id: "asc"
        }
    })
}