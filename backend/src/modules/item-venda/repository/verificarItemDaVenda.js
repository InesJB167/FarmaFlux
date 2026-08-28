import { buscarItemVendaPorId } from "./buscarItemVendaPorId.js";

export const verificarItemDaVenda = async (idVenda,idItem)=>{
    /**
     * ?esta funçao vai verificar se um determinado item pertence a venda apresentada
     * *como fazer essa verificaçao ??
     * *posso buscar o item e verificar se o venda_id do item é semelhante ao idVenda fornecido
     */
    let itemDaVenda = true
    const encontrarItem = await buscarItemVendaPorId(idItem)

    if(encontrarItem){
        if(encontrarItem.venda_id !== idVenda){
            return itemDaVenda = false
        } else {
            return itemDaVenda 
        }
    }
    
}