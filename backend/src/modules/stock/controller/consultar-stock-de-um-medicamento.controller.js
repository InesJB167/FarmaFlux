import { validarId } from "../../../utils/validar-id.js"
import {consultarStockDeUmMedicamentoService} from "../service/consultar-stock-de-um-medicamento.service.js"

export const consultarStockDeUmMedicamento = async(req,res)=>{
    try {
        const idMedicamento = Number(req.params.id)
        if(!validarId(idMedicamento)) return res.status(400).json({message: "ID inválido."})

        const apresentarQuantidade = await consultarStockDeUmMedicamentoService(idMedicamento)

        return res.status(apresentarQuantidade.status).json(apresentarQuantidade)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}