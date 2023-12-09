const mongoose=require('mongoose');


const mongoURI="mongodb://0.0.0.0:27017/userbook"


const connectToMongo=()=>{
    try{
        mongoose.set('strictQuery', false)
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo successfully");
    })}
    catch(error){
        console.log(error)
        process.exit()
    }
}

module.exports=connectToMongo;