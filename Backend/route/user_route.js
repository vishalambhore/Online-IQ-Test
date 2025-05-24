import express from "express"
import { signup } from "../controller/user_controller.js"
import { login } from "../controller/user_controller.js"

let  router = express.Router()

router.post('/signup',signup)
router.post('/login',login)

export default router;


