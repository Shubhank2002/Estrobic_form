const UploadFile=(req,res)=>{
    const {name,email,phone,position}=req.body

    const file=req.file
    if(!file){
        return res.status(400).json({message:'no file uploaded'});
    }
    res.status(200).json({
        message:'Upload successfull',
        data:{
            name,email,file:{
                originalName:file.originalname,
                storedName:file.filename,
                path:file.path,
                size:file.size,
                url:`http://localhost:8000/uploads/${file.filename}`
            }
        }
    })
}

module.exports={UploadFile}