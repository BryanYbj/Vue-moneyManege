let mysql = require('mysql');
class BaseSql{
    constructor(){
        this.connection = mysql.createConnection({
            host:'localhost',
            port:'3306',
            user:'root',
            password:'123456',
            database:'monmanage'

        });
        this.connection.connect();
    }
}
module.exports = BaseSql;