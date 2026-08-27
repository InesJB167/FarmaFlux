
export const finalizarVendaService = async ()=>{
    /**
         * Verificar se possui itens
         * Encaminhar para validação dos itens/estoque
         * Encaminhar para pagamento
         * Aplicar FEFO
         * Baixar estoque
         * Alterar status para FINALIZADA
         * Gerar comprovativo
         */
        return {
            success: true,
            status: 200,
            message: "aqui é pra finalizar venda"
        }
}