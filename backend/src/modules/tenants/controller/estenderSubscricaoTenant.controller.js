import { estenderSubscricaoService } from "../service/estenderSubscricaoTenant.service.js"

export const estenderSubscricao = async (req, res) =>{
    try {
        /**
         * *o que eu preciso pra estender uma subscriçao??
         * *na verdade penso que estende-se uma subscriçao qudo se paga novamente um plano da licença ...se for o caso os dados necessarios pra se estender seráo apenas o plano escolhido e baseado nisso ,sabe-se o valor e duraçao sabendo isso realiza-se o pagamento logo apos isso estende-se a duraçao de dias se o tenant estiver suspenso volta ativo se nao continua ativo ...
         */

        const idTenant = parseInt(req.params.id)
        const idPlano = parseInt(req.body.idPlano)
        const valorPago = parseFloat(req.body.valorPago)
        const metodosPagamento = ["DINHEIRO","TRANSFERENCIA"]
        const metodoUsado = req.body.metodoUsado?.trim().toUpperCase()
        const referencia = req.body.referencia?.trim()

        if(!idTenant || isNaN(idTenant)) return res.status(400).json({message:"Id tenant inválido."})

        if(!idPlano || isNaN(idPlano)) return res.status(400).json({message:"Plano de licença escolhido inválido."})

        if(!valorPago || isNaN(valorPago) || valorPago <= 0) return res.status(400).json({message:"Valor pago inválido."})

        if(!metodoUsado || !metodosPagamento.includes(metodoUsado)) return res.status(400).json({message:"Método de pagamento inválido."})

        if(!referencia) return res.status(400).json({message:"Referência bancária inválida."})

        const dadosPagamento= {
            idPlano,
            metodoUsado,
            valorPago,
            referencia
        }

        const renovarSubscricao = await estenderSubscricaoService(idTenant, dadosPagamento)
        return res.status(renovarSubscricao.status).json(renovarSubscricao)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:error.message})
    }
}