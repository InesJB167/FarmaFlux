import {consultarStockTotalService} from "../service/consultar-stock-total.service.js"

export const consultarStockTotal = async(req,res)=>{
    try {
        const lotesNoStock = await consultarStockTotalService()
        return res.status(lotesNoStock.status).json(lotesNoStock)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}