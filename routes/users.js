const express = require("express")
const router = express.Router()
const userController = require('../controllers/userController')
/* GET users listing. */
router.get("/",userController.findAll_User)
router.get('/:id',userController.find_user_byID)
router.post("/login",userController.login)
router.post("/register",userController.register)
router.put("/update",userController.update_user)
router.patch("/update",verifyToken,userController.update_someFiled_user)
router.delete("/delete/:id",verifyToken,userController.deleteUserById)

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers["authorization"]
    // Check if bearer is undefined

    if (typeof bearerHeader !== "undefined") {
        // Split at the space
        const bearer = bearerHeader.split(" ")
        // Get token from array
        const bearerToken = bearer[1]
        // console.log(bearerToken)
        // Set the token
        req.token = bearerToken
        // Next middleware
        next()
    } else {
        // Forbidden
        res.sendStatus(404)
    }
}

module.exports = router
