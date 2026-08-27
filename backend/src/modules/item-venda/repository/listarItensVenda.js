import prisma from "../../../../prisma/prisma.js";

export const listarItensVenda = async (idVenda)=>{
    return await prisma.itens_venda.findMany({
        where:{
            venda_id: idVenda
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