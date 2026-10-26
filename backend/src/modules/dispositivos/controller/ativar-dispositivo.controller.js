import { ativarDispositivoService } from "../service/ativar-dispositivo.service.js"


export const ativarDispositivo = async(req,res)=>{
    try {
        const codigoAtivacao = req.body.codigoAtivacao?.trim()
        const deviceId = req.body.deviceId?.trim()
        const fingerPrint = req.body.fingerPrint?.trim()
        
        if(!codigoAtivacao) return res.status(400).json({message: "Insira o código de ativação."})

        if(!deviceId) return res.status(400).json({message: "Identificação do dispositivo faltando."})

        if(!fingerPrint) return res.status(400).json({message: "Fingerprint inválido."})

        const ativando = await ativarDispositivoService(codigoAtivacao, deviceId, fingerPrint)
        return res.status(ativando.status).json(ativando)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}