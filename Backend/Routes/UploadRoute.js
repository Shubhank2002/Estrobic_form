const express=require('express')

const upload = require('../Middlewares/Multer')
const { UploadFile } = require('../Controllers/UploadController')
const uploadRouter=express.Router()

uploadRouter.post('/upload',upload.single('file'),UploadFile)

module.exports=uploadRouter