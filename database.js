const mysql = require('mysql')

//MySQL Connection
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database:'mysql_nodejs',
    port: '3307'
})

connection.connect((err) => {
    if (err) {
        console.log('error: ', err)
        return ;
    } else {
        console.log("success")
    }
})

module.exports = connection;

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