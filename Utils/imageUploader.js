const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );

const s3 = new aws.S3({
    accessKeyId: 'AKIA4R6VRGUCELWQA6PX',
    secretAccessKey: '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',
    Bucket: 'drive-now-app-multimedia'
   });

   const saveImageToS3 = multer({
    storage: multerS3({
     s3: s3,
     bucket: 'drive-now-app-multimedia',
     acl: 'public-read',
     key: function (req, file, cb) {
        cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
       }
    }),
    limits:{ fileSize: 2000000 }, 
   }).single('File');

 
   module.exports = { saveImageToS3 }