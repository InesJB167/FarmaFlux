import prisma from "../../../../prisma/prisma.js"
import { buscarBarcodePorId } from "../repository/buscarBarcodePorId.js"

export const deletarBarcodeService = async (id)=>{
    const barcodeAtual = await buscarBarcodePorId(id)

    if(!barcodeAtual) return{
        success: false,
        status: 404,
        message: "Codigo de barras não encontrado."
    }

    const deletar = await prisma.barcodes.update({
        where:{
            id
        },
        data:{
            deleted_at: new Date()
        }, 
        select:{
            id: true,
            codigo: true,
            medicamentos:{
                select:{
                    nome: true
                }
            }
        }
    })

    return {
        success: true,
        status: 200,
        message: "Codigo de barras eliminado.",
        data: deletar
    }
}