const router = require('express').Router();
const authController =require('../Controllers/auth.controller');
const eleveController = require('../Controllers/eleve.controller')
const uploadController= require('../Controllers/upload.controller');
const multerPromise = import('multer');
multerPromise.then(multer => {
    const upload = multer.default(); 
    router.post('/upload', upload.single('file'), uploadController.uploadProfil);
});

router.post("/register" , authController.signUpEleve);
router.post("/login", authController.signInEleve);
router.get("/logout", authController.logout);

router.get('/', eleveController.getAllEleves);
router.get('/:id', eleveController.eleveInfo);
router.put("/:id", eleveController.updateEleve);
router.delete("/:id", eleveController.deleteEleve);


module.exports=router;