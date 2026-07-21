import { alteralRoleUtilizadorService } from "../service/alterar-role-utilizador.service.js"

export const alteralRoleUtilizador = async (req, res) =>{
    try {
        /**
     * TAREFA: alterar o role do utilizador.
     * existem 3 roles: ADMIN, GERENTE, OPERADOR
     * o user vai selecionar um usuário verificar o role do mesmo
     * a seguir ele pode selecionar um dos roles e a seguir altera-lo
     */

    const id = Number(req.params.id)
    console.log("user selecionado id",id)

    if(!id) return res.status(400).json({message: "falha ao encontrar user id"})
    
    if(Number.isNaN(id)) return res.status(400).json({message: "ID inválido"})

    const novoRole = req.body.novoRole?.trim().toUpperCase()
    console.log("novo role ",novoRole)

    const roles = ["ADMIN","GERENTE","OPERADOR"]

    if(!novoRole?.trim()){
        return res.status(400).json({message: "informe um role para o user."})
    } else if(!roles.includes(novoRole)){
        return res.status(400).json({message:" role inválido!"})
    }

    const alterarRole = await alteralRoleUtilizadorService(id, novoRole)

    if(!alterarRole.success) return res.status(404).json(alterarRole)
    
    return res.json(alterarRole)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error:error.message})
    }
}