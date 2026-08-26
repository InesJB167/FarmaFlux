import prisma from "../../../../prisma/prisma.js";

export const buscarVendaPorId = async (idVenda)=>{
    return await prisma.vendas.findUnique({
        where:{
            id: idVenda
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