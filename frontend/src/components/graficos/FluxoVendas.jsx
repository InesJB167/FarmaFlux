import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function FluxoVendas() {
  const dados = [
    { dia: "Seg", vendas: 15000 },
    { dia: "Ter", vendas: 22000 },
    { dia: "Qua", vendas: 18000 },
    { dia: "Qui", vendas: 30000 },
    { dia: "Sex", vendas: 25000 },
    { dia: "Sáb", vendas: 40000 },
    { dia: "Dom", vendas: 35000 },
  ]; //dados de exemplo para o gráfico ,aqui vão as vendas da semana
  return (
    <div className="w-xl border-2 border-gray-200 rounded-2  mt-4" >
      <h1 className="border-b-2 border-gray-200 p-2">Fluxo de Vendas</h1>
      <div id="grafico" className="w-full h-auto p-5">
        <ResponsiveContainer width="100%" height={250} >
        <AreaChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dia" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="vendas" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
      </div>
      
    </div>
  );
}

export default FluxoVendas;
