const db = require("../Database/database")

const connection = db.createNewConnection()

function getUserByID(id) {
    var output 
    connection.query('select * from users where id=?', [id], (err, result) => {
        if (err) throw err;
        output = result[0]
        console.log(output)
    })
    return(output)
}

module.exports = getUserByID()