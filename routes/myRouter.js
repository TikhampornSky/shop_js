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
    var query = "SELECT * FROM products"
    connection.query(query, function(err, data) {
        if (err) {
            throw err;
        } else {
            res.render('index.ejs', {name:name, age:age, address:address, products:products,products_object:products_object, sampleData:data})        //{property: value}
        }
    });
})

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
    var image = req.body.image

    var query = `INSERT INTO products 
    (id, name, price, detail, image) 
    VALUES ("","${name}","${price}","${detail}", "${image}")`
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

module.exports = router