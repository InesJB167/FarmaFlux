import { listarLotesComClassificacaoValidade } from "../../lote/repository/listarLotesComClassificacaoValidade.js"

export const listarMedicamentosEmStockservice = async () => {
    const encontrarLotes = await listarLotesComClassificacaoValidade()

    if (encontrarLotes.length <= 0) return {
        success: true,
        status: 200,
        message: "O stock esta sem medicamentos."
    }

    /**
     * ?essa função vai listar os medicamentos com lotes disponiveis a venda no stock.
     * ?deve-se listar os lotes com as suas classificaçoes ...
     * ?depois filtrar os que não estão vencidos
     * ?depois retirar os nomes dos medicamentos com lotes ainda validos.
     */

    const medicamentosDisponiveis = []

    for (let novoLote of encontrarLotes) {
        let loteNoStock = {}
        if (novoLote.classificacao !== "VENCIDO" && novoLote.lote.qtd_atual > 0) {
            /**
             * *Um medicamento com 3 lotes válidos (não vencidos) — o que acontece no teu array final?
             * *quando um medicamento tem mais de um lote deve-se apenas incrementar a quantidade total do mesmo na prop do objecto dentro do array
             * *pra isso penso em uma verificaçao: se aquele medicamento existe no array
             */

            const medicamentoExistente = medicamentosDisponiveis.find(elemento=>
                novoLote.lote.medicamento.nome === elemento.nomeMedicamento)
                console.log(medicamentoExistente)

            if(medicamentoExistente){
                medicamentoExistente.quantidade += novoLote.lote.qtd_atual
            } else {

                loteNoStock.idMedicamento = novoLote.lote.medicamento.id
                loteNoStock.nomeMedicamento = novoLote.lote.medicamento.nome
                loteNoStock.quantidade = novoLote.lote.qtd_atual

                medicamentosDisponiveis.push(loteNoStock)
            }

        }
    }

    return {
        success: true,
        status: 200,
        message: "Medicamentos disponíveis no stock.",
        data: medicamentosDisponiveis
    }
}