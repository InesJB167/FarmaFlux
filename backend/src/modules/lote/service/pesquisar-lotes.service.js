import { buscarLotePorFornecedor } from "../repository/buscarLotePorFornecedor.js"
import { buscarLotePorMedicamento } from "../repository/buscarLotePorMedicamento.js"
import { buscarLotePorNumeroLote } from "../repository/buscarLotePorNumero.js"

export const pesquisarLotesService = async (pesquisarPor) => {
    let pesquisando

    if (Object.hasOwn(pesquisarPor, "numeroLote")) {
        const numeroLote = pesquisarPor.numeroLote
        pesquisando = await buscarLotePorNumeroLote(numeroLote)
    } else if (Object.hasOwn(pesquisarPor, "medicamento")) {
        const medicamento = pesquisarPor.medicamento
        pesquisando = await buscarLotePorMedicamento(medicamento)
    }else if (Object.hasOwn(pesquisarPor, "fornecedor")) {
        const fornecedor = pesquisarPor.fornecedor
        pesquisando = await buscarLotePorFornecedor(fornecedor)
    }

    if (!pesquisando || pesquisando.length <= 0) {
        return {
            success: true,
            status: 200,
            message: "Nenhum item foi encontrado."
        }
    }

    return {
        success: true,
        status: 200,
        message: "Lotes encontrados.",
        data: pesquisando
    }

}