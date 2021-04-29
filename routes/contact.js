const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const admin = require('firebase-admin')
var serviceAccount = require("/home/rudy/Documents/EdStem/config/photos-5c619-firebase-adminsdk-y1urh-3b91ad2ded.json");
const multer = require('multer');
const path = require('path');
const compress_images = require("compress-images")
const uuid = require('uuid-v4');
const fs = require('fs');



const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
  



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://photos-5c619-default-rtdb.firebaseio.com",
  storageBucket:"photos-5c619.appspot.com"
});




let database = admin.firestore()
const usersDb = database.collection('users'); 
const bucket = admin.storage().bucket()


//upload to firebase code
async function uploadFile(name) {

  const metadata = {
    metadata: {
      
      firebaseStorageDownloadTokens: uuid()
    },
    contentType: 'image/jpeg',
    cacheControl: 'public, max-age=31536000',
  };
  await bucket.upload(name, {
    
    gzip: true,
    metadata: metadata,
  });

console.log("uploaded.");

}


// handling of the route

router.post("/",async (req,res)=>
{ 
  let upload = multer({ storage: storage}).single('image');
  upload(req, res, (err) => {
    if(err) {
      res.status(400).send("Something went wrong!");
    }
  imagepath=req.file.path
  res.send("recevied the photo");
      // compression of images
  compress_images(imagepath, "/home/rudy/Documents/EdStem/public", { compress_force: false, statistic: true, autoupdate: true }, false,
      { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
      { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
      { svg: { engine: "svgo", command: "--multipass" } },
      { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
  async function (error, completed, statistic) {
  console.log("-------------");
  console.log(error);
  console.log(completed);
  console.log(statistic["path_out_new"]);
  console.log(statistic)
  console.log("-------------");
  await uploadFile(statistic["path_out_new"]).catch(console.error);
  fs.unlink(statistic["path_out_new"], (err) => {
    if (err) {
        throw err;
    }

    console.log("File is deleted.");
});
  });
  
  
  });
    
})





  


module.exports = router