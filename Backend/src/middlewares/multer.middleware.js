import multer from "multer"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
 export  const upload = multer({ storage,    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
 })