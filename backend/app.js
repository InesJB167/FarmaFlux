import express from "express";
import cors  from "cors";
import authRoutes from "./src/modules/auth/auth.routes.js"
import utilizadoresRoutes from "./src/modules/utilizador/router/utilizador.routes.js"

const app = express()

app.use(cors()) 
app.use(express.json())

//rotas do sistema

//para autenticação
app.use("/auth" ,authRoutes)

//rota user
app.use("/users" ,utilizadoresRoutes)


export default app




