import express from "express";
import cors  from "cors";
import authRoutes from "./src/modules/auth/auth.routes.js"
import createUser from "./src/modules/users/router/createUser.routes.js"

const app = express()

app.use(cors()) 
app.use(express.json())

//rotas do sistema

//para autenticação
app.use("/auth" ,authRoutes)

//rotas users
app.use("/users" ,createUser)

export default app




