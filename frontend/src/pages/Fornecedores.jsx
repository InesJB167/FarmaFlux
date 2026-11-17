
function Fornecedores() {
  return (
    <div className="flex flex-col gap-2 p-5">
      <div className="w-full overflow-x-auto  border border-slate-200 bg-white">
          <div id="head-fornecedores" className="flex items-baseline gap-2 p-5 border-b border-slate-200">
          <p className=" font-medium text-sm">QUADRO DE FORNECEDORES</p>
          <p className="text-muted text-xs ">
            Atualizado em ...
          </p>
        </div>
          <table className="w-full border-collapse text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
              <tr className="border-b-2 border-gray-200">
                <th className="px-5 py-4 font-semibold ">Fornecedor</th>
                <th className="px-5 py-4 font-semibold ">Nif</th>
                <th className="px-5 py-4 font-semibold ">Endereço</th>
                <th className="px-5 py-4 font-semibold  ">Contacto</th>
                <th className="px-5 py-4 font-semibold ">Estado</th>
                <th className="px-5 py-4 font-semibold  text-center">Ação</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4 font-bold text-slate-800">
                  Fornecedor 1
                </td>
                <td className="px-5 py-4 text-slate-500">92479439483</td>
                <td className="px-5 py-4 text-slate-500">ensifn sjjff</td>
                <td className="px-5 py-4 font-medium">+244 923 876 287</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Disponivel
                  </span>
                </td>
                <td className="px-5 py-4 text-center">
                  <button className="rounded-lg p-2 text-slate-800 font-bold text-sm hover:underline">
                    Notificar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  );
}
export default Fornecedores;