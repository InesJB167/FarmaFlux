import { validarId } from "../../../utils/validar-id.js"
import {buscarVendaPorIdService} from "../service/buscar-venda-porId.service.js"

export const buscarVendaPorId = async (req,res)=>{
    try {
        const idVenda = Number(req.params.id)
        const verificarIdVenda = validarId(idVenda)

        if(!verificarIdVenda) return res.status(400).json({message:"ID venda inválido."})

        const enccontrarVenda = await buscarVendaPorIdService(idVenda)

        return res.status(enccontrarVenda.status).json(enccontrarVenda)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}