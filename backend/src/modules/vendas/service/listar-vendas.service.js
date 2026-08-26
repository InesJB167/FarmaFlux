import {listarTodasVendas} from "../repository/listarTodasVendas.js"

export const listarVendasService = async ()=>{
    const vendas = await listarTodasVendas()
    
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