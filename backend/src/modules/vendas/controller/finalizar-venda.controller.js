import { validarId } from "../../../utils/validar-id.js";
import { finalizarVendaService } from "../service/finalizar-venda.service.js";

export const finalizarVenda = async(req,res)=>{
    try {
        const idVenda = Number(req.params.id)
        if(!validarId(idVenda)) return res.status(400).json({message:"ID inválido."})

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

        const finalizando = await finalizarVendaService(idVenda, dadosPagamento)

        return res.status(finalizando.status).json(finalizando)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}