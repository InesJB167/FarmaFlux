import { buscarDadosDaFarmacia } from "../../../farmacia/repository/buscarDadoFarmacia.js"
import { listarMedicamentoVendidosEmUmPeriodo } from "../../../medicamento/repository/listarMedicamentosVendidosEmUmPeriodo.js"
import { listarVendasPorPeriodo } from "../../../vendas/repository/listarVendasPorPeriodo.js"

/**
 * ?INFORMAÇÕES ESSENCIAL SOBRE O SAF-T
 * ? O **SAF-T** é um arquivo que reúne as informações fiscais e financeiras de uma empresa referentes a um dado perído de tempo(mensal,trimestral, anual).
  *? Ele serve para mostrar às autoridades fiscais o que aconteceu nas operações da empresa.
  *? Deve conter informações sobre a empresa, clientes, produtos, vendas e pagamentos.
  *? Também apresenta valores, impostos, descontos e outros dados das operações.
  *? Em resumo, é como um **registro organizado das atividades fiscais da empresa**.
 */
export const gerarArquivoSaftService = async (dataInicio, dataFim) =>
{
    let dadosSaft = {}
    //?dados para o cabeçalho do ficheiro
    const farmacia = await buscarDadosDaFarmacia()
    if (!farmacia) {
        throw new Error("Dados da farmácia não encontrados.")
    }

    //?dados para as tabelas mestre - aqui vai incluir dados de cliente ,produto e taxas

    const vendas = await listarVendasPorPeriodo(dataInicio, dataFim)

    const clientes = []
    for (let venda of vendas) {
        const cliente = clientes.some((client) => venda.cliente_id === client.id)
        if (cliente) {
            continue
        }
        clientes.push(venda.cliente)
    }

    const medicamentos = await listarMedicamentoVendidosEmUmPeriodo(dataInicio, dataFim)

    let taxasIva = []

    for (let medicamento of medicamentos) {
        const taxaIva = medicamento.taxas_ivas
        const taxaExistente = taxasIva.some((taxa) => taxa.id === taxaIva.id)
        if (taxaExistente) {
            continue
        }
        taxasIva.push(taxaIva)
    }

    //?dados para os documentos comerciais
    let dadosComerciais = []
    let notasCredito = []
    let faturas = []
    for (let venda of vendas) {
        let dadoVendaComercial = {}
        //?dados do cabeçalho da venda

        const dadosVenda = {}
        dadosVenda.id = venda.fatura.id
        dadosVenda.codigo = venda.fatura.codigo_fatura
        dadosVenda.dataEmissao = venda.fatura.created_at,
            dadosVenda.hash = venda.fatura.hash_assinatura,
            dadosVenda.cliente = venda.cliente.nome,
            dadosVenda.totalVenda = venda.total_bruto

        //?dados do corpo da venda
        const itensDaVenda = venda.itens_venda.map((item) => ({
            medicamento: item.medicamento.nome,
            quantidade: item.quantidade,
            precoUnitario: item.preco_unitario,
            imposto: 0 //apenas para medicamentos por enquanto.
        }))

        const notasCreditoDaVenda = venda.notas_credito.map((nota) => ({
            numero: nota.numero_sequencial,
            facturaOriginal: venda.fatura.codigo_fatura,  // a que está a anular
            valorAnulado: nota.valor_anulado,
            motivo: nota.motivo,
            data: nota.data_emissao
        }))

        //!falta inserir os pagamentos do periodo
        const pagamentos = venda.pagamentos.map((pagamento) => ({
            id: pagamento.id,
            metodo: pagamento.metodo,
            valorPago: pagamento.valor_pago,
            dataPagamento: pagamento.created_at
        }))

        dadoVendaComercial = {
            dadosVenda: dadosVenda,
            itensVenda: itensDaVenda,
            notaCredito: notasCreditoDaVenda,
            pagamento: pagamentos
        }

        dadosComerciais.push(dadoVendaComercial)
    }

    dadosSaft = {
        farmacia,
        clientes,
        medicamentos,
        taxasIva,
        dadosComerciais
    }

    return dadosSaft
}
