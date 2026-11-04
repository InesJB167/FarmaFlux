import prisma from "../../../../prisma/prisma.js"
import { buscarCategoriaPorNome } from "../repository/buscar-categoria-porNome.js"
import { buscarFarmaciaPorId } from "../../farmacia/repository/buscarFarmaciaPorId.js"

export const criarCategoriaService = async (nomeCategoria, descricao, farmaciaId) =>
{
    try {

        const farmacia = await buscarFarmaciaPorId(farmaciaId)
        if (!farmacia) return {
            success: false,
            status: 404,
            message: "Farmácia não encontrada."
        }

        const farmacia_id = parseInt(farmacia.id)

        const categoria = await buscarCategoriaPorNome(farmacia_id,nomeCategoria)

        if (categoria && categoria.deleted_at === null) return { success: false, message: "Já existe uma categoria com este nome." }

        const criarCategoria = await prisma.categorias.create({
            data: {
                nome: nomeCategoria,
                descricao: descricao,
                farmacia: {
                    connect: {
                        id: farmacia_id
                    }
                }
            },
            select:{
                id: true,
                nome: true,
                descricao: true,
                farmacia:{
                    select:{
                        id: true,
                        nome_comercial: true
                    }
                }
            }
        })

        return {
            success: true,
            message: "Categoria criada com sucesso!",
            data: criarCategoria
        }
    } catch (error) {
        throw error
    }
}