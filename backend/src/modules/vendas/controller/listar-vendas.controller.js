import {listarVendasService} from "../service/listar-vendas.service.js"

export const listarTodasVendas = async(req,res)=>{
    try {
        const vendasRegistrdas = await listarVendasService()
        return res.status(vendasRegistrdas.status).json(vendasRegistrdas)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}