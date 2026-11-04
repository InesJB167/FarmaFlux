import prisma from "../../../../prisma/prisma.js";

export const listarTodasVendas = async(farmacia_id)=>{
    return await prisma.vendas.findMany({
        where:{
            farmacia_id
        },
        select:{
            id: true,
            utilizador:{
                select:{
                    id: true,
                    nome: true
                }
            },
            total_bruto: true,
            total_desconto: true,
            data_hora: true,
            status: true
        }
    })
}