const express=require('express')
const uploadRouter = require('./Routes/UploadRoute')
const app=express()
const cors=require('cors')

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));
app.use('/api',uploadRouter)



app.listen(8000,()=>console.log('server started'))