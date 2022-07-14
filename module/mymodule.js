//ให้บริการเกี่ยวกับการทำงานต่างๆในโปรเจค

function getcurrentTime() {
    return new Date()
}

function add(x, y) {
    return x+y
}

//ส่งออกไปใช้
module.exports.getcurrentTime = getcurrentTime
module.exports.add = add