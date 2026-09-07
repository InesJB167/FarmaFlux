import prisma from "../../../../prisma/prisma.js"

export const efetuarBaixaDeStock = async () =>
{
    /**
     * ?essa função vai baixar o stock assim que a venda é finalizada, retirando os itens dos lotes ,é ela que mexe na BD
     * ?ela vai receber os itens ja preparados pela outra funçao ...algo assim:
     * *
     */
    const itensParaRetirar = [
        {   idVenda: 1,
            id: 1,
            idmed: 0,
            nome: "mm",
            lote: [
                { id: 11, quantidade: 75 },
                { id: 10, quantidade: 4 }
            ]
        },
        {   idVenda: 1,
            id: 4,
            idmed: 15,
            nome: "mm",
            lote: [
                { id: 4, quantidade: 10 }
            ]
        }
    ]
    
    const lotesMovimentados = []

    await prisma.$transaction(async (tx) =>
    {
        for (let item of itensParaRetirar) {
            const idItem = item.id
            const lotesParaRetirar = item.lote
            let lotesRetirados = []

            for (let lote of lotesParaRetirar) {
                const idLote = lote.id
                const quantiaParaRetirar = lote.quantidade
                let loteRetirado = {
                    id: idLote
                }
                const encontrarLote = await tx.lotes.findUnique({
                    where: {
                        id: idLote
                    },
                })
                if (encontrarLote) {
                    const quantiaEncontrada = encontrarLote.qtd_atual
                    const novaQuantia = quantiaEncontrada - quantiaParaRetirar

                    if(novaQuantia < 0){
                        console.log("nova quantia"  ,novaQuantia)
                        throw new Error("Quantia negativa.")
                    }

                    const retirarMedicamentos = await tx.lotes.update({
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

                    await tx.item_retirado_lote.create({
                        data:{
                            lote:{
                                connect:{
                                    id: idLote
                                }
                            },
                            item_venda:{
                                connect:{
                                    id: idItem
                                }
                            },
                            quantidade: quantiaParaRetirar
                        }
                    })

                    loteRetirado.qtd = retirarMedicamentos.qtd_atual

                    lotesRetirados.push(loteRetirado)
                }
            }
            lotesMovimentados.push(lotesRetirados)
        }

    })

    return lotesMovimentados
}