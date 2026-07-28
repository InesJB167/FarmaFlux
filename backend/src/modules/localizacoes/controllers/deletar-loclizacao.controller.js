import {deletarLocalizacaoService} from "../services/deletar-localizacao.service.js"

export const deletarLocalizacao = async (req, res)=>{
    try {
        const id = Number(req.params.id)
        if(Number.isNaN(id)) return res.status(400).json({message:"ID inválido"})
        
        const deletandoLocalizacao = await deletarLocalizacaoService(id)
        if(!deletandoLocalizacao.success) return res.status(deletandoLocalizacao.status).json(deletandoLocalizacao)
        
        return res.json(deletandoLocalizacao)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}