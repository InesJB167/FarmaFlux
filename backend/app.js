import express from "express";
import cors  from "cors";
import authRoutes from "./src/modules/auth/auth.routes.js"

const app = express()

app.use(cors()) 
app.use(express.json())

//rotas do sistema

//para autenticação
app.use("/auth" ,authRoutes)

export default app




