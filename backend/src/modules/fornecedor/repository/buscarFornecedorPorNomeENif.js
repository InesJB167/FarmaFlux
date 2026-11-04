import prisma from "../../../../prisma/prisma.js";

export const buscarFornecedorPorNomeENif = async (farmacia_id,nome_empresa,nif) =>{
    return await prisma.fornecedores.findFirst({
        where:{
            farmacia_id,
            nome_empresa,
            nif,
            deleted_at : null
        },
        select:{
            id: true,
            nome_empresa: true,
            nif: true,
            contacto: true,
            endereco: true
        }
    })
}