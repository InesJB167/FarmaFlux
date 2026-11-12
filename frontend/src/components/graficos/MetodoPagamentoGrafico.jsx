import { ResponsiveContainer, PieChart,Cell, Pie, Tooltip, Legend } from "recharts";

function MetodoPagamentoGrafico() {
  const dados = [
    { metodo: "Multicaixa", total: 50 },
    { metodo: "Dinheiro", total: 30 },
    { metodo: "Transferência", total: 20 },
  ]; //dados de exemplo para o gráfico, aqui vão os métodos de pagamento e seus totais
  const cores = ["#16A34A", "#F59E0B", "#3B82F6"];
  return (
    <div className="w-76 border-2 border-gray-200 rounded-2 mt-4 ">
      <div
        id="header"
        className="p-2 border-b-2 border-gray-200 flex justify-between items-baseline"
      >
        <h2>Métodos de Pagamento</h2>
        <h2>Vendas de Hoje</h2>
      </div>
      <div id="grafico">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={dados}
              dataKey="total"
              nameKey="metodo"
              innerRadius="40%"
              outerRadius="80%"
            >
                {dados.map((entry, index) => (
                  <Cell key={entry.metodo} fill={cores[index]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MetodoPagamentoGrafico;
