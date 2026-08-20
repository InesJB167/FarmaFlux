
export const validarBarcode = (codigo) => {

    const primeiros12Digitos = codigo.slice(0, 12)
    const ultimoDigito = codigo.slice(-1)

    const digitos = primeiros12Digitos.split("")
    let numerosPosicoesPar = []
    let numerosPosicoesImpares = []
    //como pegar os numeros nas posicoes pares?? n%2==0
    digitos.forEach((element, index) => {
        if (index % 2 === 0) {
            numerosPosicoesImpares.push(Number(element))
        } else if (index % 2 !== 0) {
            numerosPosicoesPar.push(Number(element))
        }
    });

    const somaDosNumerosPares = numerosPosicoesPar.reduce((acumulador, valorAtual) => {
        return (acumulador + valorAtual)
    }, 0)

    const somaDosNumeroImpares = numerosPosicoesImpares.reduce((soma, valor) => {
        return soma + valor
    }, 0)

    const soma = somaDosNumeroImpares + (somaDosNumerosPares * 3)
    const restoDaDivisao = soma % 10
    const digitoVerificador = (10 - restoDaDivisao) % 10

    const ultimoDigitoNumber = Number(ultimoDigito)

    if (digitoVerificador === ultimoDigitoNumber) {
        return true
    } else {
        return false
    }
}