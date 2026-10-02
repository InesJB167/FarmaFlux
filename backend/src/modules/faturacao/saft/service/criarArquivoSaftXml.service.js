import fs from "fs"
import { gerarArquivoSaftXml } from "./gerarArquivoSaftXml.service.js"
import { validarArquivoSaft } from "../repository/validarArquivoSaft.js"

export const criarArquivoSaftXml = async(dataInicio,dataFim)=>{
    //essa funçao que salva o arquivo em memoria
    const xmlString = await gerarArquivoSaftXml(dataInicio,dataFim)
    const arquivoValido = await validarArquivoSaft(xmlString)

    if(!arquivoValido){
        console.log("Esse arquivo não é valido.")
        return false
    }

    fs.writeFileSync("./saft.xml", xmlString ,"utf-8")

    console.log("Arquivo SAFT criado e salvo com sucesso")

    return xmlString
}