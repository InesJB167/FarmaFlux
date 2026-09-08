import prisma from "../../../../prisma/prisma.js"

export const buscarTodosItensDeUmaVenda = async(idVenda)=>{
    /**
     * ?esta funçao limita-se a apresentar os subtotais dos itens da venda
     */
    return await prisma.vendas.findUnique({
        where: {
            id: idVenda,
            status: "DRAFT"
        },
        select:{
            id: true,
            itens_venda:{
                select:{
                    id: true,
                    subtotal: true
                }
            }
        }
    })
}