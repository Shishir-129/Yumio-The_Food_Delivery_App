// Main server file to set up Express server, connect to database, and define API endpoints
//  Also starts the server

import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import "dotenv/config"
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'


// app configuration
const app = express()  
const port = 4000 //port number

// middlewares
app.use(express.json()) // to parse JSON data
app.use(cors())  // to enable CORS

connectDB(); // connect to database

// api endpoints
app.use('/api/food', foodRouter);
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=> {       // request data from server and response back
    res.send("API Working")
}) 

app.listen(port, () => {  // listening to the server and turning it on
    console.log(`Server started on http://localhost:${port}`)
})
