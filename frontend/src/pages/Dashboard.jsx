import VendasHojeCard from "../components/cards/VendasHoje.jsx";
import StockCard from "../components/cards/Stock.jsx";
import ExpiracoesCard from "../components/cards/Expiracoes.jsx";
import FluxoVendas from "../components/graficos/FluxoVendas.jsx";
import MetodoPagamentoGrafico from "../components/graficos/MetodoPagamentoGrafico.jsx";
import TalaoDeVenda from "./TalaoDeVenda.jsx";
import {Link} from "react-router-dom"

function Dashboard() { 
    return (
        <div className="w-full h-full p-5 flex gap-2">
            <div id="parte-esquerda">
                <div id="cards" className="flex gap-4 w-3xl">
                <VendasHojeCard />
                <StockCard />
                <ExpiracoesCard />
                </div>
                <div id="graficos" className="flex gap-4">
                    <FluxoVendas/>
                    <MetodoPagamentoGrafico/>
                </div>
            </div>
            <div id="parte-direita" className="flex flex-col  h-full">
                <div id="header" className="flex justify-between border-2 border-slate-200 p-3 ">
                <h1>Ponto de Venda(PDV)</h1>
                <Link to="/pdv-terminal">Abrir Terminal</Link>
                </div>
                <TalaoDeVenda/>
            </div>
            
        </div>
    );
}

export default Dashboard;