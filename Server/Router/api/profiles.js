let express = require('express');

let router = express.Router();
let FundModel = require('../../DAO/FundModel');
let fundmodel = new FundModel();

router.get('/',function(req,res){
    let user_id = '10000'
    fundmodel.SelectInfo(user_id,function(result){
        res.json(result)
    })
    
})

router.get('/delete',function(req,res){

    let id = req.query.id;
    console.log(id);
    fundmodel.Deletedata(id,function(result){
        console.log(result);
        res.json(result);
    })


})

router.post('/edit',function(req,res){
    let type= req.body.type;
    let describe = req.body.describe;
    let income= req.body.income;
    
    let expend = req.body.expend;
    let cash= req.body.cash;
    let remark = req.body.remark;
    let id = req.body.id;
    console.log(id);
    console.log(req.body);
    
    
    fundmodel.UpdateFund(id,type,describe,income,expend,cash,remark,function(result){
        console.log(result);
        res.json(result);
    })
})


router.post('/add',function(req,res){
    let type= req.body.type;
    let describe = req.body.describe;
    let income= req.body.income;
    
    let expend = req.body.expend;
    let cash= req.body.cash;
    let remark = req.body.remark;
    
    console.log(req.body);
    console.log(income);
    
    fundmodel.InsertFund(type,describe,income,expend,cash,remark,function(result){
       
        res.json('ok');
    })
})



module.exports = router;