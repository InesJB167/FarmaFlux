
export const decodificarToken = (authorization)=>{
    const tokenFormatado = authorization.split(" ")
    
    if(tokenFormatado.length !== 2) return false

    const token = tokenFormatado[1]
    return token
}