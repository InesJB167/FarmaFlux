import prisma from "../../../../prisma/prisma.js"

export const listarMedicamentosPorCategoria = async() =>{
    /**
     * ?a ideia é apresentar os medicamentos por categorias 
     * *como fazer isso??
     * *como faria isso via sql??
     */
    const listaPorCategoria = await prisma.medicamentos.findMany({
        where:{
            deleted_at: null
        }
    })
}