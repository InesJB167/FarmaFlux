function PDV() {
  const categorias = [
    { id: 1, nome: "Categoria 1" },
    { id: 2, nome: "Categoria 2" },
    { id: 3, nome: "Categoria 3" },
  ]; // exemplo de categorias, devo substituir pelos dados reais
  const vendaId = "001";
  const medicamentos = [
    {
      id: 1,
      nome: "Paracetamol 1",
      lote: "09j93",
      validade: "BAIXA",
      quantidade: 12,
      preco: 700,
    },
    {
      id: 2,
      nome: "Paracetamol 2",
      lote: "09j93",
      validade: "REGULAR",
      quantidade: 23,
      preco: 700,
    },
    {
      id: 3,
      nome: "Paracetamol 3",
      lote: "09j93",
      validade: "BAIXA",
      quantidade: 3,
      preco: 700,
    },
    {
      id: 4,
      nome: "Paracetamol 4",
      lote: "09j93",
      validade: "NORMAL",
      quantidade: 130,
      preco: 700,
    },
    {
      id: 5,
      nome: "Paracetamol 5",
      lote: "09j93",
      validade: "FALTANDO",
      quantidade: 0,
      preco: 700,
    },
    {
      id: 2,
      nome: "Paracetamol 2",
      lote: "09j93",
      validade: "REGULAR",
      quantidade: 23,
      preco: 700,
    },
    {
      id: 3,
      nome: "Paracetamol 3",
      lote: "09j93",
      validade: "BAIXA",
      quantidade: 3,
      preco: 700,
    },
  ];
  const mensagem = "Venda Livre"; //mensagem de acordo a existencia da receita
  return (
    <div id="pdv" className="flex gap-2 h-full overflow-auto bg-gray-100">
      <div id="parte-esquerda" className="flex flex-col gap-2">
        <div id="pdv-pesquisa" className="p-5 w-3xl border-2 border-slate-200">
          <div id="pesquisa">
            <div id="pesquisa" className="flex gap-2 items-center">
              <input
                type="text"
                name="medicamento"
                id="med"
                className="border-2 border-primary p-2 rounded-sm w-xl"
                placeholder="Pesquisar medicamento por nome ou código de barras..."
              />
              <p className="text-sm">{categorias.length} artigos</p>
            </div>

            <div id="categorias" className="flex flex-wrap gap-2 mt-2">
              {categorias.map((categoria) => (
                <button
                  key={categoria.id}
                  className="border border-slate-300 hover:bg-slate-200 text-muted font-mono p-2 rounded-sm"
                >
                  {categoria.nome}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div id="inventario" className=" w-3xl border-2 border-slate-200 ">
          <h1 className="p-5 font-bold text-sm border-b-2 border-slate-200">
            CATÁLOGO
          </h1>
          <div
            id="header-inventario"
            className="flex justify-between p-2 text-gray-400 font-medium text-xs border-b-2 border-slate-200"
          >
            <p>MEDICAMENTO</p>
            <p>LOTE/VALIDADE</p>
            <p>STOCK</p>
            <p>PREÇOS</p>
            <p>AÇÃO</p>
          </div>
          <div id="medicamento" className="flex flex-col">
            {medicamentos.map((medicamento) => (
              <div className="p-3 h-xs border-b-2 border-slate-200 flex justify-between">
                <p className="font-medium">{medicamento.nome}</p>
                <div id="lote-validade" className="flex flex-col gap-1">
                  <p className="font-thin">{medicamento.lote}</p>
                  <p className="border-2 border-slate-200 text-xs font-bold p-0.5">
                    {medicamento.validade}
                  </p>
                </div>
                <p className="font-thin">{medicamento.quantidade}</p>
                <p className="font-thin">
                  {medicamento.preco.toLocaleString("pt-AO", {
                    style: "currency",
                    currency: "AOA",
                  })}
                </p>
                <button className="border-2 border-slate-200 p-1 h-9 font-thin ">
                  Adicionar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div id="parte-direita" className="grid grid-rows-[0.01fr_0.1fr_0.60fr_0.1fr] min-h-0 border-2 border-gray-200 w-full col-span-3">
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
        <div id="itens-venda"
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
          <div id="iva" className="flex justify-between border-b-2 border-gray-200 pb-1">
            <p>IVA 14%</p>
            <p>0.00 kz</p>
          </div>
          <div id="total-venda" className="flex justify-between p-2">
              <h1 className="font-bold text-xl">Total</h1>
              <p>0.00 kz</p>
          </div>
          <div id="acao-venda" className="flex gap-2">
            <button className="border-2 border-gray-200 p-2 w-50 rounded-smj">PAUSAR</button>
            <button className="border-2 border-gray-200 p-2 w-50 bg-primary text-background  rounded-smj">PAGAMENTO</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PDV;
