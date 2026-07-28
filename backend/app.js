import express from "express";
import cors  from "cors";
import authRoutes from "./src/modules/auth/auth.routes.js"
import utilizadoresRoutes from "./src/modules/utilizador/router/utilizador.routes.js"
import categoriasRoutes from "./src/modules/categoria/routes/categoria.routes.js"
import localizacoesRoutes from "./src/modules/localizacoes/routes/localizacoes.routes.js"
import medicamentosRoutes from "./src/modules/medicamento/routes/medicamentos.routes.js"

const app = express()

app.use(cors()) 
app.use(express.json())

//rotas do sistema

//para autenticação
app.use("/auth" ,authRoutes)

//rota user
app.use("/users" ,utilizadoresRoutes)

//rota categoria
app.use("/category" ,categoriasRoutes)

//rota de localizacoes
app.use("/localizacoes" ,localizacoesRoutes)

//rota de medicamentos
app.use("/medicamentos" ,medicamentosRoutes)

export default app




