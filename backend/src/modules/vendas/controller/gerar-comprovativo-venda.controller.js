import {gerarComprovativoVendaService } from "../service/gerar-comprovativo-venda.service.js"
import {validarId} from "../../../utils/validar-id.js"

export const gerarComprovativoVenda = async (req,res)=>{
    try {
        const idVenda = Number(req.params.id)
        if(!validarId()) return res.status(400).json({message:"ID venda inválido."})
        
        const gerarComprovativo = await gerarComprovativoVendaService(idVenda)

        return res.status(gerarComprovativo.status).json(gerarComprovativo)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}