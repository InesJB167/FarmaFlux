import prisma from "../../../../prisma/prisma.js";

export const listarFornecedoresAtivos = async ()=>{
    return await prisma.fornecedores.findMany({
        where:{
            deleted_at: null
        },
        select:{
            id: true,
            nome_empresa: true,
            nif: true,
            contacto: true,
            endereco: true
        },
        orderBy:{
            nome_empresa: "asc"
        }
    })
}