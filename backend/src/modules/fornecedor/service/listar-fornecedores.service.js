import { listarFornecedoresAtivos } from "../repository/listarFornecedoresAtivos.js"

export const listarFornecedoresService = async () => {
    const listarFornecedores = await listarFornecedoresAtivos()
    if (listarFornecedores.length === 0) {
        return {
            success: true,
            status: 200,
            message: "Não existem fornecedores registrados.",
            data: []
        }
    }

    return {
        success: true,
        status: 200,
        message: "Lista de fornecedores obtida com sucesso.",
        data: listarFornecedores
    }
}