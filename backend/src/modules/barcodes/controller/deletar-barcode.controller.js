import { validarId } from "../../../utils/validar-id.js"
import { deletarBarcodeService } from "../service/deletar-barcode.service.js"

export const deletarBarcode = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const verificarId = validarId(id)

        if(!verificarId) return res.status(400).json({message: "ID do codigo de barras inválido"})

        const deletar = await deletarBarcodeService(id)

        if(!deletar.success) return res.status(deletar.status).json(deletar)

        return res.json(deletar)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}