import prisma from "../../../../prisma/prisma.js";

export const buscarLotePorNumeroFornecedorMedicamento= async(idMedicamento,idFornecedor, numero_lote)=>{
    return await prisma.lotes.findFirst({
        where:{
            medicamento_id: idMedicamento,
            fornecedor_id: idFornecedor,
            numero_lote
        },
        include:{
            medicamento:{
                select:{
                    id: true,
                    nome: true
                }
            },
            fornecedor: {
                select:{
                    id: true,
                    nome_empresa: true
                }
            }
        }
    })
}