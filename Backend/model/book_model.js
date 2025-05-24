import mongoose  from "mongoose";


let bookSchema = mongoose.Schema({
    name:String,
    title:String,
    price:Number,
    category:String,
    image:String
});

let Book = mongoose.model("Book",bookSchema);

export default  Book;