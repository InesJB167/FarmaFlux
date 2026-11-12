function ExpiracoesCard() {
  const numeroLotes = 2; //lotes que estão prestes a expirar em 30 dias
  return (
    <div className="flex flex-col gap-3 w-2xs h-40 p-5 rounded-sm border-2 border-slate-200">
      <p className="text-muted text-xs">EXPIRAÇÕES (30 DIAS)</p>
      <div className={" flex gap-2 items-baseline   "}>
        <p className="font-bold text-danger text-3xl ">{numeroLotes}</p>
        <p>lotes</p>
      </div>
      <p className="text-muted text-xs">Lotes a priorizar por ordem FEFO</p>
    </div>
  );
}

export default ExpiracoesCard;
