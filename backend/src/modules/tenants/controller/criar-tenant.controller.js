import { criarTenantService } from "../service/criar-tenant.service.js"

export const criarTenant = async (req, res) =>
{
    try {
        const idUser = req.user.id
        const tenantId = req.body.tenantId?.trim()

        //?dados do pagamento
        const idPlano = parseInt(req.body.idPlano)
        const valorPago = parseFloat(req.body.valorPago)
        const metodosPagamento = ["DINHEIRO","TRANSFERENCIA"]
        const metodoUsado = req.body.metodoUsado?.trim().toUpperCase()
        const referencia = req.body.referencia?.trim()

        if (!tenantId) return res.status(400).json({ message: "Tenant Id inválido." })

        const dadosFarmacia = {
            tenant_id: tenantId
        }

        if (req.body.hasOwnProperty("limiteDispositivos")) {
            const limiteDispositivos = parseInt(req.body.limiteDispositivos)

            if (isNaN(limiteDispositivos) || limiteDispositivos <= 0) return res.status(400).json({ message: "Limite de dispositivos fornecido inválido." })

            dadosFarmacia.limite_dispositivos= limiteDispositivos
        }

        if(isNaN(idPlano)) return res.status(400).json({message:"Id Plano de licença inválido."}) 
            
        if(!metodoUsado || !metodosPagamento.includes(metodoUsado)) return res.status(400).json({message:"Metodo pagamento inválido."})

        if(isNaN(valorPago) || valorPago <= 0) return res.status(400).json({message:"Valor pago inválido."})

        if(!referencia) return res.status(400).json({message:"Referência bancária inválida."})

        const dadosPagamento={
            idPlano,
            valorPago,
            metodoUsado,
            referencia
        }

        const novoTenant = await criarTenantService(idUser,dadosFarmacia,dadosPagamento)
        return res.status(novoTenant.status).json(novoTenant)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}