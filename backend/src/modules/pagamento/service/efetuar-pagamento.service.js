
export const efetuarPagamentoService = async ()=>{
    /**
     * ?essa funçao será responsavel por realizar o pagamento, ela vai receber os dados para tal de modo a garantir que o mesmo seja feito.
     * ?os dados para a realizaçao do pagamento : idvenda ,metodo,valor pago,troco(se houver),referencia manual(se o metodo for por tranferencia ou tpa.
     * ?de lembrar que o pagamento será unico para uma unica venda, por isso será feito um calculo  do  valor total da venda para ser pago de uma so vez.
     * *
     * *por isso primeiro verifico se a venda existe,
     * *depois calculo o valor a se pagar
     * *vejo o metodo de pagamento, se for por dinheiro calculo o troco
     * *se for por transferencia ou tpa registro a referencia manual,
     * *apos ter a todos os dados ponho eles em uma variavel e mando pra funççao que vai registrar o pagamento na bd
     */

    
}