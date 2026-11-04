import { validarId } from "../../../utils/validar-id.js"
import { criarVendaService } from "../service/criar-venda.service.js"
import {buscarDadosFarmacia} from "../../../utils/buscarDadosFarmacia.js"

export const criarVenda = async (req, res) =>
{
    try {
        const farmaciaId = buscarDadosFarmacia(req,res)
        const idUser = req.user.id
        console.log(idUser)

        //a venda iniciada ainda não possui total bruto nem desconto
        let totalBruto = 0.00
        let totalDesconto = 0.00

        const verificarId = validarId(idUser)
        if (!verificarId) return res.status(400).json({ message: "ID user inválido." })

        //?dados do cliente por padrão deve ser o consumidor final
        let dadosCliente

        let iniciandoVenda

        if (req.body.hasOwnProperty('nomeCliente')) {
            const nomeCliente = req.body.nomeCliente?.trim()
            dadosCliente = {
                nome: nomeCliente
            }
        }

        if(req.body.hasOwnProperty('nifCliente')){
            const nifCliente = req.body.nifCliente?.trim()
            dadosCliente.nif = nifCliente
        }

        if(req.body.hasOwnProperty('endereco')){
            const endereco = req.body.endereco?.trim()
            dadosCliente.endereco = endereco
            console.log("3",endereco)
        }

        if(dadosCliente.hasOwnProperty('nome') || dadosCliente.hasOwnProperty('nif')){
            
            if(!dadosCliente.nome || !dadosCliente.nif){
                console.log("Faltam dados do cliente.")
                return res.status(400).json({message: "Termine de inserir os dados do cliente."})
            }
        }

        if(Object.values(dadosCliente).length > 0){
            iniciandoVenda =  await criarVendaService(farmaciaId,idUser, totalBruto, totalDesconto, dadosCliente)
            return res.status(iniciandoVenda.status).json(iniciandoVenda)
        }

        iniciandoVenda = await criarVendaService(farmaciaId,idUser, totalBruto, totalDesconto)
        if (!iniciandoVenda.success) return res.status(iniciandoVenda.status).json(iniciandoVenda)

        return res.status(iniciandoVenda.status).json(iniciandoVenda)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}