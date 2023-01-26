const express = require("express");
const app = express();
const bodyParser = require("body-parser")
request = require("request")
http = require("https")
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


/* Post from webpages starts here */
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


   /* Post to Blockchain server*/
    const url = ""
    const options= {method: "POST"}
    const request = http.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end;
    /* Post to Blockchain server ends here */
    
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
    // const data = {productname: productName, productid: productId};
    // var jsonData = JSON.stringify(data);

    // /* Post to Blockchain server*/
    // const url = ""
    // const options= {method: "POST"}
    // const request = http.request(url, options, function(response){
    //     response.on("data", function(data){
    //         console.log(JSON.parse(data));
    //     })

    // })
    // request.write(jsonData);
    // request.end;
    // /* Post to Blockchain server ends here */

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
    
    // /* Post to Blockchain server*/
    // const data = {productname: productName, productid: productId};
    // var jsonData = JSON.stringify(data);
    // const url = ""
    // const options= {method: "POST"}
    // const request = http.request(url, options, function(response){
    //     response.on("data", function(data){
    //         console.log(JSON.parse(data));
    //     })

    res.sendFile(__dirname + "/deliveryConfirmed.html")})
    // request.write(jsonData);
    // request.end;
    /* Post to Blockchain server ends here */
    ;
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