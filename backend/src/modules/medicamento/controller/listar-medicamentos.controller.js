import { buscarDadosFarmacia } from "../../../utils/buscarDadosFarmacia.js"
import { listarMedicamentosService } from "../service/listar-medicamentos.service.js"

export const listarMedicamentos = async (req, res) => {
    try {
        const farmaciaId = buscarDadosFarmacia(req,res)
        const medicamentosRegistrados = await listarMedicamentosService(farmaciaId)
        if (!medicamentosRegistrados.success) return res.status(medicamentosRegistrados.status).json(medicamentosRegistrados)

        return res.json(medicamentosRegistrados)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}