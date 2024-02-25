const router = require('express').Router();
const authController =require('../Controllers/auth.controller');
const userController = require('../Controllers/user.controller')
const uploadController= require('../Controllers/upload.controller');
const multerPromise = import('multer');
multerPromise.then(multer => {
    const upload = multer.default(); 
    router.post('/upload', upload.single('file'), uploadController.uploadProfil);
});

router.post("/register" , authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);


module.exports=router;