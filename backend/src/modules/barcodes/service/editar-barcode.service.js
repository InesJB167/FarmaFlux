import prisma from "../../../../prisma/prisma.js"
import { buscarMedicamentoPorId } from "../../medicamento/repository/buscarMedicamentoPorId.js"
import { buscarBarcodePorCodigo } from "../repository/buscarBarcodePorCodigo.js"
import { buscarBarcodePorId } from "../repository/buscarBarcodePorId.js"

export const editarBarcodeService = async (id, dadosParaEdicao) => {
    const encontrarBarcode = await buscarBarcodePorId(id)

    if (!encontrarBarcode) return {
        success: false,
        status: 404,
        message: "Codigo de barras não encontrado"
    }

    const dadosNovos = {
        codigo: encontrarBarcode.codigo,
        medicamento_id: encontrarBarcode.medicamento_id
    }

     /**
     * ?antes de editar verifique se existe o medicamento que quer se trocar
     * ? e se ja existe um codigo semelhante ao novo
     */

    if (dadosParaEdicao.hasOwnProperty("codigo")) {
        const codigo = dadosParaEdicao.codigo
        const outroBarcodeComEsteCodigo = await buscarBarcodePorCodigo(codigo)

        if (outroBarcodeComEsteCodigo && outroBarcodeComEsteCodigo.id !== id) return {
            success: false,
            status: 409,
            message: "Este codigo de barras pertence a outro medicamento."
        }

        dadosNovos.codigo = codigo
    }

    if(dadosParaEdicao.hasOwnProperty("medicamento_id")){
        const medicamento_id = dadosParaEdicao.medicamento_id
        const acharMedicamento = await buscarMedicamentoPorId(medicamento_id)

        if(!acharMedicamento) return {
            success: false,
            status: 404,
            message: "Medicamento não encontrado."
        }

        dadosNovos.medicamento_id = medicamento_id
    }

    const compararObjectos = ()=>{
        let objectosIguais = true

        for(let propriedade in dadosNovos){
            if(encontrarBarcode[propriedade] !== dadosNovos[propriedade]){
                objectosIguais = false
            }
        }

        return objectosIguais
    }

    const verificandoObjectos = compararObjectos()
    console.log(verificandoObjectos)

    if(verificandoObjectos) return{
        success: false,
        status: 409,
        message: "Os dados informados são iguais aos dados atuais."
    }

    const editarBarcode = await prisma.barcodes.update({
        where:{
            id
        },
        data:{
            codigo: dadosNovos.codigo,
            medicamento_id: dadosNovos.medicamento_id
        },
        select:{
            id: true,
            codigo: true,
            medicamentos:{
                select:{
                    id: true,
                    nome: true
                }
            }
        }
    })

    return {
        success: true,
        status: 200,
        message: "Codigo de barras atualizado.",
        data: editarBarcode
    }

   
}