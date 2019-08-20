
let BaseSql = require('./BaseSql');
class FundModel extends BaseSql {
    constructor() {
        super();
    }

    SelectInfo(id, callback) {
        let sql = 'select * from fundmanage where user_id=' + id;
        this.connection.query(sql, function (err, result) {
            if (err) {
                console.log(err.message)
            }
            callback(result);
        })
    }

    UpdateFund(id, type, describe, income, expend, cash, remark, callback) {
        let sql = "UPDATE   fundmanage SET TYPE= ?,DESCRIBE1= ? ,income= ? ,expend= ? ,cash= ? ,remark= ? WHERE  id=(SELECT MAX(n.id) FROM (SELECT  f.id FROM fundmanage AS f WHERE user_id='10000' LIMIT " + id + ") AS n)";
        let params = [type, describe, income, expend, cash, remark];
        this.connection.query(sql, params, function (err, result) {
            if (err) {
                console.log(err.message);
            }
            callback(result);
        })

    }

    InsertFund(type, describe, income, expend, cash, remark, callback) {
        // let currentTime = new Date();
        // let formatTime = currentTime.format()
        // currentTime = JSON.stringify(currentTime);
        // console.log(income);
        // console.log(typeof income);
        //获取格式化的时间
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();

        let sql = "INSERT INTO  fundmanage   VALUES (?,?,?,?,?,?,?,?,?)";
        let params = [type, describe, income, expend, cash, remark, '10000', currentdate, 0];
        this.connection.query(sql, params, function (err, result) {
            if (err) {
                console.log(err.message)
            }
            callback(result);
        })
    }

    Deletedata(id, callback) {
        let sql = "delete from fundmanage WHERE  id=(SELECT MAX(n.id) FROM (SELECT  f.id FROM fundmanage AS f WHERE user_id='10000' LIMIT " + id + ") AS n)";

        this.connection.query(sql, function (err, result) {
            if (err) {
                console.log(err.message);
            }
            callback(result);
        })

    }
}

module.exports = FundModel;