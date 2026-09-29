import { buscarFarmaciaPorId } from "../repository/buscarFarmacia.js"

export const buscarFarmaciaPorId = async(idFarmacia) =>{
    const farmacia = await buscarFarmaciaPorId(idFarmacia)
    if(!farmacia) return{
        success: false,
        status: 404,
        message: "Farmácia não encontrada."
    }

    return{
        success: true,
        status: 200,
        message: "Farmácia encontrada.",
        data: farmacia
    }
}