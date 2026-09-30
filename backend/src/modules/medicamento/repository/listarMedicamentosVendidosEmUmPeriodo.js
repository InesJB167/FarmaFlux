import prisma from "../../../../prisma/prisma.js"

export const listarMedicamentoVendidosEmUmPeriodo = async(dataInicio,dataFim)=>{
    return prisma.medicamentos.findMany({
        where:{
            lotes:{
                some:{
                    updated_at:{
                        gte: dataInicio,
                        lte: dataFim
                    }
                }
            }
        },
        select:{
            id: true,
            nome: true,
            categoria:{
                select:{
                    id: true,
                    nome: true
                }
            },
            taxas_ivas: {
                select:{
                    id: true,
                    codigo_legal: true,
                    percentagem: true,
                    motivo_de_insercao_iva: true
                }
            }
        }
    })
}