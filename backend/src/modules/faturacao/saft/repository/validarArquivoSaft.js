import { XmlDocument, XsdValidator } from "libxml2-wasm"
import fs from "fs"

export const validarArquivoSaft = async (xmlString) =>
{
    //?este arquivo vai validar o arquivo xml
    let xmlDoc
    let xsdDoc
    let xsd
    try {
        //*carregando os arquivos na memoria
        const arquivoXsd = fs.readFileSync(new URL("../xsd/SAFTAO1.01_01.xsd", import.meta.url))

        //*fazer parse dos objectos
        xmlDoc = XmlDocument.fromString(xmlString) //*arquivo para ser validado
        xsdDoc = XmlDocument.fromString(arquivoXsd.toString())
        xsd = XsdValidator.fromDoc(xsdDoc)//* variavel pra validar

        //*usando o metodo pra validar o arquivo
        const errors = xsd.validate(xmlDoc)
        console.log("saft validado")
        return errors
    } catch (error) {
        console.log("Erros na estrutura do saft", error)
            error.forEach(element =>
            {
                console.log(`Linha de erro ${element.line}: ${element.message}`)
            });
    } finally {
        //*liberando itens da memoria
        xmlDoc.dispose()
        xsd.dispose()
    }
}