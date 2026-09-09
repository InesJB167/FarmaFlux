import prisma from "../../../../prisma/prisma.js"

export const efetuarBaixaDeStock = async (itensParaRetirar, client = prisma) =>
{
    /**
     * ?essa função vai baixar o stock assim que a venda é finalizada, retirando os itens dos lotes ,é ela que mexe na BD
     * 
    */

    const lotesMovimentados = []

    for (let item of itensParaRetirar) {
        console.log("item para retirar",item)
        const idItem = item.id
        const lotesParaRetirar = item.lotes
        console.log("lotes Para Retirar",lotesParaRetirar)
        let lotesRetirados = []

        for (let lote of lotesParaRetirar) {
            const idLote = lote.id
            const quantiaParaRetirar = lote.quantidade
            let loteRetirado = {
                id: idLote
            }
            const encontrarLote = await client.lotes.findUnique({
                where: {
                    id: idLote
                },
            })
            if (encontrarLote) {
                const quantiaEncontrada = encontrarLote.qtd_atual
                const novaQuantia = quantiaEncontrada - quantiaParaRetirar

                if (novaQuantia < 0) {
                    console.log("nova quantia", novaQuantia)
                    throw new Error("Quantia negativa.")
                }

                const retirarMedicamentos = await client.lotes.update({
                    where: {
                        id: idLote
                    },
                    data: {
                        qtd_atual: novaQuantia
                    },
                    select: {
                        id: true,
                        numero_lote: true,
                        medicamento: {
                            select: {
                                nome: true
                            }
                        },
                        qtd_atual: true
                    }
                })

                await client.item_retirado_lote.create({
                    data: {
                        lote: {
                            connect: {
                                id: idLote
                            }
                        },
                        item_venda: {
                            connect: {
                                id: idItem
                            }
                        },
                        quantidade: quantiaParaRetirar
                    }
                })

                loteRetirado.qtd = retirarMedicamentos.qtd_atual

                lotesRetirados.push(loteRetirado)
            } else {
                throw new Error("Nenhum lote foi encontrado.")
            }
        }
        lotesMovimentados.push(lotesRetirados)
    }

    return lotesMovimentados
}