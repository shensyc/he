const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.header('Acccess-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if(req.method.toLowerCase()==='options'){
        return res.end();
    }
    next();
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1')
    // if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    // else  next();
});

app.use(bodyParser.json());

const secret = 'zfjp';
app.get('/test',(req,res)=>{
    res.send({test:'test'});
});
//登陆接口
app.post('/login',(req,res)=>{
    const {username} = req.body;
    if(username==='admin'){//如果访问的是admin，种植cookie
        res.json({
            code:0,
            username:'admin',
            token:jwt.sign({username:'admin'},secret,{expiresIn:20})
        });
    }else{
        res.json({
            code:1,
            data:'用户不存在'
        })
    }
});
//验证接口
app.get('/validate',(req,res)=>{
    const token = req.headers.authorization;
    jwt.verify(token,secret,(err,decode)=>{//验证token的可靠性
        if(err){
            return res.json({
                code:1,
                data:"token失效了"
            })
        }
        res.json({
            username:decode.username,
            code:0,
            token:jwt.sign({username:'admin'},secret,{expiresIn:20})
        })
    })
})


app.listen(4000);