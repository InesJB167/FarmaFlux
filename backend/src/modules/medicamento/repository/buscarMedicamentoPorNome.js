import prisma from "../../../../prisma/prisma.js"

export const buscarMedicamentoPorNome = async (nome) =>{
    return await prisma.medicamentos.findMany({
        where:{
            nome:{
                contains: nome
            },
            deleted_at: null
        }
    })
}