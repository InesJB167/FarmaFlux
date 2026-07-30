import { buscarMedicamentoPorNomeService } from "../service/buscar-medicamento-porNome.service.js"

export const buscarMedicamentoPorNome = async (req, res) =>{
    try {
        const nome = req.query.nome?.trim()

        if(!nome) return res.status(400).json({message: "Informe o nome do medicamento."})

        const buscarMedicamento = await buscarMedicamentoPorNomeService(nome)

        if(!buscarMedicamento.success) return res.status(buscarMedicamento.status).json(buscarMedicamento)

        return res.json(buscarMedicamento)

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}