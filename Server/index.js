const  express = require('express');

//引入body-parser
const bodyParser = require("body-parser");
const app = express();

//引入users.js
const users = require('./Router/api/users');
const profile = require('./Router/api/profiles');

//使用body-parser中间件
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//使用routes
app.use('/api/users',users);
app.use('/api/profile',profile)
//对应的端口,本地服务就为8000
//const port = process.env.PORT || 8000;





app.listen(8000,()=>{
    console.log('Server running on port ${port}')
})