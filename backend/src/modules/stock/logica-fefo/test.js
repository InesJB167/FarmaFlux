import { prepararMedicamentosParaVenda } from "./preparar-medicamentos-para-venda.js"

export const test = async(req,res)=>{
    try {
        const teste = await prepararMedicamentosParaVenda()
        return res.status(200).json(teste)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error.message)
    }
}