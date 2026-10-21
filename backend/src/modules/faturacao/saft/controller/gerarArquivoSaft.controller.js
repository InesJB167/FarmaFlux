import { validarId } from "../../../../utils/validar-id.js"
import { criarArquivoSaftXml } from "../service/criarArquivoSaftXml.service.js"

export const gerarArquivoSaft = async (req, res) =>
{
    try {
        const dataInicio = new Date(req.body.dataInicio)
        const dataFim = new Date(req.body.dataFim)
        console.log("datainicio ", dataInicio, "data fim ", dataFim)
            /**
         * !É IMPORTANTE QUE AO GERAR  SAF-T SE SAIBA QUAL É OO ID DA FARMÁCIA EM QUESTÃO POR AGORA VAMOS BUSCAR A FARMACIA POR ID MAS COM O TEMPO VEREMOS COMO SABER AUTOMATICAMENTE O ID DA FARMACIA 
         */
        const farmaciaId = parseInt(req.params.farmaciaId)

        if(!farmaciaId || !validarId()) return res.status(400).json({ message: "Id farmácia faltando." })

        if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) return res.status(400).json({ message: "Informe o perírodo para gerar o saf-t." })

        const gerarArquivo = await criarArquivoSaftXml(dataInicio, dataFim)

        res.set({
            "Content-Type": "application/xml",
            "Content-Disposition": `attachment; filename="saft-${dataInicio}-a-${dataFim}.xml"`
        })
        return res.status(200).send(gerarArquivo)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}