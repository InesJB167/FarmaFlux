import prisma from "../../../../prisma/prisma.js";

export const buscarItemVendaPeloIdVendaEidmedicamento = async(idVenda,idMedicamento)=>{
    return await prisma.itens_venda.findFirst({
        where: {
            venda_id : idVenda,
            medicamento_id: idMedicamento
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