import { Check, Cross, User, LockKeyhole,ArrowRight } from "lucide-react";
import { useState } from "react";

function Login() {
  const [modo, setModo] = useState("registro");
  const icone = <User/>
  return (
    <div id="login-cadastro" className="flex ">
      <div
        id="parte-esquerda"
        className="bg-primary overflow-hidden h-screen w-2xl p-10 text-white flex flex-col relative gap-45"
      >
        <div id="logo" className=" flex gap-2 items-baseline-last">
          <Cross size={35} className="bg-slate-800 p-2 " />
          <div id="nomes" className="flex flex-col ">
            <h1 className="font-bold">FARMAFLUX</h1>
            <p className="font-mono font-thin text-xs text-muted">
              GESTÃO DE FARMÁCIAS
            </p>
          </div>
        </div>
        <div id="content" className="flex flex-col gap-3 w-lg ">
          <p className="font-mono font-thin text-xs text-muted">
            A FARMÁCIA, NUM SÓ LUGAR
          </p>
          <h1 className="font-semibold text-5xl">
            Mais clareza em cada turno.
          </h1>
          <p className="font-mono font-thin text-sm text-muted">
            Organize vendas, inventário e equipa com uma visão simples da
            operação.
          </p>
          <div id="frases" className="flex flex-col gap-2">
            <p className="text-gray-300 flex gap-5">
              <p className="border-2 border-slate-800 h-5 ">
                <Check size={15} />
              </p>{" "}
              Dispensa e vendas num só terminal
            </p>
            <p className="text-gray-300 flex gap-5">
              <p className="border-2 border-slate-800 h-5 ">
                <Check size={15} />
              </p>{" "}
              Lotes e validades sob controlo
            </p>
            <p className="text-gray-300 flex gap-5">
              <p className="border-2 border-slate-800 h-5 ">
                <Check size={15} />
              </p>{" "}
              Relatórios para acompanhar a operação
            </p>
          </div>
        </div>
        <div
          id="decoracao"
          className="border-t border-l border-slate-800 h-45 w-68 pt-10 pl-10 absolute bottom-0 left-95 pointer-events-none"
        >
          <div className="border-t border-l border-slate-800 h-full w-full"></div>
        </div>

        <div
          id="rodape"
          className="font-mono font-thin text-xs uppercase text-muted w-xl py-3 border-t border-slate-800 flex justify-between absolute bottom-0"
        >
          <p>FarmaFlux . Angola </p>
          <p>Acesso seguro</p>
        </div>
      </div>
      <div id="parte-direita" className="w-4xl flex justify-center items-center h-screen">
        <div id="content" className="w-1/2">
          <div id="header" className="">
            <p className="font-mono font-thin text-sm uppercase text-muted">
              Área de Acesso
            </p>
            {modo === "registro" ? (
              <div className="w-full ">
                <div className="flex flex-col gap-2">
                    <h1 className="font-medium text-2xl">Crie a sua Conta</h1>
                <p className="text-slate-500 font-medium text-sm ">Registe se para melhor organização da farmácia.</p>
                </div>
                
                <div id="seccoes" className="py-5 w-full flex justify-center">
                    <span className="border-b-2 border-slate-300 pb-3 w-60 text-center text-muted">Entrar</span>
                    <span className="border-b-2 border-slate-900 pb-3 w-60 text-center font-medium">Criar Conta</span>
                </div>
                <div id="form" className="flex flex-col gap-5">
                    <form action="" className="flex flex-col gap-2">
                        <div className="flex flex-col">
                            <label htmlFor="">Nome:</label>
                        <input type="text" placeholder="insira o nome completo..."  className="border-2 border-slate-300 p-2"/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="">Username:</label>
                        <input type="text" name="" id="" placeholder="ex: sunshine" className="border-2 border-slate-300 p-2"/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="">Palavra-Passe:</label>
                        <input type="password" name="" id="" placeholder="*******" className="border-2 border-slate-300 p-2"/>
                        </div>
                    </form>
                    <div className="flex flex-col gap-2 ">
                        <button className="flex gap-3 text-white bg-slate-900 p-2 w-full justify-center">Criar Conta <ArrowRight/> </button>
                        <p className="text-muted text-sm flex justify-center">Ja tem uma conta?    <button className="hover:border-b-2 hover:border-slate-900  text-slate-900" onClick={()=> setModo("login")}> Entrar</button> </p>

                    </div>

                </div>
              </div>
            ) : (
              <div className="w-full ">
                <div className="flex flex-col gap-2">
                    <h1 className="font-medium text-2xl">Bem-Vindo(a) de volta</h1>
                <p className="text-slate-500 font-medium text-sm ">Entre com os dados da sua conta FarmaFlux.</p>
                </div>
                
                <div id="seccoes" className="py-5 w-full flex justify-center">
                    <span className="border-b-2 border-slate-900 pb-3 w-60 text-center font-medium">Entrar</span>
                    <span className="border-b-2 border-slate-300 pb-3 w-60 text-center text-muted">Criar Conta</span>
                </div>
                <div id="form" className="flex flex-col gap-5">
                    <form action="" className="flex flex-col gap-2">
                        <div className="flex flex-col">
                            <label htmlFor="">Username:</label>
                        <input type="text" name="" id="" placeholder="ex: sunshine" className="border-2 border-slate-300 p-2"/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="">Palavra-Passe:</label>
                        <input type="password" name="" id="" placeholder="*******" className="border-2 border-slate-300 p-2"/>
                        </div>
                    </form>
                    <div className="flex flex-col gap-2 ">
                        <button className="flex gap-3 text-white bg-slate-900 p-2 w-full justify-center">Entrar <ArrowRight/> </button>
                        <p className="text-muted text-sm flex justify-center">Ainda não tem uma conta?    <button className="hover:border-b-2 hover:border-slate-900  text-slate-900" onClick={()=> setModo("registro")}> Criar conta</button> </p>
                    </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
