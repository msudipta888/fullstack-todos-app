const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix +path.extname( file.originalname));
  },
});

//file filter to allow only images
const fileFilter = (req,file,cb)=>{
  if(file.mimetype.startsWith('image/')){
    cb(null,true)
  }else{
    cb('error: images only',false);
  }
};


const upload = multer({
   storage: storage,
   fileFilter:fileFilter
 });

router.post("/upload", upload.single("profilePic"), async (req, res) => {
  if(!req.file){
    return res.status(401).json('No pic upload')
  }
  const filePath = `/uploads/${req.file.filename}`;
  res.status(200).json({
    message:'Image uploaded sucessfully',
    url:filePath
  })
})

module.exports = router;
