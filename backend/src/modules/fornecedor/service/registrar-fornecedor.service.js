import prisma from "../../../../prisma/prisma.js"
import { buscarFornecedorPorNomeENif } from "../repository/buscarFornecedorPorNomeENif.js"

export const registrarFornecedorService = async (dados) => {
    
    const encontrarFornecedor = await buscarFornecedorPorNomeENif(dados.nome_empresa, dados.nif)

    if (encontrarFornecedor) {
        if (encontrarFornecedor.nif === dados.nif) return {
            success: false,
            status: 409,
            message: "Este NIF pertence a um fornecedor."
        }
    }

    const registrarNovoFornecedor = await prisma.fornecedores.create({
        data: dados
    })

    return {
        success: true,
        status: 201,
        message: "Fornecedor registrado.",
        data: registrarNovoFornecedor
    }
}