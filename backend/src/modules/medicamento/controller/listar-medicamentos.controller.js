import { listarMedicamentosService } from "../service/listar-medicamentos.service.js"

export const listarMedicamentos = async (req, res) => {
    try {
        const medicamentosRegistrados = await listarMedicamentosService()
        if (!medicamentosRegistrados.success) return res.status(medicamentosRegistrados.status).json(medicamentosRegistrados)

        return res.json(medicamentosRegistrados)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}