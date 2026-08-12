import prisma from "../../../../prisma/prisma.js";

export const buscarFornecedorPorNif = async (nif_fornecedor)=>{
    return await prisma.fornecedores.findFirst({
        where:{
            nif: nif_fornecedor,
            deleted_at: null
        },
        select:{
            id: true,
            nome_empresa: true,
            nif: true
        }
    })
}