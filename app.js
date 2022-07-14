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



//-------------------------------------------------
/*
//update data to database
app.post('/create', async(req, res) => {      //Post method from form.ejs (SAFE!!!)
    const {name, price, detail} = req.body

    try {
        connection.query(
            "INSERT INTO products(name, price, detail) VALUES(?, ?, ?)",
            [name, price, detail],
            (err, results, fields) => {
                if (err) {
                    console.log("ERROR: ", err)
                    return res.status(400).send()
                }
                return res.status(201).json({message: "New Product add sunccesfully"})
            }
        )
    } catch (err) {
        console.log("ERROR!!: ", err)
        return res.status(500).send()
    }
})

//read data from mySQL
app.get("/read", async(req, res) => {
    try{
        connection.query("SELECT * FROM products", (err, results, fields) => {
            if (err) {
                console.log(err)
                return res.status(400).send()
            }
            res.status(200).json(results)
        })
    } catch(err) {
        console.log(err)
        return res.status(500).send()
    }
})

//Read single user
app.get("/read/single/:name", async(req, res) => {
    const name = req.params.name
    try{
        connection.query("SELECT * FROM products WHERE name = ?", [name], (err, results, fields) => {
            if (err) {
                console.log(err)
                return res.status(400).send()
            }
            res.status(200).json(results)
        })
    } catch(err) {
        console.log(err)
        return res.status(500).send()
    }
})

//Update data
app.patch("/update/:name", async(req, res) => {
    const name = req.params.name
    const newPrice = req.body.newPrice

    try{
        connection.query("UPDATE products SET price = ? WHERE name = ?", [newPrice, name], (err, results, fields) => {
            if (err) {
                console.log(err)
                return res.status(400).send()
            }
            res.status(200).json({message: "Update Succesfully!"})
        })
    } catch(err) {
        console.log(err)
        return res.status(500).send()
    }
})

//Delete data
app.delete("/delete/:name", async(req, res) => {
    const name = req.params.name

    try{
        connection.query("DELETE FROM products WHERE name = ? ", [name], (err, results, fields) => {
            if (err) {
                console.log(err)
                return res.status(400).send()
            }
            if (results.affectedRows == 0) {
                res.status(404).json({message: "No name of the product"})
            }
            res.status(200).json({message: "Delete Succesfully!"})
        })
    } catch(err) {
        console.log(err)
        return res.status(500).send()
    }
})
*/