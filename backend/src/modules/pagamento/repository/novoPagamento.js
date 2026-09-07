import prima from "../../../../prisma/prisma.js"

export const novoPagamento = async(dadosDoPagamento)=>{
    const realizarPagamento = await prima.pagamentos.create({
        data:{
            ...dadosDoPagamento
        }
    })
}