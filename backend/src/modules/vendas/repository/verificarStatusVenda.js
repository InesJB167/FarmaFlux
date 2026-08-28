import { buscarVendaPorId } from "./buscarVendaPorId.js";

export const verificarStatusVenda = async (idVenda)=>{
    //?uma funçao que vai checar se esta venda pode ser alterada ou nao ...impossibilitando vendas com o status finalizado e concelado, ou pausada de serem alteradas.
    const vendaEncontrada = await buscarVendaPorId(idVenda)
    let vendaEmAndamento = true

    if(vendaEncontrada){
        const statusVenda = vendaEncontrada.status

        if(statusVenda !== "DRAFT"){
            return vendaEmAndamento = false
        } else {
            return vendaEmAndamento 
        }
    }
    
}