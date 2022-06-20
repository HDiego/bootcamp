const { query } = require('express');
const express = require('express');
const mongo = require('mongodb');
const app = express();

var url = `mongodb://localhost:27017/`;
var MongoClient = mongo.MongoClient;

app.set('port', 3000);
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
    MongoClient.connect(url, function (err, db){
        var dbo = db.db("bootcamp");
        
        if(req.query.hasOwnProperty("name")){
            dbo.collection('bootcamp_prueba').find({name: req.query.name}).toArray(function(err, result) {
                if (err) throw err;
                res.json(result);
                db.close();
              });
        }
        else {
            dbo.collection('bootcamp_prueba').find({}).toArray(function(err, result) {
                if (err) throw err;
                res.json(result);
                db.close();
              });
        }
    })
});

app.put('/', (req, res) => {
    MongoClient.connect(url, function (err, db){
        var dbo = db.db("bootcamp");
        dbo.collection('bootcamp_prueba').count({name: req.body.name}, (err, counter) => {
            if(counter > 0) {
                dbo.collection('bootcamp_prueba').updateOne(
                    {"name": req.body.name},
                    {
                        $set: {"position": req.body.position}
                    }
                )
                res.sendStatus(200);
            }
            else {
                var myobj = { name: req.body.name, position: req.body.position};    
            dbo.collection("bootcamp_prueba").insertOne(myobj, function(err, result){
                res.sendStatus(201);
                db.close();
            });
            }
        })
    })
});

app.delete('/', (req, res) => {
    MongoClient.connect(url, function (err, db){
        var dbo = db.db("bootcamp");
        dbo.collection('bootcamp_prueba').count({name: req.body.name}, (err, counter) => {
            if(counter > 0) {
                console.log("Borrando");
                dbo.collection("bootcamp_prueba").deleteOne(
                    {"name": req.body.name}
                )
                res.sendStatus(200);
            }
            else {
                res.sendStatus(204);
            };
        })
    })
});

app.listen(app.get('port'), () => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("bootcamp");
        dbo.collection('bootcamp_prueba').count({}, (err, counter) => {
            if(counter > 0) {
                dbo.collection("bootcamp_prueba").insertOne({ name: "Luis Suarez", message: "Forward"}, function(err, res) {
                    if (err) throw err;
                });
                dbo.collection("bootcamp_prueba").insertOne({ name: "Fernando Muslera", message: "Goalkeeper"}, function(err, res) {
                    if (err) throw err;
                });
                dbo.collection("bootcamp_prueba").insertOne({ name: "Federico Valverde", message: "Midfield"}, function(err, res) {
                    if (err) throw err;
                });
                dbo.collection("bootcamp_prueba").insertOne({ name: "Sebastian Coates", message: "Defense"}, function(err, res) {
                    if (err) throw err;
                });
            }
        });
    });
});
