import { validarId } from "../../../utils/validar-id.js"
import {criarVendaService} from "../service/criar-venda.service.js"

export const criarVenda = async (req, res) =>{
    try {
        const idUser = req.user.id
        console.log(idUser)

        //a venda iniciada ainda não possui total bruto nem desconto
        let totalBruto = 0.00
        let totalDesconto = 0.00

        const verificarId = validarId(idUser)
        if(!verificarId) return res.status(400).json({message:"ID user inválido."})

        const iniciandoVenda = await criarVendaService(idUser,totalBruto,totalDesconto)
        if(!iniciandoVenda.success) return res.status(iniciandoVenda.status).json(iniciandoVenda)

        return res.status(iniciandoVenda.status).json(iniciandoVenda)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}