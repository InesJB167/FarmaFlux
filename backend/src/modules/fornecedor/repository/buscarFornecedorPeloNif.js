import prisma from "../../../../prisma/prisma.js";

export const buscarFornecedorPeloNif = async (nif)=>{
    return await prisma.fornecedores.findUnique({
        where: {
            nif
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