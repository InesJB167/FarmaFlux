import prisma from "../../../../prisma/prisma.js"
import { buscarVendaPorId } from "../repository/buscarVendaPorId.js"

export const alterarStatusVendaService = async(idVenda,statusVenda)=>{
    const encontrarVenda = await buscarVendaPorId(idVenda)

    if(!encontrarVenda) return{
        success: false,
        status: 404,
        message: "Venda não encontrada."
    }

    const statusAtual = encontrarVenda.status
    console.log("o status desta venda ",statusAtual)

    if(statusAtual === "CANCELLED" || statusAtual === "COMPLETED") return{
        success: false,
        status: 409,
        message: "O status desta venda não pode ser alterado."
    }

    if(statusAtual === statusVenda) return{
        success: false,
        status: 409,
        message:"Status Atual."
    }

    if(statusVenda === "COMPLETED"){
        /**
         * Verificar se possui itens
         * Encaminhar para validação dos itens/estoque
         * Encaminhar para pagamento
         * Aplicar FEFO
         * Baixar estoque
         * Alterar status para FINALIZADA
         * Gerar comprovativo
         */

        const itensDaVenda = encontrarVenda
    }

    const alterarStatus = await prisma.vendas.update({
        where:{
            id: idVenda
        },
        data:{
            status: statusVenda,
            updated_at: new Date()
        },
        select:{
            id: true,
            utilizador:{
                select:{
                    id: true,
                    nome: true
                }
            },
            status: true,
            updated_at: true
        }
    })

    return{
        success: true,
        status: 200,
        message: "Status da venda Atualizado.",
        data: alterarStatus
    }

}