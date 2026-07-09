import express from "express"
import { criar_user } from "../controller/createUser.controller.js"
const router = express.Router()

router.post("/create" ,criar_user)
export default router

