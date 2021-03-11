var express = require("express")
var router = express.Router()

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.json({
        name:art,
        age:20,
        phone:191
    })
})

module.exports = router
