import prisma from "../../../../prisma/prisma.js";

export const listarFornecedoresAtivos = async (farmaciaId)=>{
    return await prisma.fornecedores.findMany({
        where:{
            farmacia_id: farmaciaId,
            deleted_at: null
        },
        select:{
            id: true,
            nome_empresa: true,
            nif: true,
            contacto: true,
            endereco: true,
            farmacia_id: true
        },
        orderBy:{
            nome_empresa: "asc"
        }
    })
}