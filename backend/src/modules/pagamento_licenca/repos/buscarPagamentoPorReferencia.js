import prisma from "../../../../prisma/prisma.js"

export const buscarPagamentoPorReferencia = async(referenciaPagamento)=>{
    return await prisma.pagamento_licenca.findUnique({
        where: {
            referencia: referenciaPagamento
        }
    })
}