import { validarId } from "../../../../utils/validar-id.js"
import { criarArquivoSaftXml } from "../service/criarArquivoSaftXml.service.js"
import { decodificarToken } from "../../../../utils/decodificandoToken.js"
import jwt from "jsonwebtoken"

export const gerarArquivoSaft = async (req, res) =>
{
    try {
        const dataInicio = new Date(req.body.dataInicio)
        const dataFim = new Date(req.body.dataFim)
        console.log("datainicio ", dataInicio, "data fim ", dataFim)
        /**
     * !É IMPORTANTE QUE AO GERAR  SAF-T SE SAIBA QUAL É OO ID DA FARMÁCIA EM QUESTÃO POR AGORA VAMOS BUSCAR A FARMACIA POR ID MAS COM O TEMPO VEREMOS COMO SABER AUTOMATICAMENTE O ID DA FARMACIA 
     */
        const authorization = req.headers.authorization
        const token = decodificarToken(authorization)

        if (!authorization || !token) return res.status(400).json({ message: "Token inválido ou mal formatado." })

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const farmaciaId = parseInt(payload.farmacia_id)
        
        if (!farmaciaId || !validarId(farmaciaId)) return res.status(400).json({ message: "Id farmácia faltando." })

        if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) return res.status(400).json({ message: "Informe o perírodo para gerar o saf-t." })

        const gerarArquivo = await criarArquivoSaftXml(dataInicio, dataFim,farmaciaId)

        res.set({
            "Content-Type": "application/xml",
            "Content-Disposition": `attachment; filename="saft-${dataInicio}-a-${dataFim}.xml"`
        })
        return res.status(200).send(gerarArquivo)

    } catch (error) {
        console.log(error)
        if(error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) return res.status(401).json({message:"Token inválido ou expirado."})
        return res.status(500).json({ error: error.message })
    }
}