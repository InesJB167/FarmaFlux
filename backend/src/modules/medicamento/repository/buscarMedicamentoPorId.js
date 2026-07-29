import prisma from "../../../../prisma/prisma.js"

export const buscarMedicamentoPorId = async (id) =>{
    return await prisma.medicamentos.findFirst({
        where:{
            id: id,
            deleted_at: null
        }
    })
}