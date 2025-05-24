import express from "express"
import mongoose  from "mongoose";
import dotenv from "dotenv"
import booRoute from "./route/book_route.js"
import cors from "cors"
import user_router from "./route/user_route.js"
let app = express()
app.use(cors());
app.use(express.json());
dotenv.config();

let PORT = process.env.PORT || 7000;
let URI = process.env.MongoDBURI;
//connect To mongoDB
try{
    mongoose.connect(URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true

    });
    console.log("connect to mongoDB")
    

}catch(error){
  console.log("Error",error)

}
// define routes
app.use("/book",booRoute)
app.use('/user',user_router)

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})