import { validarId } from "../../../utils/validar-id.js"
import { registrarBarcodeService } from "../service/registrar-barcode.service.js"
import { validarBarcode } from "../repository/validarBarcode.js"

export const registrarBarcode = async (req, res) => {
    try {
        const codigo = req.body.codigo?.trim()
        const medicamento_id = Number(req.body.medicamento_id)
        const verificarId = validarId(medicamento_id)

        if (!codigo && !medicamento_id) return res.status(400).json({ message: "Informe os dados para o registro do barcode." })

        if (!verificarId) return res.status(400).json({ message: "ID inválido." })

        if (!codigo) return res.status(400).json({ message: "Campo obrigatório." })

        /**
         * (/^\d+$/.test()) expressao que verifica se a string contem apenas digitos de 0 a 9
         * /^ : indica o começo da string
         * \d : indica um numero de 0 a 9
         * + : indica um ou mais numeros
         * $/ : indica o fim da string
         */

        if (!/^\d+$/.test(codigo)) return res.status(400).json({ message: "O código de barras deve conter apenas números." })

        if (codigo.length !== 13) {
            return res.status(400).json({
                message: "O código de barras deve possuir exatamente 13 dígitos."
            })
        }

       const verificarCodigo = validarBarcode(codigo)

       if(verificarCodigo){
        console.log("EAN-13 válido")
       } else if(!verificarCodigo){
            return res.status(400).json({message:"EAN-13 inválido"})        
       }

        const registrarBarcode = await registrarBarcodeService(codigo, medicamento_id)

        if (!registrarBarcode.success) return res.status(registrarBarcode.status).json(registrarBarcode)

        return res.json(registrarBarcode)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}