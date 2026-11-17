
function TalaoDeVenda (){
    const vendaId = "001";
    const mensagem = "Venda Livre"; //mensagem de acordo a existencia da receita
    return(
          <div
          id="parte-direita"
          className="grid grid-rows-[0.01fr_0.1fr_0.60fr_0.1fr] h-full border-2 border-gray-200 w-full col-span-3 "
        >
            <div id="header-terminal" className="flex justify-between p-3">
              <p className="font-bold ">Talão em curso</p>
              <p className="bg-primary text-background p-1 rounded-xs font-thin text-xs">
                Nº {vendaId}
              </p>
            </div>
            <div id="receitas" className="flex gap-2 pt-2 items-baseline p-3">
              <button className="border-2 border-gray-200 font-medium text-xs text-muted p-1.5 rounded-xs">
                COM RECEITA
              </button>
              <button className="border-2 border-gray-400 font-medium text-xs text-muted p-1.5 rounded-xs">
                SEM RECEITA
              </button>
              <p className="font-thin text-muted text-sm">{mensagem}</p>
            </div>
            <div
              id="itens-venda"
              className="border-t-2 border-b-2 border-gray-200 flex justify-center min-h-0 overflow-auto"
            >
              <p className="font-thin text-muted text-sm">
                Nenhum artigo selecionado
              </p>
            </div>
            <div id="subtotal-iva" className=" flex flex-col p-3 h-px ">
              <div id="sbtotal" className="flex justify-between">
                <p>Subtotal</p>
                <p>0.00 kz</p>
              </div>
              <div
                id="iva"
                className="flex justify-between border-b-2 border-gray-200 pb-1"
              >
                <p>IVA 14%</p>
                <p>0.00 kz</p>
              </div>
              <div id="total-venda" className="flex justify-between p-2">
                <h1 className="font-bold text-xl">Total</h1>
                <p>0.00 kz</p>
              </div>
              <div id="acao-venda" className="flex gap-2">
                <button className="border-2 border-gray-200 p-2 w-50 rounded-smj">
                  PAUSAR
                </button>
                <button className="border-2 border-gray-200 p-2 w-50 bg-primary text-background  rounded-smj">
                  PAGAMENTO
                </button>
              </div>
            </div>
        </div>
    )
}

export default TalaoDeVenda