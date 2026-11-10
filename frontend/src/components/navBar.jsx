import { CircleSmall } from "lucide-react";

function NavBar() {
  const pageName = "Nome da página";
  const agora = new Date();
  const dia = String(agora.getDate()).padStart(2, "0");
  const mes = agora
    .toLocaleString("pt-PT", {
      month: "short",
    })
    .replace(".", "")
    .toUpperCase();
  const ano = agora.getFullYear();
 const date = `${dia} ${mes} ${ano}`;
 const status = "ATIVO";
 let colorStatus = status === "ATIVO" ? "green" : "red";
  return (
    <div className=" border-b-2 border-slate-200 h-15 w-full flex justify-between p-3 text-base font-mono text-slate-800 ">
      <div className="flex gap-10">
        <p className="font-bold">{pageName}</p>
        <span className="text-slate-500 text-1sm">Sistema Operacional . {date}</span>
      </div>
      <div id="terminal-status" className="flex bg-gray-100 border border-slate-300 p-4 rounded-sm gap-2 items-center">
        <CircleSmall fill={colorStatus} color={colorStatus}/>
        <p id="terminal-status" >
          Terminal_01 <span style={{ color: colorStatus }}>{status}</span>
        </p>
      </div>
    </div>
  );
}

export default NavBar;
