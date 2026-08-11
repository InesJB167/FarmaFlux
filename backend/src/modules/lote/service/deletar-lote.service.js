import prisma from "../../../../prisma/prisma.js";
import { buscarLotePorId } from "../repository/buscarLotePorId.js";

export const deletarLoteService = async (idLote) =>{
    const encontrarLote = await buscarLotePorId(idLote)

    if(!encontrarLote) return{
        success: false,
        status: 404,
        message: "Lote não encontrado"
    }

    const quantidadeMedicamentos = encontrarLote.qtd_atual

    const dataValidade = encontrarLote.data_validade.toISOString().split('T')[0]
    const dataAtual = new Date().toISOString().split('T')[0]

    console.log(" data de validade ",dataValidade, "quantidade de mediacemto", quantidadeMedicamentos, "data atual ", dataAtual)

    if(quantidadeMedicamentos > 0) return{
        success: false,
        status: 409,
        message: "Existem medicamentos registrados."
    }

    if(dataValidade > dataAtual) return {
        success: false,
        status: 409,
        message: "Este lote ainda não passou a data de validade."
    }

    const deletarLote = await prisma.lotes.update({
        where:{
            id: idLote
        },
        data: {
            deleted_at: new Date()
        },
        select:{
            id: true,
            numero_lote: true,
            qtd_atual: true,
            data_validade: true,
            deleted_at: true
        }
    })

    return{
        success: true,
        status: 200,
        message: "Lote deletado com sucesso.",
        data: deletarLote
    }
}