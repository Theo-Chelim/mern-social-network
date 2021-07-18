const router = require("express").Router()
const authController = require("../controllers/auth.controller")
const userController = require("../controllers/user.controller")

// authentication 
router.post("/register", authController.signUp)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

// user crud
router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.getUserInfos)
router.put('/users/:id', userController.setUserBio)
router.patch('/users/:id/follow', userController.follow)
router.patch('/users/:id/unfollow', userController.unfollow)

module.exports = router;