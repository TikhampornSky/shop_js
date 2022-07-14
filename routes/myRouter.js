//จัดการ Routing
const { request } = require('express')
const express = require('express')
const router = express.Router()         //router uses for managing url
//const path = require('path')
const connection = require('../database.js')

router.get('/', (req, res) => {
    const name = "Tontan Tomato"
    const age = 15
    const address = "<h3> Bangkok </h3>"
    const products = ["Cloths", "Earphone", "Fan", "Keyboard", "shampoo"]
    const products_object = [
        {name:"คอมพิวเตอร์", price:500, image:"images/products/product1.png"},
        {name:"เสื้อกันหนาว", price:1000, image:"images/products/product2.png"},
        {name:"หูฟัง", price:800, image:"images/products/product3.png"}
    ]
    res.render('index.ejs', {name:name, age:age, address:address, products:products,products_object:products_object})        //{property: value}
})

/*
router.get('/addForm', (req, res) => {
    res.render('form.ejs')       
})
*/
/*
router.get('/manage', (req, res) => {
    res.render('manage.ejs')        
})
*/
/*
router.get('/insert', (req, res) => {       //Get method from form.ejs (ไม่เหมาะกับ Sensitive Method)
    console.log(req.query)                  //req.query store the value from form
    console.log(req.query.price)
    res.render('form.ejs')
})
*/

/*
router.post('/insert', async(req, res) => {      //Post method from form.ejs (SAFE!!!)
    console.log(req.body)                  
    console.log(req.body.price)
    res.render('form.ejs')
})
*/
//-------Fetch & Display Data From MySQL Database-------
router.get("/manage", function(req, res, next) {
    var query = "SELECT * FROM products"
    connection.query(query, function(err, data) {
        if (err) {
            throw err;
        } else {
            res.render('manage', {title:"เพิ่ม ลบ แก้ไขข้อมูลในฐานข้อมูล", action:"list", sampleData:data, message:req.flash('success')})
        }
    });
})

//--------Insert Form Data into MySQL Table--------
router.get('/addForm', (req, res, next) => {
    res.render('form', {title:"แบบฟอร์มบันทึกสินค้าใหม่", action:"add"})      
})

router.post("/insert", (req, res, next) => {
    console.log(req.body)
    var name = req.body.name
    var price = req.body.price
    var detail = req.body.detail

    var query = `INSERT INTO products 
    (id, name, price, detail) 
    VALUES ("","${name}","${price}","${detail}")`
    connection.query(query, function(err, data) {
        if (err) {
            throw err
        } else {
            req.flash('success', "Data Inserted!!")
            res.redirect('/manage')
        }
    });
})

router.post("/edit", (req, res, next) => {
    const edit_id = req.body.edit_id 
    var query = `SELECT * FROM products WHERE id = '${edit_id}'`
    connection.query(query, function(err, data) {
        if (err) {
            throw err
        } else {
            //console.log(data)
            res.render('edit', {sampleData:data[0]})
        }
    });
})

router.post("/edit/:id", (req, res, next) => {
    const id = req.params.id

    var name = req.body.name
    var price = req.body.price
    var detail = req.body.detail

    var query = `UPDATE products 
    SET name = "${name}",
    price = "${price}", 
    detail = "${detail}"
    WHERE id = "${id}"`
    connection.query(query, function(err, data) {
        if (err) {
            throw err
        } else {
            req.flash('success', "Data Update!!")
            res.redirect('/manage')
        }
    });
})


router.get('/delete/:id', (req, res)=> {
    var id = req.params.id;
    var query = `DELETE FROM products WHERE id = '${id}'`
    connection.query(query, function(err, data) {
        if (err) {
            throw err
        } else {
            req.flash('success', "Data Deleted!!")
            res.redirect('/manage')
        }
    });
})


//อ้างอิงตำแหน่งไฟล์
//const indexPage = path.join(__dirname, "../templates/index.html")   // ../ คือ ถอยออก

//--------------สำหรับ static file-------------
/*
//ถ้าเป็น static file ไม่จำเป็นต้องกำหนดเป็น route แบบนี้
router.get("/", (req, res) => {     //ต้องเขียนก่อน listen (เป็นการเรียกใช้งาน)
    //res.send("<h1> Hello Express!!!!! 2022 </h1>")  //send response
    res.status(200)             //send status
    res.type('text/html')       //รูปแบบการ response
    res.sendFile(indexPage)
})

//:id คือ ค่าที่ตามมาจะเก็บในพารามิเตอร์ id  เช่น http://localhost:8080/product/1 จะได้ว่า id=1
router.get("/product/:id", (req, res) => {     //ต้องเขียนก่อน listen (เป็นการเรียกใช้งาน)
    const productID = req.params.id
    //res.send(`<h1> Hello PRODUCT ${productID} </h1>`)  //send response
    if (productID == "1") {
        res.sendFile(path.join(__dirname, "../templates/product1.html"))
    } else if (productID == "2") {
        res.sendFile(path.join(__dirname, "../templates/product2.html"))
    } else if (productID == "3") {
        res.sendFile(path.join(__dirname, "../templates/product3.html"))
    } else {
        res.redirect('/')       //เปลี่ยนเส้นทาง
        res.status(404)
        res.send("<h1> ERROR 404 Not Found </h1>")
    }
})
*/
module.exports = router