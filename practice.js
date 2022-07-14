/*
console.log("start")
setTimeout(() => {
    console.log("download....")
}, 3000)
console.log("End")          //output: start --> End --> download... (Asynchrnous)
*/

//Callback = ถูกเรียกใช้เมื่ออีกฟังก์ชันทำงานเสร็จ

//---------ทบทวนการทำงานแบบ Callback-------------
/*
function calculate(x, y, callback) {
    setTimeout(() => {
        console.log("process...")
        const sum = x+y 
        callback(sum)
    }, 3000)
}
function display(result) {
    console.log(`ผลบวก = ${result}`)
}

const sum = calculate(100, 50, display)     //make display generate after calculate
const sum2 = calculate(100, 50, function(result) {
    console.log(`ผลบวกแบบใหม่ = ${result}`)
})
*/
//----------เขียนโปรแกรมดาวน์โหลดไฟล์----------
/*
const url1 = "kong.dev/file1.json"
const url2 = "kong.dev/file2.json"
const url3 = "kong.dev/file3.json"
function download(url, callback) {
    setTimeout(() => {
        console.log(`download.... ${url}`)
        callback()
    }, 3000)
}

function complete() {
    console.log("success!")
}
//download(url1, complete)

download(url1, function(result) {           //Callback Hell (ซ้อนกันเยอะเกินจนงง จึงมีการแก้ด้วยการ Promise)
    console.log("success!!!!!!")
    download(url2, function(result) {
        console.log("success!!!!!!")
        download(url3, function(result) {
            console.log("success!!!!!!")  
        })
    })
})
*/
//------------------------------------

//Promise = สัญญาว่าถ้าทำตัวนี้เสร็จ จะให้เกิดอะไรตามมา
/*
การสร้าง : 
Promise(function(resolve, reject) {         //function(resolve, reject) = callback function

})

CallBack Function - ใช้กำหนดการกระทำบางอย่าง
การทำงานใน Promise มี 3 สถานะ คือ 
1.pending = สถานะเริ่มต้น ถ้าสำเร็จจะเป็น resolve, ล้มเหลวจะเป็น reject
2.resolve/fulfilled = Parameter ของ Callback ใช้กำนดสถานะหากทำสำเร็จ
3.reject = Parameter ของ Callback ใช้กำนดสถานะหากล้มเหลว

ระหว่างที่ตรวจสอบสถานะของ Promise ว่าเป็น resolve หรือ reject สามารถกำหนดโดยอาศัย then(), catch(), finally()
then() --> ทำงานกับ resolve เมื่อ Promise ทำงานสำเร็จ
catch() --> ทำงานกับ reject เมื่อ Promise ทำงานผิดพลาด
finally() --> ไม่ว่าสถานะจะเป็นอะไร ทำส่วนนี้ได้เลย
*/

/*
const connect = true 
const url1 = "kong.dev/file1.json"
const url2 = "kong.dev/file2.json"
const url3 = "kong.dev/file3.json"
const url4 = "kong.dev/file4.json"
const url5 = "kong.dev/file5.json"

function downloading(url) {
    return new Promise(function(resolve, reject){
        console.log("Loading....")
        setTimeout(() => {
            if (connect) {
                resolve(`โหลด ${url} เรียบร้อย`)
            } else {
                reject("ผิดพลาด")
            }
        }, 1000)
    })
}
*/
/*
downloading(url1).then(result=>{
    console.log(result)
}).catch(err=>{
    console.log(err)
}).finally(()=>{
    console.log("Finish")
})
*/
/*
downloading(url1).then(function(result) {
    console.log(result)
    return downloading(url2)
}).then(function(result) {
    console.log(result)
    return downloading(url3)
}).then(function(result) {
    console.log(result)
    return downloading(url4)
}).then(function(result) {
    console.log(result)
    return downloading(url5)
}).then(function(result) {
    console.log(result)
})
*/
//Async = ระบุว่าจะทำงานแบบ Asynchronous
//Await = รอให้ทำให้เสร็จก่อน
/*
async function start() {
    console.log(await downloading(url1))
    console.log(await downloading(url2))
    console.log(await downloading(url3))
    console.log(await downloading(url4))
    console.log(await downloading(url5))
}

start()
*/
//api ภาพสินค้า (backend) --> แสดงภาพในเว็บ (frontend)
//api (promise) --> (pending) --> รอข้อมูลมาครบ (await) ---> แสดงภาพ
//--------------------------------------------------------------------

//--------Module = ไฟล์ที่จัดเก็บโค้ดของ js เพื่อนำไปใช้งานในส่วนต่างๆ----------
/*
const util = require('./module/mymodule.js')
const now = require('./module/mymodule.js').getcurrentTime

console.log(now())
console.log(util.add(5,10))
*/

//-------Module การอ่านและเขียนไฟล์ (module fs)-------
//---------------Blocking---------------
/*
const fs = require('fs')

//อ่านไฟล์ input.txt
const data = fs.readFileSync('myfile/input.txt', 'utf-8')
console.log(data)
console.log("success in READ")

//เขียนไฟล์
const output = `Hello World\n${data}\nถูกเขียนเมื่อ ${new Date()}`
fs.writeFileSync("myfile/output.txt", output)
console.log("success in WRITE")
*/

//---------------Non-blocking (Asynchronous)---------------
const fs = require('fs')

fs.readFile("myfile/input.txt", "utf-8", (err, data) => {
    if (err) return console.log("เกิดข้อผิดพลาด ", err)
    console.log(data);          //data = storing value that read from file
    const output = `Hello World Asyn\n${data}\nถูกเขียนเมื่อ ${new Date()}`
    fs.writeFile("myfile/output2.txt", output, err => {
        if(err) return console.log("เกิดข้อผิดพลาด", err)
        console.log("เขียนแล้ว")
    })
})
console.log("จบการทำงาน")      //<---- พิมพ์ก่อน

//Using 'npx nodemon index.js' to avoid restart server