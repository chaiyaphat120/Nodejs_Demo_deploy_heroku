var express = require("express")
var router = express.Router()

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.status(200).json({
        name:art,
        age:20,
        phone:19100
    })
})

module.exports = router
