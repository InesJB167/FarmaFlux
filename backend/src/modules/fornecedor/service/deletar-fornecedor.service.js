import prisma from "../../../../prisma/prisma.js";
import { buscarFornecedorPorId } from "../repository/buscarFornecedorPorId.js";
import { buscarInformacoesLotesFornecedores } from "../repository/buscarFornecedoresLotes.js"

export const eliminarFornecedorService = async (id) => {
    const encontrarFornecedor = await buscarFornecedorPorId(id)

    if (!encontrarFornecedor) return {
        success: false,
        status: 404,
        message: "Fornecedor não encontrado."
    }

    const fornecedorPossuiLotes = await buscarInformacoesLotesFornecedores(id)

    if (fornecedorPossuiLotes) {

        if (fornecedorPossuiLotes._count.lotes > 0) return {
            success: false,
            status: 409,
            message: "Este fornecedor não pode ser eliminado.",
            data: fornecedorPossuiLotes
        }
    }

    const eliminarFornecedor = await prisma.fornecedores.update({
        where: {
            id
        },
        data: {
            deleted_at: new Date()
        },
        select: {
            id: true,
            nome_empresa: true,
            deleted_at: true
        }
    })

    return {
        success: true,
        status: 200,
        message: "Fornecedor deletado.",
        data: eliminarFornecedor
    }
}