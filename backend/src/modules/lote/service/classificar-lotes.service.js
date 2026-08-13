import { listarTodosLotes } from "../repository/listarTodosLotes.js";

export const classificarLotesPelaDataValidade = async () => {
    const listarLotes = await listarTodosLotes()

    if (listarLotes.length === 0) return {
        success: true,
        status: 200,
        message: "Nenhum item foi encontrado."
    }

    /**
     * ?a ideia é criar uma funçao que classifica cada lote de acordo com a sua data de validade, ou seja ,os lotes devem ser agrupados em 4 categorias : 
     * ?1- lotes que estao a 2 meses do vencimento NORMAL
     * ?2- Lotes que estao a 1 mes do vencimento ATENÇAO
     * ?lotes que estao a 1 semana do vencimento URGENTE 
     * ?lotes que ja venceram VENCIDO  
     * ?os status_validade deve ser atribuido a cada lote apos ser avaliado nessas 4 opçoes.
     * *como avaliar cada lote ?? imagine se forem mil lotes um so arquivo pode dar conta ??
     * *penso em criar um loop pra poder pegar cada lote e pra avaliar posso usar o switch-case, isto depois de ja ter definido a data-atual, data-daqui-a-dois-meses,data-daqui-a-um-mes, e a data-daqui-a-sete-dias, essas 5 datas vao servir como base pra calcular e tbm um array pra guardar o status-avaliacao ou classificaçao
     */

    const dataAtual = new Date()
    console.log("data atual ", dataAtual)

    const dataUmaSemanaAdiante = new Date(dataAtual)
    dataUmaSemanaAdiante.setDate(dataAtual.getDate() + 7)
    console.log("uma semana depois ", dataUmaSemanaAdiante)

    const dataUmMesAdiante = new Date(dataAtual)
    dataUmMesAdiante.setMonth(dataAtual.getMonth() + 1)
    console.log("um mes depois ", dataUmMesAdiante)

    let listaDeLotes = []

    for (let lote of listarLotes) {
        const dataValidade = lote.data_validade
        console.log(" lote ",lote)

        let classificacao

        if (dataValidade <= dataAtual) {
            classificacao = "VENCIDO"
        } else if ( dataValidade <= dataUmaSemanaAdiante) {
            classificacao = "URGENTE"
        } else if ( dataValidade <= dataUmMesAdiante) {
            classificacao = "ATENÇÃO"
        } else {
            classificacao = "NORMAL"
        }

        const loteClassificado = {
            lote: lote,
            classificacao: classificacao
        }

        listaDeLotes.push(loteClassificado)
    }

    return {
        success: true,
        status: 200,
        message: "Lotes classificados.",
        data: listaDeLotes
    }
}
