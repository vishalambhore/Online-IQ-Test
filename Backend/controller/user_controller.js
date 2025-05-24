import User from "../model/user_model.js";
import bcryptjs from "bcryptjs"

export let signup = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "user already exists" })
        }
        let hashpassword = await bcryptjs.hash(password, 10)
        let createUser = new User({
            fullname: fullname,
            email: email,
            password: hashpassword
        })
        await createUser.save()
        res.status(201).json({ message: "User Created successfully",user:{
                    id: createUser.id,
                    fullname: createUser.fullname,
                    email: createUser.email
                
        } })
    } catch (error) {
        console.log("Error:" + error.message)
        res.status(500).json({ message: "Internal Server Error" })

    }
}

export let login = async (req, res) => {
    try {
        let { email, password } = req.body
        let user = await User.findOne({ email })
        let isMatch = await bcryptjs.compare(password, user.password)
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid Username or Password" })


        } else {
            return res.status(200).json({
                message: "Login successful", user: {
                    _id: user.id,
                    fullname: user.fullname,
                    email: user.email
                }
            })


        }
    } catch (error) {
        console.log("Error" + error.message)
        res.status(500).json({ message: "Internal Server Error" })

    }
}