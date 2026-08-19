import prisma from "../../../../prisma/prisma.js";

export const buscarBarcodePorCodigo = async (codigo) => {
    return await prisma.barcodes.findFirst({
        where: {
            codigo,
            deleted_at: null
        },
        select: {
            id: true,
            codigo: true,
            medicamentos: {
                select: {
                    id: true,
                    nome: true
                }
            }
        }
    })
}