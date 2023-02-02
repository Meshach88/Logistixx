const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/db', { useNewUrlParser: true });
mongoose.set('strictQuery', true);
request = require("request");
http = require("https");

app.use(bodyParser.urlencoded({extended: true}));


/*Getting webpages */
app.use(express.static("assets"));

app.get('/index.html', function(req,res){res.sendFile(__dirname + "/index.html")
    
});
app.get('/order.html', function(req,res){res.sendFile(__dirname + "/order.html")
    
});
app.get('/cancelorder.html', function(req,res){res.sendFile(__dirname + "/cancelorder.html")
    
});
app.get('/delivery.html', function(req,res){res.sendFile(__dirname + "/delivery.html")
    
});
app.get('/contact.html', function(req,res){res.sendFile(__dirname + "/contact.html")
    
});
app.get('/login.html', function(req,res){res.sendFile(__dirname + "/login.html") 
});
app.get('/register.html', function(req,res){res.sendFile(__dirname + "/register.html")
    
});
app.get('/delivery.html', function(req,res){res.sendFile(__dirname + "/delivery.html")
    
});
/* Getting webpages ends here */
 
//Creating MongoDB collection (Users)
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String  
})
const user = mongoose.model("user", userSchema)

/* Post from webpages starts here */
app.post('/register', function(req, res){
    var namee = req.body.name;
    var emaill = req.body.email ;
    var passwordd = req.body.password; 
    var confirmPassword = req.body.confirmpassword;
   
    
    user.findOne({ 'email': emaill }, function (err, users) {
        if (users === null) {const userReg = new user({name: namee, email: emaill, password:passwordd})
        userReg.save(); 
        res.sendFile(__dirname + "/registered.html")}

        else {res.sendFile(__dirname + "/userexist.html")};
    })});
            
           

app.post('/login.html', function(req, res){
    var emaill = req.body.email ;
    var passwordd = req.body.password; 

      
    user.findOne({'password': passwordd, "email": emaill}, function (err, users) {
        if (users === null) {res.sendFile(__dirname + "/failedlogin.html")}
    
        else {res.redirect("/index.html")};})})

    

app.post('/order', function(req, res){
    var namee = req.body.name;
    var emaill = req.body.email ;
    var productName = req.body.productnamee;
    var phonee = req.body.phone; 
    var productId = req.body.productid;
    var quantityy = req.body.quantity;
    var shippingAd = req.body.shipping;
    console.log(namee, emaill, productName, productId, phonee, quantityy, shippingAd);

    const data = {productname: productName, productid: productId, quantities: quantityy};
    var jsonData = JSON.stringify(data);


    res.sendFile(__dirname + "/orderRecieved.html"); 
});

app.post('/cancelorder', function(req, res){
    var namee = req.body.name;
    var emaill = req.body.email;
    var productName = req.body.productnamee;
    var phonee = req.body.phone; 
    var productId = req.body.productid;
    var transactionID = req.body.transactionid; 
    console.log(namee, emaill, productName, productId, phonee, transactionID);
    

    res.sendFile(__dirname + "/cancelorderrecieved.html")
    

});


app.post('/delivery', function(req, res){
    var namee = req.body.name;
    var emaill = req.body.email ;
    var productName = req.body.productnamee;
    var phonee = req.body.phone; 
    var productId = req.body.productid;
    var transactionID = req.body.transactionid; 
    console.log(namee, emaill, productName, productId, phonee, transactionID);
    
    res.sendFile(__dirname + "/deliveryConfirmed.html")});

app.post('/contact', function(req, res){
    var namee = req.body.name;
    var emaill = req.body.email ;
    var phonee = req.body.phone; 
    var messagee = req.body.message;
    var subjectt= req.body.subject;
    console.log(namee, emaill, phonee, messagee, subjectt);

    res.sendFile(__dirname + "/contact.html")

});

/* Post from webpages ends here */

app.listen(3000, function(){console.log("Server is running on port 3000")});
