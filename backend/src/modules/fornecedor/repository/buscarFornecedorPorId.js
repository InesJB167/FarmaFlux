import prisma from "../../../../prisma/prisma.js";

export const buscarFornecedorPorId = async (id)=>{
    return await prisma.fornecedores.findFirst({
        where:{
            id,
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