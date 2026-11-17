import CardPadrao from "../components/cards/CardPadrao";
import { CircleUserRound, User, Eye, Check, SquarePen ,Trash} from "lucide-react";

function Usuarios() {
  const numeroContas = 2;
  return (
    <div
      id="page-users"
      className="p-5 flex flex-col gap-5 h-full overflow-auto"
    >
      <div id="headers">
        <h1 className="text-xl font-bold">Gerenciamento de Utilizadores</h1>
        <div className="flex gap-2 items-end">
          <div id="cards" className="flex gap-2 w-2xl h-30">
            <CardPadrao
              tituloCard="Equipa activa"
              numero="3"
              legenda="de 6 contas criadas"
            />
            <CardPadrao
              tituloCard="Papéis definidos"
              numero="3"
              legenda="com matriz de permissões própria"
            />
          </div>

          <div
            id="perfil-user"
            className="border-2 border-slate-200 p-3 w-130 h-40"
          >
            <div className="flex gap-7">
              <div id="img-user">
                <CircleUserRound size={130} color="gray" />
              </div>
              <div id="content-perfil" className="flex flex-col ">
                <h2 className="font-bold uppercase">Perfil em Sessão</h2>
                <h1 className="font-bold text-xl">Inês Jobino</h1>
                <p className="text-sm font-mono font-bold">ADMIN</p>
                <button className="flex gap-2 border-2 border-slate-200 p-3 w-80 rounded-sm justify-center">
                  <User /> Ver Perfil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="users-list" className="border-2 border-slate-200 ">
        <div
          id="header-list"
          className="flex gap-2 items-baseline p-3 border-b-2 border-slate-200"
        >
          <h1 className="font-semibold text-xl">Utilizadores</h1>
          <p className="font-thin text-slate-400 text-sm">
            {numeroContas} contas{" "}
          </p>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Cabeçalho */}
            <thead className="text-gray-400 font-medium text-xs border-b-2 border-slate-200">
              <tr>
                <th className="p-3">MEMBRO</th>
                <th className="p-3">PAPEL / ROLE</th>
                <th className="p-3 ">ÚLTIMO ACESSO</th>
                <th className="p-3">ESTADO</th>
                <th className="p-3 ">AÇÃO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3 font-bold text-slate-800">
                  Admin sério
                </td>
                <td className="px-5 py-3 font-bold text-slate-800">ADMIN</td>
                <td className="px-5 py-3 font-bold text-slate-800">
                  12/09/26 as 3pm
                </td>
                <td className="px-5 py-3 font-bold text-slate-800">ATIVO</td>

                <td className="px-5 py-3 font-bold text-slate-800">
                  <button className="flex gap-2 border-2 border-slate-300 rounded-2xl px-2 py-1">
                    <Eye /> Ver Detalhes
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3 font-bold text-slate-800">
                  Admin sério
                </td>
                <td className="px-5 py-3 font-bold text-slate-800">ADMIN</td>
                <td className="px-5 py-3 font-bold text-slate-800">
                  12/09/26 as 3pm
                </td>
                <td className="px-5 py-3 font-bold text-slate-800">ATIVO</td>

                <td className="px-5 py-3 font-bold text-slate-800">
                  <button className="flex gap-2 border-2 border-slate-300 rounded-2xl px-2 py-1">
                    <Eye /> Ver Detalhes
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="users-list" className="border-2 border-slate-200 ">
        <div
          id="header-list"
          className="flex gap-2 items-baseline p-3 border-b-2 border-slate-200"
        >
          <h1 className="font-semibold text-xl">Matriz de permissões</h1>
          <p className="font-thin text-slate-400 text-sm">
            O que cada papel pode fazer
          </p>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Cabeçalho */}
            <thead className="text-gray-400 font-medium text-xs border-b-2 border-slate-200">
              <tr>
                <th className="p-3">CAPACIDADE</th>
                <th className="p-3">ADMIN</th>
                <th className="p-3 ">GESTOR</th>
                <th className="p-3">OPERADOR</th>
                <th className="p-3">AÇÃO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3 font-bold text-slate-800">
                  Operar PDV jdowndokxw jwepdmm ciew
                </td>
                <td className="px-5 py-3 font-bold text-slate-800">
                  <Check color="green" />
                </td>
                <td className="px-5 py-3 font-bold text-slate-800">
                  <Check color="green" />
                </td>
                <td className="px-5 py-3 font-bold text-slate-800">
                  <Check color="green" />
                </td>
                <td className="px-5 py-3 font-bold  ">
                  <button className="flex gap-2 text-blue-400 ">
                    <SquarePen /> Editar
                  </button>
                </td>
                <td className="px-5 py-3 font-bold  ">
                  <button className="flex gap-2 text-red-400 ">
                    <Trash /> Deletar
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3 font-bold text-slate-800">
                  Consultar inventário
                </td>
                <td className="px-5 py-3 font-bold text-slate-800">
                  <Check color="green" />
                </td>
                <td className="px-5 py-3 font-bold text-slate-800">
                  <Check color="green" />
                </td>
                <td className="px-5 py-3 font-bold text-slate-800">
                  -
                </td>
                <td className="px-5 py-3 font-bold  ">
                  <button className="flex gap-2 text-blue-400 ">
                    <SquarePen /> Editar
                  </button>
                </td>
                <td className="px-5 py-3 font-bold  ">
                  <button className="flex gap-2 text-red-400 ">
                    <Trash /> Deletar
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

export default Usuarios;
