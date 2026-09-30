import { gerarArquivoSaftService } from "../service/gerarArquivoSaft.service.js"

export const gerarArquivoSaft = async(req,res)=>{
    try {
        const dataInicio = new Date(req.body.dataInicio)
        const dataFim = new Date(req.body.dataFim)
        console.log("datainicio ",dataInicio,"data fim ",dataFim)

        if(isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) return res.status(400).json({message:"Informe o perírodo para gerar o saf-t."})
        
        const gerarArquivo = await gerarArquivoSaftService(dataInicio,dataFim)
        return res.status(gerarArquivo.status).json(gerarArquivo)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}