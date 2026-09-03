import { consultarNivelDeStockService } from "../service/consultar-nivel-de-medicamentos-no-stock.service.js"

export const consultarNivelDeMedicamentoNoStock = async(req,res) =>{
    try {
        const medicamentosComNivel = await consultarNivelDeStockService()
        return res.status(medicamentosComNivel.status).json(medicamentosComNivel)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}