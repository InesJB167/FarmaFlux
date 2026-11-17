import CardPadrao from "../components/cards/CardPadrao.jsx";
import {
  Calendar1,
  CalendarDays,
  Clock,
  Download,
  Eye,
  File,
  ChartNoAxesCombined,
  FolderClosed
} from "lucide-react";

function Relatorios() {
  return (
    <div className="p-5 flex flex-col gap-10">
      <div id="header-page" className="flex justify-between border-b-2 border-slate-200 py-1 items-baseline-last">
        <div id="titulo-page" className="flex flex-col gap-1">
            <p className="font-thin font-mono text-sm text-slate-400">
          ANÁLISE FINANCEIRA
        </p>
        <h1 className="font-bold text-2xl">Relatórios e indicadores</h1>
        <p className="font-thin font-mono text-sm text-slate-500">
          Resumo operacional da farmácia
        </p>
        </div>
        <div id="botoes" className="flex gap-2">
              <button className="p-2 border-2 border-gray-200 rounded-sm flex gap-2 hover:bg-secondary hover:text-white h-11">
                {" "}
                <Calendar1 /> Hoje
              </button>
              <button className="p-2 border-2 border-gray-200 rounded-sm flex gap-2 hover:bg-secondary hover:text-white h-11">
                <CalendarDays /> Semanal
              </button>
              <button className="p-2 border-2 border-gray-200 rounded-sm flex gap-2 hover:bg-secondary hover:text-white h-11">
                <CalendarDays />
                Mensal
              </button>
            </div>
      </div>
      <div id="content" className=" flex gap-2 ">
        <div id="parte-esquerda" className="flex flex-col gap-3">
          <div id="card-vendas" className=" flex flex-col gap-2">
            
            <div id="cards" className="flex gap-2">
              <CardPadrao
                tituloCard="Vendas de hoje"
                icon={<ChartNoAxesCombined size={17}/>}
                detalhe="kz"
                numero="39.000,00"
                legenda="valores gerados"
              />
              <CardPadrao
                tituloCard="Número de vendas"
                icon={<FolderClosed size={17}/>}
                numero="39"
                legenda="vendas realizadas"
              />
            </div>
          </div>
          <div
            id="relatorios"
            className="flex flex-col border-2 border-gray-200"
          >
            <div
              id="header-ficheiros"
              className="p-3 flex gap-2 items-baseline-last border-b-2 border-gray-200"
            >
              <Clock size={30} />
              <div id="frases-header">
                <h1 className=" w-3xl font-medium text-sm ">
                  Histórico de Relatórios
                </h1>
                <p className=" text-xs">Últimos ficheiros gerados</p>
              </div>
            </div>

            <table className="border-collapse text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                <tr className="border-b-2 border-gray-200">
                  <th className="px-5 py-2 font-semibold">Tipo</th>
                  <th className="px-5 py-2 font-semibold">Período</th>
                  <th className="px-5 py-2 font-semibold">Data de Geração</th>
                  <th className="px-5 py-2 font-semibold ">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-bold text-slate-800">
                    SAF-T(AOA)
                  </td>
                  <td className="px-5 py-3 font-bold text-slate-800">
                    Outubro ,26
                  </td>
                  <td className="px-5 py-3 font-bold text-slate-800">
                    12/09/26 as 3pm
                  </td>
                  <td className="px-5 py-3 font-bold text-slate-800">
                    <button className="flex gap-2 border-2 border-slate-300 rounded-2xl px-2 py-1">
                      {" "}
                      <Download /> Descarregar
                    </button>
                  </td>
                  <td className="px-5 py-3 font-bold text-slate-800">
                    <button className="flex gap-2 border-2 border-slate-300 rounded-2xl px-2 py-1">
                      {" "}
                      <Eye /> Ver Detalhes
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3 font-bold text-slate-800">
                    SAF-T(AOA)
                  </td>
                  <td className="px-5 py-3 font-bold text-slate-800">
                    Outubro ,26
                  </td>
                  <td className="px-5 py-3 font-bold text-slate-800">
                    12/09/26 as 3pm
                  </td>
                  <td className="px-5 py-3 font-bold text-slate-800">
                    <button className="flex gap-2 border-2 border-slate-300 rounded-2xl px-2 py-1">
                      {" "}
                      <Download /> Descarregar
                    </button>
                  </td>
                  <td className="px-5 py-3 font-bold text-slate-800">
                    <button className="flex gap-2 border-2 border-slate-300 rounded-2xl px-2 py-1">
                      {" "}
                      <Eye /> Ver Detalhes
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          id="gerar-saft"
          className="border-2 border-gray-200 rounded-xl h-2/3"
        >
          <div id="header-saft" className="p-2 border-b-2 border-gray-200">
            <h1 className="flex gap-2 font-semibold ">
              <File /> Relatório SAF-T
            </h1>
            <p>Gere o ficheiro SAF-T para o período pretendido.</p>
          </div>

          <div id="datas" className="p-3 flex justify-between">
            <div id="data-inicio">
              <p>Data início: </p>
              <input
                type="date"
                name="data-inicio"
                id="inicio"
                className="w-40 border-2 border-gray-200 p-1"
              />
            </div>
            <div id="data-fim">
              <p>Data Fim: </p>
              <input
                type="date"
                name="data-fim"
                id="fim"
                className="w-40 border-2 border-gray-200 p-1"
              />
            </div>
          </div>
          <div id="botao" className=" w-full px-7 py-3">
            <button className="rounded-xl bg-gray-500 flex gap-2 w-80 p-2  justify-center">
              <Download /> Gerar SAF-T
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Relatorios;
