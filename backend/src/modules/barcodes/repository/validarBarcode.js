
export const validarBarcode = (codigo) => {

    const primeiros12Digitos = codigo.slice(0, 12)
    console.log("primeiros 12 Digitos", primeiros12Digitos)
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
            console.log("numeros impares ", numerosPosicoesImpares)
        } else if (index % 2 !== 0) {
            numerosPosicoesPar.push(Number(element))
            console.log("numeros pares ", numerosPosicoesPar)
        }
    });

    const somaDosNumerosPares = numerosPosicoesPar.reduce((acumulador, valorAtual) => {
        return (acumulador + valorAtual)
    }, 0)
    console.log("soma numeros pares ", somaDosNumerosPares)

    const somaDosNumeroImpares = numerosPosicoesImpares.reduce((soma, valor) => {
        return soma + valor
    }, 0)
    console.log("soma numeros impares ", somaDosNumeroImpares)

    const soma = somaDosNumeroImpares + (somaDosNumerosPares * 3)
    const restoDaDivisao = soma % 10
    const digitoVerificador = (10 - restoDaDivisao) % 10

    const ultimoDigitoNumber = Number(ultimoDigito)
    console.log("ultimo digito ", ultimoDigitoNumber, "digito verificar ", digitoVerificador)

    if (digitoVerificador === ultimoDigitoNumber) {
        return true
    } else {
        return false
    }
}