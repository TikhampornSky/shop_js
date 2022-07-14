const express = require('express')
const router = require('./routes/myRouter')
const path = require('path')

const app = express()       //ใช้งาน express
app.use(express.json())

var session = require('express-session')    //สำหรับสร้าง Flash Message
var flash = require('connect-flash')

app.use(session({                        //สำหรับ Set up session in node application
    secret : 'webslesson',                // It is a random unique string key, which is used to authenticate a session
    cookie : {maxAge : 60000},            // Set the cookie expire time and then ther browser will delete the cookie
    saveUninitialized : false,           
    resave : false
}))

app.use(flash())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))       //มีการใช้ post method และต้องการให้ข้อมูลที่ส่งเข้ามา Encode เพื่อนำข้อมูลมาใช้
app.use(router)
app.use(express.static(path.join(__dirname, '/public/')))     //จะมองว่าไฟล์ที่ชื่อ index ที่อยู่ใน public (Static File Only!)

//app.use(router)           //เฉพาะกรณีต้องการใช้ Router


app.listen(8080, ()=>{
    console.log("Run Server 8080")
})