//import { prepararMedicamentosParaVenda } from "./preparar-medicamentos-para-venda.js"

import { efetuarBaixaDeStock } from "./efetuar-baixa-de-stock.js"

export const test = async(req,res)=>{
    try {
        const teste = await efetuarBaixaDeStock()
        return res.status(200).json(teste)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error.message)
    }
}