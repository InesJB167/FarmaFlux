import prisma from "../../../../prisma/prisma.js"
import { buscarCategoriaPorId } from "../../categoria/repository/buscar-categoria-porId.js"
import { buscarLocalizacaoPorId } from "../../localizacoes/repository/buscar-localizacoesPorId.js"
import { buscarFarmaciaPorId } from "../../farmacia/repository/buscarFarmaciaPorId.js"

export const registrarMedicamentoService = async (farmaciaId, categoria_id,
    localizacao_id, dadosMedicamentos) =>
{

    const farmacia = await buscarFarmaciaPorId(farmaciaId)
    if (!farmacia) return {
        success: false,
        status: 404,
        message: "Farmácia não encontrada."
    }

    const farmacia_id = parseInt(farmacia.id)

    const encontrarCategoria = await buscarCategoriaPorId(categoria_id)

    if (!encontrarCategoria) return {
        success: false,
        status: 404,
        message: "Esta categoria não esta disponivel."
    }

    if (localizacao_id) {
        const encontrarLocalizacao = await buscarLocalizacaoPorId(localizacao_id)

        if (!encontrarLocalizacao) return {
            success: false,
            status: 404,
            message: "Localização não encontrada"
        }
    }

    let taxaIva = await prisma.taxas_iva.findUnique({
        where: {
            codigo_legal: "ISE"
        }
    })
    if (!taxaIva) {
        taxaIva = await prisma.taxas_iva.create({
            data: {
                codigo_legal: "ISE",
                percentagem: 0,
                motivo_de_insercao_iva: "Isento - medicamentos e especialidades farmacêuticas"
            }
        })
    }

    const idTavaIva = parseInt(taxaIva.id)

    const registrarNovoMedicamento = await prisma.medicamentos.create({
        data: {
            ...dadosMedicamentos,
            categoria: {
                connect: {
                    id: categoria_id
                }
            },
            localizacao: {
                connect: {
                    id: localizacao_id
                }
            },
            farmacia: {
                connect: {
                    id: farmacia_id
                }
            },
            taxas_ivas:{
                connect:{
                    id: idTavaIva
                }
            }
        }
    })

    return {
        success: true,
        status: 201,
        message: "Medicamento registrado.",
        data: registrarNovoMedicamento
    }
}