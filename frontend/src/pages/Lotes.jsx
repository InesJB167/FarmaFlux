function Lotes() {
  const numeroLotes = 12;

  return (
    <div className="flex flex-col gap-5 p-5">
      <div
        id="lotes-pesquisa"
        className="p-5 border-2 border-slate-200 flex gap-2 items-center w-full"
      >
        <input
          type="text"
          name="medicamento"
          id="med"
          className="border-2 border-gray-200 p-2 rounded-sm w-xl"
          placeholder="Pesquisar medicamento, lote ou código de barras..."
        />
        <button className="border border-slate-300 hover:bg-slate-200 text-muted font-mono p-2 rounded-sm">
          Todos
        </button>
        <button className="border border-slate-300 hover:bg-slate-200 text-muted font-mono p-2 rounded-sm">
          Vencidos
        </button>
        <button className="border border-slate-300 hover:bg-slate-200 text-muted font-mono p-2 rounded-sm">
          {"<"} 90 Dias
        </button>
        <button className="border border-slate-300 hover:bg-slate-200 text-muted font-mono p-2 rounded-sm">
          Stock Baixo
        </button>
      </div>
      <div
        id="inventarios-medicamentos"
        className="border-2 border-gray-200  "
      >
        <div id="head-inventario" className="flex items-baseline gap-2 p-5">
          <p className=" font-medium text-sm">INVENTÁRIO POR LOTES</p>
          <p className="text-muted text-xs ">
            {numeroLotes} lotes em lista FEFO
          </p>
        </div>

        <div className="w-full overflow-x-auto  border border-slate-200 bg-white">
          <table className="w-full border-collapse text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
              <tr className="border-b-2 border-gray-200">
                <th className="px-5 py-4 font-semibold ">Medicamento</th>
                <th className="px-5 py-4 font-semibold ">Lote</th>
                <th className="px-5 py-4 font-semibold ">Local</th>
                <th className="px-5 py-4 font-semibold  text-center">Qtd</th>
                <th className="px-5 py-4 font-semibold ">Validade</th>
                <th className="px-5 py-4 font-semibold ">Estado</th>
                <th className="px-5 py-4 font-semibold  text-center">Ação</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4 font-bold text-slate-800">
                  Paracetamol 500mg
                </td>
                <td className="px-5 py-4 text-slate-500">LOT-001</td>
                <td className="px-5 py-4 text-slate-500">A1 - 02</td>
                <td className="px-5 py-4 text-center font-medium">120</td>
                <td className="px-5 py-4 text-slate-600">12/2027</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Normal
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <button className="rounded-lg p-2 text-slate-800 font-bold text-sm hover:underline">
                    Repor
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Lotes;
