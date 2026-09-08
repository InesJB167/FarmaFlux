import {efetuarPagamentoService} from "../service/efetuar-pagamento.service.js"
import {validarId} from "../../../utils/validar-id.js"

export const efetuarPagamento = async(req,res)=>{
    try {
        const idVenda = Number(req.params.id)
        if(!idVenda || !validarId(idVenda)) return res.status(400).json({message: "ID venda inválido."})

        const metodosDePagamento = ["DINHEIRO","TPA","TRANSFERENCIA"]
        const metodoPagamento = req.body.metodoPagamento?.trim()
        const valorPago = parseFloat(req.body.valorPago)

        if(!metodoPagamento || !metodosDePagamento.includes(metodoPagamento)){
            return res.status(400).json({message: "Método de pagamento inválido."})
        }

        if(!valorPago || isNaN(valorPago)){
            return res.status(400).json({message: "Valor pago inválido."})
        }

        const dadosPagamento = {
            metodo: metodoPagamento,
            valorPago: valorPago
        }

        if(metodoPagamento !== "DINHEIRO"){
            const referenciaManual = req.body.referenciaManual?.trim()

            if(!referenciaManual) {
                return res.status(400).json({message: "Referência manual não pode ser vazia."})
            }

            dadosPagamento.referenciaManual = referenciaManual
        }

        const pagamento = await efetuarPagamentoService(idVenda, dadosPagamento)

        return res.status(pagamento.status).json(pagamento)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}