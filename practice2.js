const http = require('http')
const fs = require('fs')
const url = require('url')

const indexPage = fs.readFileSync(`${__dirname}/templates_practice/index.html`, 'utf-8')
const productPage1 = fs.readFileSync(`${__dirname}/templates_practice/product1.html`, 'utf-8')
const productPage2 = fs.readFileSync(`${__dirname}/templates_practice/product2.html`, 'utf-8')
const productPage3 = fs.readFileSync(`${__dirname}/templates_practice/product3.html`, 'utf-8')
//dirname = อ้างอิงโฟลเดอร์ด้านนอกที่ทำการจัดเก็บ

const server = http.createServer((req, res) => {   //req = request, res = response
    console.log(url.parse(req.url, true))   //show detail of url
    const {pathname, query} = url.parse(req.url, true)
    if (pathname == "/" || pathname == "/home") {       //route = url = path ที่ส่งมา 
        res.end(indexPage)
        /*
        const myhtml = `<h1> Hello HOMEPAGE </h1>
            <p style="color:blue"> Tontan Tomato1234 </p>`
        res.end(myhtml)
        */
    } else if (pathname == "/product") {
        console.log(query.id)          //query string      localhost:3000/product?id=2
        if (query.id == "1") {
            res.end(productPage1)
        } else if (query.id == "2") {
            res.end(productPage2)
        } else if (query.id == "3") {
            res.end(productPage3)
        } else {
            const myhtml = `<h1> Not found... </h1>
            <p style="color:red"> TTTTTTTT </p>`
            res.writeHead(404)
            res.end(myhtml)
        }
    } else {
        const myhtml = `<h1> Not found... </h1>
            <p style="color:red"> TTTTTTTT </p>`
        res.writeHead(404)
        res.end(myhtml)
    }


    /*
    const pathName = req.url
    console.log("url = ", pathName) 
    if (pathName == "/" || pathName == "/home") {       //route = url = path ที่ส่งมา 
        res.end(indexPage)
        /*
        const myhtml = `<h1> Hello HOMEPAGE </h1>
            <p style="color:blue"> Tontan Tomato1234 </p>`
        res.end(myhtml)
        */
    /*
    } else if (pathName == "/product1") {
        res.end(productPage1)
    } else if (pathName == "/product2") {
        res.end(productPage2)
    }  else if (pathName == "/product3") {
        res.end(productPage3)
    } else {
        const myhtml = `<h1> Not found... </h1>
            <p style="color:red"> TTTTTTTT </p>`
        res.writeHead(404)
        res.end(myhtml)
    }
    */
    /*
    const myhtml = `<h1> Hello World </h1>
    <p style="color:blue"> Tontan Tomato1234 </p>`
    res.end(myhtml)
    */
    /*
    res.write(myhtml)
    res.end()
    */
}).listen(3000, 'localhost',() => {
    console.log("Start server in port 3000")
})