import prisma from "../../../../prisma/prisma.js"
import { buscarMedicamentoPorId } from "../repository/buscarMedicamentoPorId.js"
import { buscarCategoriaPorId } from "../../categoria/repository/buscar-categoria-porId.js"
import { buscarLocalizacaoPorId } from "../../localizacoes/repository/buscar-localizacoesPorId.js"

export const atualizarMedicamentoService = async (medicamento_id, dadosNovos) => {
    const buscarMedicamento = await buscarMedicamentoPorId(medicamento_id)

    if (!buscarMedicamento) return {
        success: false,
        status: 404,
        message: "Medicamento não encontrado."
    }

    const dadosConfirmados = {}

    dadosConfirmados.nome = dadosNovos.nome || buscarMedicamento.nome
    dadosConfirmados.principio_ativo = dadosNovos.principio_ativo || buscarMedicamento.principio_ativo
    dadosConfirmados.dosagem = dadosNovos.dosagem || buscarMedicamento.dosagem
    dadosConfirmados.preco_venda = dadosNovos.preco_venda ?? buscarMedicamento.preco_venda
    dadosConfirmados.stock_minimo = dadosNovos.stock_minimo ?? buscarMedicamento.stock_minimo
    dadosConfirmados.categoria_id = dadosNovos.categoria_id ?? buscarMedicamento.categoria_id
    dadosConfirmados.localizacao_id = dadosNovos.localizacao_id ?? buscarMedicamento.localizacao_id

    /**
     * ? As vezes so precisamos inverter a lógica. 03/08/2026
     */
    let encontrarMudanca = false

    for (let dadoEncontrado in dadosConfirmados) {
        if (dadosConfirmados[dadoEncontrado] !== buscarMedicamento[dadoEncontrado]) {
            encontrarMudanca = true
        }
    }

    if (!encontrarMudanca) return {
        success: false,
        status: 409,
        message: "Dados ja registrados."
    }

    if (dadosConfirmados.categoria_id) {
        const encontrarCategoria = await buscarCategoriaPorId(dadosConfirmados.categoria_id)

        if (!encontrarCategoria) return {
            success: false,
            status: 409,
            message: "Essa categoria não esta disponivel."
        }
    }

    if (dadosConfirmados.localizacao_id) {
        const encontrarLocalizacao = await buscarLocalizacaoPorId(dadosConfirmados.localizacao_id)

        if (!encontrarLocalizacao) return {
            success: false,
            status: 409,
            message: "Essa localização não esta disponivel."
        }
    }

    const atualizarMedicamento = await prisma.medicamentos.update({
        where: {
            id: medicamento_id
        },
        data: dadosConfirmados
    })

    return {
        success: true,
        status: 200,
        message: "Dados atualizados.",
        data: atualizarMedicamento
    }
}