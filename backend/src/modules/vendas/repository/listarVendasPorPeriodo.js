import prisma from "../../../../prisma/prisma.js"

export const listarVendasPorPeriodo = async (dataInicio, dataFim) =>
{
    return prisma.vendas.findMany({
        where: {
            OR: [
                {
                    data_hora: {
                        gte: dataInicio,
                        lte: dataFim
                    },
                    status: "COMPLETED",
                },
                {
                    data_hora: {
                        gte: dataInicio,
                        lte: dataFim
                    },
                    status: "CANCELLED",
                    fatura: {
                        isNot: null
                    }
                }
            ]
        },
        include: {
            cliente: true,
            fatura: true,
            notas_credito: true,
            pagamentos: true,
            itens_venda: {
                include: {
                    medicamento: {
                        select: {
                            nome: true
                        }
                    }
                }
            },
            utilizador: {
                select: {
                    id: true,
                    nome: true,
                    role: true
                }
            }
        }
    })
}