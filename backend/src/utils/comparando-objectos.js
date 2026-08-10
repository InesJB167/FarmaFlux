export const comparandoObjectos = (objecto1, objecto2) => {
    /**
     * comparar objecto é a coisa mais chata que eu ja fiz em js juro! 
     */

    let objectosIguais = true
    for (let propriedade in objecto1) {
        if (objecto1[propriedade] !== objecto2[propriedade]) {
            objectosIguais = false
        }
    }

    return objectosIguais
}