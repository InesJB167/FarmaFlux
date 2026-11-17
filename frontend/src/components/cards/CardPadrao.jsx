
function CardPadrao ({tituloCard,numero,legenda,detalhe,icon}){
    return(
        <div id="cards" className="flex flex-col gap-2 border-2 border-gray-200 rounded-sm p-4 w-full">
            <p className=" text-sm text-muted justify-between flex ">{tituloCard}{icon}</p>
            <p className="font-bold text-2xl">{detalhe} {numero}</p>
            <p className="font-medium text-muted">{legenda}</p>
        </div>
    )
}

export default CardPadrao