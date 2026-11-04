import {listarTodasVendas} from "../repository/listarTodasVendas.js"
import {buscarFarmaciaPorId} from "../../farmacia/repository/buscarFarmaciaPorId.js"

export const listarVendasService = async (farmaciaId)=>{
    const farmacia = await buscarFarmaciaPorId(farmaciaId)
    if(!farmacia) return {
        success: false,
        status: 404,
        message: "Farmácia não encontrada."
    }

    const farmacia_id = parseInt(farmacia.id)
    
    const vendas = await listarTodasVendas(farmacia_id)
    
    if(vendas.length <= 0) return {
        success: true,
        status: 200,
        message: "Nenhuma venda registrada."
    }

    return {
        success: true,
        status: 200,
        message: "Vendas registradas.",
        data: vendas
    }

}