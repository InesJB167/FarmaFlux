import { buscarFarmaciaPorId } from "../../farmacia/repository/buscarFarmacia.js"
import { listarItensVenda } from "../../item-venda/repository/listarItensVenda.js"
import { buscarVendaPorId } from "../repository/buscarVendaPorId.js"

export const gerarComprovativoVendaService = async(idVenda, idFarmacia = 1)=>{
    const venda = await buscarVendaPorId(idVenda)

    if(!venda) return{
        success: false,
        status: 404,
        message: "Venda não encontrada."
    }

    if(venda.status !== "COMPLETED") return{
        success: false,
        status: 409,
        message: "Esta venda ainda não foi finalizada."
    }

    const itens = await listarItensVenda(idVenda)
    if(itens.length <= 0) return{
        success: false,
        status: 404,
        message: "Não foram encontrados itens relacionados a esta venda."
    }

    let itensVenda = []
    for(let item of itens){
        let novoItem = {
            nomeMedicamento: item.medicamento.nome,
            quantidade: Number(item.quantidade),
            precoUnitario: parseFloat(item.preco_unitario, 2),
            subtotal: parseFloat(item.subtotal , 2)
        }

        itensVenda.push(novoItem)
    }

    const data = venda.data_hora
    const dataVenda = new Date(data).toLocaleDateString('pt-AO')
    
    const farmacia = await buscarFarmaciaPorId(idFarmacia)
    if(!farmacia) return {
        success: false,
        status: 404,
        message: "Dados da farmácia não encontrados."
    }

    const nomeFarmacia = farmacia.nome_comercial
    const numeroCertificadoSoftware = farmacia.numero_certificado_software
    const valorTotalVenda = venda.total_bruto

    const pagamento = venda.pagamentos
    if(!pagamento || pagamento.length <= 0) return{
        success: false,
        status: 409,
        message: "Esta venda não possui um registro de pagamento."
    }

    const metodoPagamento = pagamento[0].metodo
    const valorRecebido = parseFloat(pagamento[0].valor_pago ,2)
    const troco = parseFloat(pagamento[0].troco, 2)

    const hashAssinatura = venda.fatura.hash_assinatura
    const ultimos4digitos = hashAssinatura.slice(-4)

    const cliente = venda.cliente

    const comprovativo = {
        idVenda,
        nomeFarmacia,
        numeroCertificadoSoftware,
        ultimos4digitos,
        cliente,
        dataVenda,
        itensVenda,
        valorTotalVenda,
        metodoPagamento,
        valorRecebido,
        troco
    }

    return{
        success: true,
        status: 201,
        message: "COMPROVATIVO DA VENDA.",
        data: comprovativo
    }
}