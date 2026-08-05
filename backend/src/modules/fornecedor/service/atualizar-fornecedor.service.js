import prisma from "../../../../prisma/prisma.js";
import { buscarFornecedorPeloNif } from "../repository/buscarFornecedorPeloNif.js";
import { buscarFornecedorPorId } from "../repository/buscarFornecedorPorId.js";

export const editarFornecedorService = async (id, dados) => {
    const fornecedorExiste = await buscarFornecedorPorId(id)
    let dadosParaEdicao = {}

    /**
     * !se for pra verificar a propriedade ela sempre vira true porque ela faz parte e vem do controler .
     * !como checar o nome de modo que seja verificado apenas quando o user envia-lo ???
     * nothing makes sense ..maybe i'm just tired because of the laundry ..
     */
    const verificarNome = dados.hasOwnProperty("nome_empresa")
    const verificarDadosNif = dados.hasOwnProperty("nif")
    const verificarDadosContacto = dados.hasOwnProperty("contacto")
    const verificarDadosEndereco = dados.hasOwnProperty("endereco")

    if (!fornecedorExiste) return {
        success: false,
        status: 404,
        message: "Fornecedor não encontrado."
    }

    if (verificarNome) {

        dadosParaEdicao.nome_empresa = dados.nome_empresa
        if (!dadosParaEdicao.nome_empresa) return {
            success: false,
            status: 400,
            message: "Nome da empresa não pode ser vazio."
        }
    }

    if(verificarDadosNif){
        if(!dados.nif) return{
            success: false,
            status: 400,
            message: "Este campo não pode estar vazio."
        }

        if(dados.nif.length < 10) return{
            success: false,
            status: 400,
            message: "NIF inválido"
        }
    }

    dadosParaEdicao = {
        nome_empresa: dados.nome_empresa || fornecedorExiste.nome_empresa,
        nif: dados.nif || fornecedorExiste.nif,
        contacto: dados.contacto || fornecedorExiste.contacto,
        endereco: dados.endereco || fornecedorExiste.endereco
    }

    const verificarDadosDuplicados = () => {
        let dadosDuplicados = true
        for (let propriedadeAtual in dadosParaEdicao) {
            if (dadosParaEdicao[propriedadeAtual] !== fornecedorExiste[propriedadeAtual]) {
                dadosDuplicados = false
            }
        }

        return dadosDuplicados
    }

    const dadosSemelhantes = verificarDadosDuplicados()


    if (dadosSemelhantes) return {
        success: false,
        status: 409,
        message: "Dados ja registrados."
    }

    const verificarNif = await buscarFornecedorPeloNif(dadosParaEdicao.nif)

    if (verificarNif) {
        if (verificarNif.id !== id) {
            return {
                success: false,
                status: 409,
                message: "NIF relacionado a outro fornecedor."
            }
        }
    }

    const editarDados = await prisma.fornecedores.update({
        where: {
            id
        },
        data: dadosParaEdicao,
        select: {
            id: true,
            nome_empresa: true,
            nif: true,
            contacto: true,
            endereco: true
        }
    })

    return {
        success: true,
        status: 200,
        message: "Dados do fornecedor atualizados.",
        data: editarDados
    }
}