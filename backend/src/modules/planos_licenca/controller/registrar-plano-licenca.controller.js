import {criarPlanoLicenca} from "../service/criar-plano-licenca.service.js"

export const registrarPlanoLicenca = async(req,res)=>{
    try {
        const tiposDeLicenca = ["MENSAL","TRIMESTRAL","SEMESTRAL","ANUAL"]
        const tipoLicenca = req.body.tipoLicenca?.trim().toUpperCase()
        console.log("tipo de licença",tipoLicenca)
        const custo = parseFloat(req.body.custo)

        if(!tipoLicenca || !tiposDeLicenca.includes(tipoLicenca)) return res.status(400).json({message:"Tipo de licença inválido."})

        if(isNaN(custo) || custo <= 0) return res.status(400).json({message:"Valor de custo da licença inválido."})

        const criarPlano = await criarPlanoLicenca(tipoLicenca,custo)
        return res.status(criarPlano.status).json(criarPlano)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}