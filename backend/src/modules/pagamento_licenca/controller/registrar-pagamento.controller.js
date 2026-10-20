import { registrarPagamentoService } from "../service/registrar-pagamento.service.js"

export const registrarPagamento = async(req,res)=>{
    try {
        const idTenant = parseInt(req.params.id)
        const idPlano = parseInt(req.body.idPlano)
        const valorPago = parseFloat(req.body.valorPago)
        const metodosPagamento = ["DINHEIRO","TRANSFERENCIA"]
        const metodoUsado = req.body.metodoUsado?.trim().toUpperCase()
        const referencia = req.body.referencia?.trim()

        if(isNaN(idTenant)) return res.status(400).json({message:"Id tenant inválido."})

        if(isNaN(idPlano)) return res.status(400).json({message:"Id Plano de licença inválido."}) 
            
        if(!metodoUsado || !metodosPagamento.includes(metodoUsado)) return res.status(400).json({message:"Metodo pagamento inválido."})

        if(isNaN(valorPago) || valorPago <= 0) return res.status(400).json({message:"Valor pago inválido."})

        if(!referencia) return res.status(400).json({message:"Referência bancária inválida."})

        const dadosPagamento={
            idTenant,
            idPlano,
            valorPago,
            metodoUsado,
            referencia
        }

        const registrar = await registrarPagamentoService(idTenant,dadosPagamento)
        return res.status(registrar.status).json(registrar)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}