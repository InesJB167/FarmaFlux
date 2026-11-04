import {listarVendasService} from "../service/listar-vendas.service.js"
import {buscarDadosFarmacia} from "../../../utils/buscarDadosFarmacia.js"

export const listarTodasVendas = async(req,res)=>{
    try {
        const farmaciaId = buscarDadosFarmacia(req,res)
        const vendasRegistrdas = await listarVendasService(farmaciaId)
        return res.status(vendasRegistrdas.status).json(vendasRegistrdas)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}