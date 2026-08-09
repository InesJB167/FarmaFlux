import { buscarMedicamentoPorId } from "../../medicamento/repository/buscarMedicamentoPorId.js";
import { buscarFornecedorPorId } from "../../fornecedor/repository/buscarFornecedorPorId.js";
import { buscarLotePorNumeroFornecedorMedicamento } from "../repository/buscarLotePorNumeroFornecedorEMedicamento.js"
import prisma from "../../../../prisma/prisma.js";

export const registrarLotesService = async (idMedicamento, idFornecedor, dadosRegistro) => {
    const verificarMedicamento = await buscarMedicamentoPorId(idMedicamento)
    const verificarFornecedor = await buscarFornecedorPorId(idFornecedor)

    if (!verificarMedicamento) return {
        success: false,
        status: 404,
        message: "Medicamento não encontrado."
    }

    if (!verificarFornecedor) return {
        success: false,
        status: 404,
        message: "Fornecedor não encontrado."
    }

    const verificarLote = await buscarLotePorNumeroFornecedorMedicamento(idMedicamento, idFornecedor, dadosRegistro.numero_lote)

    if (verificarLote) {
        return {
            success: false,
            status: 409,
            message: "Ja existe um lote com estes dados."
        }
    }

    const registrarLote = await prisma.lotes.create({
        data: {
            medicamento_id: idMedicamento,
            fornecedor_id: idFornecedor,
            ...dadosRegistro,
            qtd_atual: dadosRegistro.qtd_inicial
        },
        select:{
            id: true,
            numero_lote: true,
            medicamento:{
                select:{
                    id:true,
                    nome: true
                }
            },
            fornecedor: {
                select:{
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
        status: 201,
        message: "Lote registrado.",
        data: registrarLote
    }
}