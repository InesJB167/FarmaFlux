import prisma from "../../../../prisma/prisma.js"

export const buscarClientePorNif = async (farmacia_id, nif, client = prisma) =>
{
    return await client.clientes.findUnique({
        where: {
            farmacia_id_nif: { farmacia_id, nif }
        }
    })
}