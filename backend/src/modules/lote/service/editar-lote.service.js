import prisma from "../../../../prisma/prisma.js";
import { comparandoObjectos } from "../../../utils/comparando-objectos.js";
import { buscarLotePorId } from "../repository/buscarLotePorId.js";
import { buscarLotePorNumeroFornecedorMedicamento } from "../repository/buscarLotePorNumeroFornecedorEMedicamento.js";
import { buscarMedicamentoPorId } from "../../medicamento/repository/buscarMedicamentoPorId.js"
import { buscarFornecedorPorId } from "../../fornecedor/repository/buscarFornecedorPorId.js"
import { buscarFornecedorPorNif } from "../../fornecedor/repository/buscarFornecedorPorNif.js"

export const editarLoteService = async (idLote, dadosModificados, idUser) =>
{
    const buscarLote = await buscarLotePorId(idLote)

    if (!buscarLote) return {
        success: false,
        status: 404,
        message: "Lote não encontrado."
    }

    /**
     * !na hora da edicao não pode ser permitido que os dados novos nomeadamente (idMedicamento ,idFornecedor e o numero do lote) seja identicos a um ja existe ...pois isso fere uma das regras de negocio.
     */
    console.log("dados do controller ", dadosModificados)

    const dadosNovos = {
        numero_lote: dadosModificados.numero_lote || buscarLote.numero_lote,
        data_validade: dadosModificados.data_validade ?? buscarLote.data_validade,
        qtd_inicial: buscarLote.qtd_inicial,
        qtd_atual: dadosModificados.qtd_atual ?? buscarLote.qtd_atual,
        preco_custo: dadosModificados.preco_custo ?? buscarLote.preco_custo
    }


    let medicamento_id = buscarLote.medicamento.id
    let fornecedor_id = buscarLote.fornecedor.id

    if (dadosModificados.hasOwnProperty("medicamento_id")) {
        const encontrarMedicamento = await buscarMedicamentoPorId(dadosModificados.medicamento_id)
        if (!encontrarMedicamento) {
            return {
                success: false,
                status: 404,
                message: "Medicamento não encontrado."
            }
        } else {
            medicamento_id = encontrarMedicamento.id
            console.log("ver medicamento id", medicamento_id)
        }
    }

    if (dadosModificados.hasOwnProperty("fornecedor_id")) {
        const encontrarFornecedor = await buscarFornecedorPorId(dadosModificados.fornecedor_id)
        if (!encontrarFornecedor) {
            return {
                success: false,
                status: 404,
                message: "Fornecedor não encontrado."
            }
        } else {
            fornecedor_id = encontrarFornecedor.id
            console.log("ver fornecedor id", fornecedor_id)
            //!caso o fornecedor seja encontrado o nif deve ser modificado automaticamente.
            dadosNovos.nif_fornecedor = encontrarFornecedor.nif
        }
    }

    if (dadosModificados.hasOwnProperty("nif_fornecedor")) {
        const nif = dadosModificados.nif_fornecedor
        const encontrarNifFornecedor = await buscarFornecedorPorNif(nif)

        if (!encontrarNifFornecedor) {
            return {
                success: false,
                status: 404,
                message: "Não foi encontrado nenhum fornecedor com este NIF."
            }
        } else {
            fornecedor_id = encontrarNifFornecedor.id
            dadosNovos.nif_fornecedor = nif
        }
    }

    if (dadosModificados.hasOwnProperty("qtd_atual")) {
        if (dadosModificados.qtd_atual > buscarLote.qtd_inicial) {
            return {
                success: false,
                status: 409,
                message: "Quantidade atual não pode ser maior que a quantidade inicial."
            }
        } else if (dadosModificados.qtd_atual < 0) {
            return {
                success: false,
                status: 400,
                message: "Quantidade atual não pode ser negativa."
            }
        }
    }

    const verificarLote = await buscarLotePorNumeroFornecedorMedicamento(medicamento_id, fornecedor_id, dadosNovos.numero_lote)

    if (verificarLote && verificarLote.id !== idLote) return {
        success: false,
        status: 409,
        message: "Ja existe um lote com estes dados."
    }

    const dadosIguais = comparandoObjectos(dadosNovos, buscarLote)

    if (dadosNovos.hasOwnProperty("qtd_atual") && dadosNovos.qtd_atual !== buscarLote.qtd_atual) {
        const editarStock = await prisma.$transaction(async (tx) =>
        {
            const editarLoteComAuditoria = await tx.lotes.update({
                where: {
                    id: idLote
                },
                data: {
                    medicamento: {
                        connect: {
                            id: medicamento_id
                        }
                    },
                    fornecedor: {
                        connect: {
                            id: fornecedor_id
                        }
                    },
                    ...dadosNovos
                },
                select: {
                    id: true,
                    numero_lote: true,
                    medicamento: {
                        select: {
                            id: true,
                            nome: true
                        }
                    },
                    fornecedor: {
                        select: {
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

            const dadosLogAditoria = {
                utilizador_id: idUser,
                acao: "AJUSTE_STOCK",
                tabela: "lotes",
                id_registro: idLote,
                valor_antigo: buscarLote.qtd_atual,
                valor_novo: editarLoteComAuditoria.qtd_atual
            }

            const registrarLog = await tx.logs_auditoria.create({
                data: {
                    ...dadosLogAditoria
                }
            })
        })

        return {
            success: true,
            status: 200,
            message: "Dados editados com sucesso.",
            data: editarStock
        }
    }

    if (dadosIguais) return {
        success: false,
        status: 409,
        message: "Dados ja registrados."
    }

    const editarLote = await prisma.lotes.update({
        where: {
            id: idLote
        },
        data: {
            medicamento: {
                connect: {
                    id: medicamento_id
                }
            },
            fornecedor: {
                connect: {
                    id: fornecedor_id
                }
            },
            ...dadosNovos
        },
        select: {
            id: true,
            numero_lote: true,
            medicamento: {
                select: {
                    id: true,
                    nome: true
                }
            },
            fornecedor: {
                select: {
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

    return {
        success: true,
        status: 200,
        message: "Dados editados com sucesso.",
        data: editarLote
    }

}