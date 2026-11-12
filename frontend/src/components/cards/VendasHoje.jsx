function VendasHojeCard() {
  const numeroVendas = 12;
  const alvoVendas = 20;

  return (
    <div className="w-2xs h-40 p-5 rounded-sm border-2 border-slate-200">
      <p className="text-muted text-xs">VENDAS DE HOJE (AOA)</p>
      <p className="font-bold text-3xl">{numeroVendas}</p>
      <div id="progress-container" className="mt-2">
        <div className="flex justify-between mb-1">
            <p>Progresso</p>
            <p>{((numeroVendas / alvoVendas) * 100).toFixed(2)}%</p>
        </div>
        
        <div
          id="progress-bar"
          className="w-full h-2 bg-gray-300 rounded-full mt-2"
        >
          <div
            className="h-full bg-primary rounded-full"
            style={{ width: `${(numeroVendas / alvoVendas) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default VendasHojeCard;
