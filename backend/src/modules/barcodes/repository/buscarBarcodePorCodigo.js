import prisma from "../../../../prisma/prisma.js";

export const buscarBarcodePorCodigo = async (farmacia_id,codigo) => {
    return await prisma.barcodes.findUnique({
        where: {
            farmacia_id_codigo:{farmacia_id,codigo},
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