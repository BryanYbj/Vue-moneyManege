let express = require('express');
//安装加密算法npm install bcrypt
//引入jsonwebtoken
const jwt = require('jsonwebtoken');
let router = express.Router();
//$router GET api/users/test
//@desc 返回的请求的json数据
//@access public
router.get('/test',(req,res)=>{
    console.log(req.query.key);
    res.json({msg:'login works'});
})

//使用post 必须要使用 body-parser;
router.post('/register',(req,res)=>{
    console.log(req.body);
    res.json('ok');
})


router.post('/login',(req,res)=>{
    console.log(req.body);
    //jwt.sign('规则','加密名字',{expiresIn:过期时间},(err,token)箭头函数)
    const rule = {email:req.body.email,pwd:req.body.password};
    jwt.sign(rule,'secret',{expiresIn:10},(err,token)=>{
        if(err) {throw err;}
        res.json({
            success:true,
            token:'mrwu'+token

        });
    })
   
})
module.exports = router;