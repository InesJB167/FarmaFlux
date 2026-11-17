import TalaoDeVenda from "./TalaoDeVenda";

function PDV() {
  const categorias = [
    { id: 1, nome: "Categoria 1" },
    { id: 2, nome: "Categoria 2" },
    { id: 3, nome: "Categoria 3" },
  ]; // exemplo de categorias, devo substituir pelos dados reais
  
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
                className="border-2 border-gray-200 p-2 rounded-sm w-xl"
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

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Cabeçalho */}
              <thead className="text-gray-400 font-medium text-xs border-b-2 border-slate-200">
                <tr>
                  <th className="p-3">MEDICAMENTO</th>
                  <th className="p-3">LOTE / VALIDADE</th>
                  <th className="p-3 text-center">STOCK</th>
                  <th className="p-3">PREÇOS</th>
                  <th className="p-3 text-center">AÇÃO</th>
                </tr>
              </thead>

              {/* Dados dos medicamentos */}
              <tbody className="divide-y divide-slate-200">
                {medicamentos.map((medicamento) => (
                  <tr key={medicamento.id} className="hover:bg-slate-50">
                    <td className="p-3 font-medium">{medicamento.nome}</td>

                    <td className="p-3">
                      <div className="flex flex-col gap-1">
                        <span className="font-thin">{medicamento.lote}</span>
                        <span className="border border-slate-200 text-xs font-bold p-1 w-fit">
                          {medicamento.validade}
                        </span>
                      </div>
                    </td>

                    <td className="p-3 text-center font-thin">
                      {medicamento.quantidade}
                    </td>

                    <td className="p-3 font-thin whitespace-nowrap">
                      {medicamento.preco.toLocaleString("pt-AO", {
                        style: "currency",
                        currency: "AOA",
                      })}
                    </td>

                    <td className="p-3 text-center">
                      <button className="border border-slate-200 rounded-md px-3 py-2 text-sm hover:bg-slate-100">
                        Adicionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <TalaoDeVenda/>
    </div>
  );
}

export default PDV;
