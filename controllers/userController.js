const Users = require("../models/users")
const jwt_decode = require("jwt-decode");
const jwt =  require('jsonwebtoken') 
const bcrypt = require('bcrypt');

exports.login = async (req , res ) =>{
    const decoded = jwt_decode(req.body.token); //decode jwt ก่อนใช้
    console.log("decoded",decoded)
    const { username ,password} = decoded
    const user = await Users.findOne({username}) //หา user จาก database ก่อน
    bcrypt.compare(password, user.password,(err, result)=> {  //check password ที่เจอในDB กับ password ที่พิมพ์มา
        console.log("bcrypt process..")
        if(result){  //ถ้า compare ด้วย bcrypt ผ่าน ก็เข้า if
            jwt.sign({ user:username }, "secreteKey123", { expiresIn: "3000min" }, (err, token) => {  //return access token
                console.log("bcrypt process2..")
                res.status(201).json({
                    "status":"login success",
                    "access_token":token,
                    "data":username,
                    "userId":user._id
                })
            })
            
        }else{
            console.log("bcrypt error..")
            res.status(401).json({
                status:"password invalid",
            })
        }
    });
}

exports.register =async  (req, res) => {
    const decoded = jwt_decode(req.body.token); //decode jwt ก่อนใช้
    const { username ,password ,email ,fullname ,tel ,role} = decoded
    let hash = bcrypt.hashSync(password,10);  //แปลง password หลังจาก decode

    //บันทึกลง mongoDB
    try {
        const user =new Users({
            username,
            password:hash,
            email,
            fullname,
            tel,
            role
        })
        await user.save()
        res.status(201).json({
            data:"create_success",
            user:user
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

exports.findAll_User = async (req, res) => {
    try {
        const user = await Users.find().select("-password")
        res.status(200).json({
            status: "success",
            data:user
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            error,
        })
    }
}

exports.find_user_byID = async (req, res) => { 
    const id = jwt_decode(req.params.id)
    try {
        const user = await Users.findById(id).select("-password")
        res.status(200).json({
            status: "success",
            data:user
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            error,
        })
    }
}

exports.update_user = async (req, res) => {
    try {
        const { _id, username, email, fullname, tel, role } = req.body
        const userUpdate = await Users.findByIdAndUpdate(_id, {
            username,
            email,
            fullname,
            tel,
            role,
        })
        res.status(200).json({
            message : "update complete",
            data:userUpdate
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            error,
        })
    }
}

// https://stackoverflow.com/questions/30602057/how-to-update-some-but-not-all-fields-in-mongoose
exports.update_someFiled_user = async (req, res) => {
    try {
        jwt.verify(req.token, "secreteKey123", async (err, authData) => {
            if (err) {
                res.status(403).json({ token: "valid token" })
            } else {
                //FIXME: แก้ให้หา id ก่อนลบ
                const { _id } = req.body
                const userUpdate = await Users.findByIdAndUpdate(_id ,{ $set: req.body })
                res.status(200).json({
                    message : "update some filed complete",
                    data:userUpdate
                })
            }
        })
        
    } catch (error) {
        res.status(404).json({
            status: "fail",
            error,
        })
    }
}

exports.deleteUserById =async (req, res) => {
    try {
        const { id } = req.params
        const {token} =req
        jwt.verify(token, "secreteKey123", async (err, authData) => {
            if (err) {
                res.status(403).json({ token: "valid token" })
            } else {
                //FIXME: แก้ให้หา id ก่อนลบ
                const deleteUser = await Users.findByIdAndDelete(id )
                if(!deleteUser) {
                    res.status(404).json({
                        message : "Not found ID",
                    })
                }
                res.status(200).json({
                    message : "delete by id complete",
                })
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            error,
        })
    }
}

