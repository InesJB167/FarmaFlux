import { gerarCodigoAtivacaoService } from "../service/gerar-codigo-ativacao.service.js"

export const gerarCodigoAtivacao = async(req,res)=>{
    try {
        const tenantId = parseInt(req.params.id)
        
        if(!tenantId || isNaN(tenantId)) return res.status(400).json({message: "O tenant id inválido."})
        const gerarCodigo = await gerarCodigoAtivacaoService(tenantId)
        return res.status(gerarCodigo.status).json(gerarCodigo)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}