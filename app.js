
// 1- Ref --> MongoDB Module
let mongodb=require('mongodb');
let express=require('express');
let bodyParser=require('body-parser');
// 2- get client from the ref
let mongodbClient=mongodb.MongoClient;

let app=express();

app.use(bodyParser.urlencoded({extended:false}));

// 3- get access to db from the client
let url="mongodb://localhost:27017/";
let viewsPath=__dirname+"/views/";
let db=null;
let col=null;

mongodbClient.connect(url,{useNewUrlParser: true,useUnifiedTopology: 
    true},function(err,client){

db=client.db('week5lec');
col=db.collection('customers'); 
// 
});

app.post('/newCustomer',function(req,res){

     col.insertOne(req.body);


});

// select * from custimers ;

app.get('/getall',function(req,res){
    col.find({}).toArray(function(err,data){

        res.render('f',{users:data});

        res.send(data);        
    });
});

// // age == 25
// query={age:{$eq:25}}

// // age <=40
// query={age:{$lte:40}}

// // 1<=age<40
// query={$and:[{age:{$gte:1}},{age:{$lt:40}}]}


// // delete from customers where name='Tim';

// let query={};

// col.updateMany(query, { $mul: {salary: 1.5 } }, { upsert: false }, function (err, result) {
// });

app.get('/getallT',function(req,res){
    let query={fullName:'^T'}
    col.find(query).toArray(function(err,data){
        res.send(data);        
    });
});

app.listen(8080);



