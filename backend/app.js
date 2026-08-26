import express from "express";
import cors  from "cors";
import authRoutes from "./src/modules/auth/auth.routes.js"
import utilizadoresRoutes from "./src/modules/utilizador/router/utilizador.routes.js"
import categoriasRoutes from "./src/modules/categoria/routes/categoria.routes.js"
import localizacoesRoutes from "./src/modules/localizacoes/routes/localizacoes.routes.js"
import medicamentosRoutes from "./src/modules/medicamento/routes/medicamentos.routes.js"
import fornecedoresRoutes from "./src/modules/fornecedor/router/fornecedor.route.js"
import lotesRoutes from "./src/modules/lote/routes/lotes.route.js"
import barcodesRoutes from "./src/modules/barcodes/routes/barcodes.routes.js"
import vendasRoutes from "./src/modules/vendas/router/venda.routes.js"

//?"Primeiro fazemos funcionar. Depois fazemos funcionar direito. Só depois fazemos bonito."

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

//rota de fornecedores
app.use("/fornecedores" ,fornecedoresRoutes)

//rota de lotes
app.use("/lotes" ,lotesRoutes)

//rota barcodes
app.use("/barcodes" ,barcodesRoutes)

//rota vendas
app.use("/venda" ,vendasRoutes)

export default app




