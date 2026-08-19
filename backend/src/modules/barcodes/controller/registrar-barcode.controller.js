import { validarId } from "../../../utils/validar-id.js"
import { registrarBarcodeService } from "../service/registrar-barcode.service.js"

export const registrarBarcode = async (req, res) => {
    try {
        const codigo = req.body.codigo?.trim()
        const medicamento_id = Number(req.body.medicamento_id)
        const verificarId = validarId(medicamento_id)

        if (!codigo && !medicamento_id) return res.status(400).json({ message: "Informe os dados para o registro do barcode." })

        if (!verificarId) return res.status(400).json({ message: "ID inválido." })

        if (!codigo) return res.status(400).json({ message: "Campo obrigatório." })

        /**
         * (/^\d+$/.test()) expressao que verifica se a string contem apenas digitos de 0 a 9
         * /^ : indica o começo da string
         * \d : indica um numero de 0 a 9
         * + : indica um ou mais numeros
         * $/ : indica o fim da string
         */

        if (!/^\d+$/.test(codigo)) return res.status(400).json({ message: "O código de barras deve conter apenas números." })

        if (codigo.length !== 13) {
            return res.status(400).json({
                message: "O código de barras deve possuir exatamente 13 dígitos."
            })
        }

        const primeiros12Digitos = codigo.slice(0, 12)
        console.log("primeiros 12 Digitos",primeiros12Digitos)
        const ultimoDigito = codigo.slice(-1)
        console.log("ultimoDigito", ultimoDigito)

        const digitos = primeiros12Digitos.split("")
        console.log("digitos", digitos)
        let numerosPosicoesPar = []
        let numerosPosicoesImpares = []
        //como pegar os numeros nas posicoes pares?? n%2==0
        digitos.forEach((element, index) => {
            if (index % 2 === 0) {
                numerosPosicoesImpares.push(Number(element))
                console.log("numeros impares ",numerosPosicoesImpares)
            } else if (index % 2 !== 0) {
                numerosPosicoesPar.push(Number(element))
                console.log("numeros pares ",numerosPosicoesPar)
            }
        });

        const somaDosNumerosPares = numerosPosicoesPar.reduce((acumulador, valorAtual) => {
            return (acumulador + valorAtual)
        }, 0)
        console.log("soma numeros pares ",somaDosNumerosPares)

        const somaDosNumeroImpares = numerosPosicoesImpares.reduce((soma, valor) => {
            return soma + valor
        }, 0)
        console.log("soma numeros impares ",somaDosNumeroImpares)

        const soma = somaDosNumeroImpares + (somaDosNumerosPares * 3)
        const restoDaDivisao = soma % 10
        const digitoVerificador = (10 - restoDaDivisao) % 10

        const ultimoDigitoNumber = Number(ultimoDigito)
        console.log("ultimo digito ",ultimoDigitoNumber ,"digito verificar ",digitoVerificador)

        if (digitoVerificador === ultimoDigitoNumber) {
            console.log("EAN-13 válido")
        } else {
            console.log("EAN-13 inválido")
            return res.status(400).json({ message: "EAN-13 inválido."})
        }

        const registrarBarcode = await registrarBarcodeService(codigo, medicamento_id)

        if (!registrarBarcode.success) return res.status(registrarBarcode.status).json(registrarBarcode)

        return res.json(registrarBarcode)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}