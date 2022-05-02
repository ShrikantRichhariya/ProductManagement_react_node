const express = require("express");
const cors = require("cors");
require("./database/config");
const User = require('./database/users');
const Product = require("./database/products")
const Jwt = require('jsonwebtoken');
const jwtKey = 'pro-Manager';
const app = express();

app.use(express.json());
app.use(cors());

//Search api
app.get("/search/:key", async (req, resp) => {
    let result = await Product.find({
        "$or": [
            {
                name: { $regex: req.params.key }  
            },
            {
                price: { $regex: req.params.key }
            },
            {
                vendor: { $regex: req.params.key }
            }
        ]
    });
    resp.send(result);
})

//login api

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({user}, jwtKey, {expiresIn:"5h"},(err,token)=>{
                if(err){
                    resp.send("Something went wrong")  
                }
                resp.send({user,auth:token})
            })
        } else {
            resp.send({ result: "user not found" })
        }
    } else {
        resp.send({ result: "user not found" })
    }
});

//register api
app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({result}, jwtKey, {expiresIn:"5h"},(err,token)=>{
        if(err){
            resp.send("Oops something went wrong")  
        }
        resp.send({result,auth:token})
    })
})
//add product api
app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get("/products", async (req, resp) => {
    const products = await Product.find();
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "No Product found" })
    }
});

//delete product api
app.delete("/product/:id", async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result)
}),

    app.get("/product/:id", async (req, resp) => {
        let result = await Product.findOne({ _id: req.params.id })
        if (result) {
            resp.send(result)
        } else {
            resp.send({ "result": "No Record Found." })
        }
    })

app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});

app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});



app.listen(5000);