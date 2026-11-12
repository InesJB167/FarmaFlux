import VendasHojeCard from "../components/cards/VendasHoje.jsx";
import StockCard from "../components/cards/Stock.jsx";
import ExpiracoesCard from "../components/cards/Expiracoes.jsx";
import FluxoVendas from "../components/graficos/FluxoVendas.jsx";
import MetodoPagamentoGrafico from "../components/graficos/MetodoPagamentoGrafico.jsx";

function Dashboard() { 
    return (
        <div className="w-full h-full p-5">
            <div id="cards" className="flex gap-4">
                <VendasHojeCard />
                <StockCard />
                <ExpiracoesCard />
            </div>
            <div id="graficos" className="flex gap-4">
                <FluxoVendas/>
                <MetodoPagamentoGrafico/>
            </div>
        </div>
    );
}

export default Dashboard;