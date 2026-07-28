import prisma from "../../../../prisma/prisma.js"
import { buscarCategoriaPorId } from "../../categoria/repository/buscar-categoria-porId.js"
import { buscarLocalizacaoPorId } from "../../localizacoes/repository/buscar-localizacoesPorId.js"

export const registrarMedicamentoService = async (nome , principio_ativo , dosagem,preco_venda ,stock_minimo , categoria_id,localizacao_id) =>{

    const encontrarCategoria = await buscarCategoriaPorId(categoria_id)

    if(!encontrarCategoria) return{
        success: false,
        status: 404,
        message: "Esta categoria não esta disponivel."
    }

    if(localizacao_id){
        const encontrarLocalizacao = await buscarLocalizacaoPorId(localizacao_id)

        if(!encontrarLocalizacao) return{
            success: false,
            status: 404,
            message: "Localização não encontrada"
        }
    }
    
    const registrarNovoMedicamento = await prisma.medicamentos.create({
        data:{
            nome,
            principio_ativo,
            dosagem,
            preco_venda,
            stock_minimo,
            categoria_id,
            localizacao_id
        }
    })

    return {
        success: true,
        status: 201,
        message: "Medicamento registrado.",
        data: registrarNovoMedicamento
    }
}