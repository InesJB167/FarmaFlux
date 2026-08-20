import { validarBarcode } from "../repository/validarBarcode.js"
import {encontrarBarcodePeloCodigoService} from "../service/buscar-barcode-peloCodigo.service.js"

export const encontrarBarcodePeloCodigo = async (req,res)=>{
    try {
        const codigo = req.query.codigo?.trim()

        if(!codigo) return res.status(400).json({message:"Codigo de barras obrigatório."})

        if(!/^\d+$/.test(codigo) || codigo.length !== 13) return res.status(400).json({message:"Codigo de barras deve possuir 13 digitos."})

        const validarCodigo = validarBarcode(codigo)
        
        if(!validarCodigo) return res.status(400).json({message:"Codigo de barras inválido."})

        const buscarBarcode= await encontrarBarcodePeloCodigoService(codigo)

        if(!buscarBarcode.success) return res.status(buscarBarcode.status).json(buscarBarcode)

        return res.json(buscarBarcode)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}