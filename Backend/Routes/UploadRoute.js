const express=require('express')


const { UploadFile } = require('../Controllers/UploadController')
const upload = require('../Middlewares/Multer')
const uploadRouter=express.Router()

uploadRouter.post('/upload',upload.single('resume'),UploadFile)

module.exports=uploadRouter