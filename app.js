
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

app.use(bodyParser());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
// mongoose.connect("mongodb://localhost/data");
mongoose.connect("mongodb://bharat:qaz123@ds259207.mlab.com:59207/test-db");


// SCHEMA SETUP
var dataSchema = new mongoose.Schema({
    order_id: String,
    email: String,
    number: String
 });

var Data = mongoose.model("Data", dataSchema);

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/data", function(req, res){
    Data.find({}, function(err, allOrders){
        if(err){
            console.log(err);
        } else {
           res.render("index",{data:allOrders});
        }
     });
 
});

app.post("/data", function(req, res){
    var order_id = req.body.id;
    var email = req.body.customer.email;
    var number = req.body.customer.phone;
    var newOrder = {order_id: order_id, email: email, number: number}
    Data.create(newOrder, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/data");
        }
    });
});

app.get("/data/:id", function(req, res){
    Data.findById(req.params.id, function(err, foundOrder){
        if(err){
            console.log(err);
        } else {
            res.render("show", {data: foundOrder});
        }
    });
});

app.put("/data/:id", function(req, res) {
    Data.findByIdAndUpdate(req.params.id, req.body.data, function(err, updatedOrder) {
        if(err) {
            res.redirect("/data");
        }
        else {
            res.redirect("/data");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Tweet Server Has Started!");
 });
// app.listen(3000, function(){
//     console.log("The Tweet Server Has Started!");
//  });