import { validarId } from "../../../utils/validar-id.js"
import { gerarComprovativoVendaService } from "../service/gerar-comprovativo-venda.service.js"
import { gerarPdfComprovativo } from "../service/gerar-comprovativo-pdf.service.js"

export const gerarArquivoPdfVenda = async (req, res) =>
{
    try {
        const idVenda = Number(req.params.id)
        if (!validarId(idVenda)) return res.status(400).json({ message: "ID venda inválido." })

        const dadosDoComprovativo = await gerarComprovativoVendaService(idVenda)
        if (!dadosDoComprovativo.success) return res.status(dadosDoComprovativo.status).json(dadosDoComprovativo)

        const pdfBuffer = await gerarPdfComprovativo(dadosDoComprovativo.data)

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename="comprovativo-${idVenda}.pdf"`
        })
        return res.status(200).send(pdfBuffer)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}