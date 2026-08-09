import prisma from "../../../../prisma/prisma.js";

export const buscarLotePorId = async (idLote) =>{
    return await prisma.lotes.findFirst({
        where: {
            id: idLote,
            deleted_at: null
        },
        select:{
            id: true,
            numero_lote: true,
            medicamento:{
                select:{
                    id:true,
                    nome: true
                }
            },
            fornecedor: {
                select:{
                    id: true,
                    nome_empresa: true,
                    nif: true
                }
            },
            qtd_inicial: true,
            qtd_atual: true,
            preco_custo: true,
            data_entrada: true,
            data_validade: true
        }
    })
}