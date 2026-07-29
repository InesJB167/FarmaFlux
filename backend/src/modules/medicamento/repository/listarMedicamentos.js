import prisma from "../../../../prisma/prisma.js"

export const listarMedicamentos = async () =>{

    return await prisma.medicamentos.findMany({
        where:{
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
                }
            }
        }, 
        orderBy:{
            categoria_id: "asc"
        }
    })
}