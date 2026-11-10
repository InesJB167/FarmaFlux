import { Hospital } from "lucide-react";

function SideBar() {
  return (
    <div className="bg-slate-900 h-screen w-1/6">
      <div
        id="logo"
        className="p-5 h-25 border-b-2 border-slate-800 text-white flex justify-center gap-3 "
      >
        <Hospital size={55} color="white" />
        <div>
          <h1 className=" text-xl font-sans font-medium">FarmaFlux</h1>
          <p className=" text-xs font-mono text-slate-400">v1.2.0-INSTABLE</p>
        </div>
      </div>

      <div
        id="menu"
        className="p-5 flex flex-col gap-5 text-white border-b-2 border-slate-800 h-3/4"
      >
        <p className="text-slate-400 font-thin">Front Office</p>
        <a href="">Dashboard</a>
        <a href="">PDV Terminal</a>

        <p className="text-slate-400 font-thin">Back Office</p>
        <a href="">Inventário & Lotes</a>
        <a href=""> Fornecedores</a>

        <p className="text-slate-400 font-thin">Financeiro</p>
        <a href="">Relatórios</a>

        <p className="text-slate-400 font-thin">Equipa</p>
        <a href="">Utilizadores e Papéis</a>
      </div>
      <div id="user" className="p-5 flex gap-3 text-white">
        <p id="initials" className="bg-slate-700 p-3 rounded-sm text-center text-sm font-bold">
          IJ
        </p>
        <div className="text-sm">
          <p id="nome-user" >Inês Jobino</p>
          <p id="role" className="font-mono text-slate-400">ADMIN</p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
