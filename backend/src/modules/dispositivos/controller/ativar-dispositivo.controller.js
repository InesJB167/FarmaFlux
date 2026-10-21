

export const ativarDispositivo = async(req,res)=>{
    try {
        //*como é que um dispositivo vai pode ser ativado ?? R: atraves do codigo de ativaçao 
        /**
         * *como ou de onde eu vou pegar dados cruciais como o id do tenant e o id hardware ?? e o jwt_token?? falando nele de onde ele vem e para que serve??
         */
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}