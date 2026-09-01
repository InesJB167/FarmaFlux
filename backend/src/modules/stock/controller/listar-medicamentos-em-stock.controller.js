import { listarMedicamentosEmStockservice } from "../service/listar-medicamentos-em-stock.service.js"

export const listarMedicamentosEmStock = async (req, res) => {
    try {
        const listarMedicamentos = await listarMedicamentosEmStockservice()
        return res.status(listarMedicamentos.status).json(listarMedicamentos)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}