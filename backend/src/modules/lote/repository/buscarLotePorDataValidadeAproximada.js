import prisma from "../../../../prisma/prisma.js";

export const buscarLotesPertoDoVencimento = async ()=>{
    //?essa funçao fará a busca de lotes que estao proximos da data de validade, ou seja ,um mês proximo da data de validade.
    /**
     * *como ver se a data atual esta um mes aproximada da data de vencimento??
     * *ex: 26/08/10 para 26/09/23
     * ?posso pegar o mes da data presente incrementar mais 1  e atribuir esse mes a data atual pra ver se esta perto do vencimento ou nao ...
     * ?ex:26/08/10 agosto é 7 + 1 = 8 ...8 é setembro que é 9 logo pra data la acima vai ficar 26/09/10 > 26/09/23 false
     * ?ex:26/09/23 setembro é 8 + 1 = 9 ...9 é outubro que é 10 logo a data(27/03/12) vai ficar 27/10/12 > 26/09/23 true 
     * *MAS isso nao garante que vai estar um mes perto ,bem se nao estiver ignora ...se estiver aparece.
     * ?Logo esta funçao vai apresentar as datas apos uma verificaçao de quais datas estao um mes perto do vencimento.
     */ 

    const dataAtual = new Date()
    console.log("data atual ",dataAtual)

    const dataUmMesAdiante = new Date(dataAtual)
    dataUmMesAdiante.setMonth(dataAtual.getMonth() + 1)
    console.log("data atual daqui a um mes ", dataUmMesAdiante)

    return await prisma.lotes.findMany({
        where:{
            data_validade: {
                gte:dataAtual,
                lt: dataUmMesAdiante
            },
            deleted_at: null
        },
        select:{
            id: true,
            numero_lote: true,
            medicamento:{
                select:{
                    id:true,
                    nome: true
                }
            },
            fornecedor: {
                select:{
                    id: true,
                    nome_empresa: true,
                    nif: true
                }
            },
            qtd_inicial: true,
            qtd_atual: true,
            preco_custo: true,
            data_entrada: true,
            data_validade: true
        },
        orderBy:{
            data_validade: "asc"
        }
    })
}