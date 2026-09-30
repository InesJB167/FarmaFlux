import fs from "fs"
import { gerarArquivoSaftXml } from "./gerarArquivoSaftXml.service.js"

export const criarArquivoSaftXml = async(dataInicio,dataFim)=>{

    const xmlString = await gerarArquivoSaftXml(dataInicio,dataFim)
    fs.writeFileSync("./saft.xml", xmlString ,"utf-8")
    return xmlString
}