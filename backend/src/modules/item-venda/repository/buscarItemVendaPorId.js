import prisma from "../../../../prisma/prisma.js";

export const buscarItemVendaPorId= async (idItem)=>{
    return await prisma.itens_venda.findUnique({
        where:{
            id: idItem
        },
        select:{
            id: true,
            venda_id: true,
            medicamento:{
                select:{
                    id: true,
                    nome: true
                }
            },
            quantidade: true,
            preco_unitario: true,
            subtotal: true
        }
    })
}