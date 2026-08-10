export const validarId = (id)=>{
    let validar = true 
    if(Number.isNaN(id) || id < 0 ){
        validar = false
    }

    return validar
}