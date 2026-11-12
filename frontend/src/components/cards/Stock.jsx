function StockCard() {
  const stockStatus = "STOCK BAIXO"; // Exemplo de status do estoque
  const numeroLotes = 5; // refere-se ao de número de lotes perdo da data de expiração ou lotes não espirados
  const mensagem = "Atenção: estoque baixo!"; // Mensagem de alerta
  return (
    <div className="w-2xs h-40 p-5 rounded-sm border-2 border-slate-200 flex flex-col gap-2">
      <p className="text-muted text-xs">{stockStatus}</p>
      <div className={" flex gap-2 items-baseline   "}>
        <p className="font-bold text-warning text-3xl ">{numeroLotes}</p>
        <p>referências</p>
      </div>
      <p className="text-sm text-warning">{mensagem}</p>
    </div>
  );
}

export default StockCard;
