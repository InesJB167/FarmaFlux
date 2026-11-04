import prisma from "../../../../prisma/prisma.js"
import { buscarFornecedorPorNomeENif } from "../repository/buscarFornecedorPorNomeENif.js"
import { buscarFarmaciaPorId } from "../../farmacia/repository/buscarFarmaciaPorId.js"

export const registrarFornecedorService = async (dados, farmaciaId) =>
{
    const farmacia = await buscarFarmaciaPorId(farmaciaId)
    if (!farmacia) return {
        success: false,
        status: 404,
        message: "Farmácia não encontrada."
    }

    const farmacia_id = parseInt(farmacia.id)

    const encontrarFornecedor = await buscarFornecedorPorNomeENif(farmacia_id,dados.nome_empresa, dados.nif)

    if (encontrarFornecedor) {
        if (encontrarFornecedor.nif === dados.nif) return {
            success: false,
            status: 409,
            message: "Este NIF pertence a um fornecedor."
        }
    }

    const registrarNovoFornecedor = await prisma.fornecedores.create({
        data: {
            farmacia:{
                connect:{
                    id: farmacia_id
                }
            },
            ...dados
        },
        include:{
            farmacia:{
                select:{
                    id: true,
                    nome_comercial: true
                }
            }
        }
    })

    return {
        success: true,
        status: 201,
        message: "Fornecedor registrado.",
        data: registrarNovoFornecedor
    }
}