const express = require("express");
const router = new express.Router();
let items = require('./fakeDb');
const ExpressError = require("./expressError");
const app = require("./app");



router.get("/", (req, res) =>{

    return res.json({items})
})

router.post("/", (req, res) => {
    console.log(req.body);
    const newItem = {name: req.body.name, price: req.body.price};
   
    items.push(newItem);
    res.status(201).json({added: newItem});
}); 

router.get('/:name', (req, res) => {
    let item = items.find( item => 
        item.name === req.params.name 
    )

    if (item === undefined) {
        throw new ExpressError("Item does not exist", 404);
    }
    return res.json({item})
});

router.patch('/:name', (req, res) => {
    let item = items.find( item => 
        item.name === req.params.name 
    ) 
    if (item === undefined) {
        throw new ExpressError("Item does not exist", 404);
    }

    
    if (req.body.name != undefined) item.name = req.body.name; 
    if (req.body.price != undefined) item.price = req.body.price;

    return res.json({updated: item})
});

router.delete('/:name', (req, res) => {
    let item = items.findIndex( item => 
        item.name === req.params.name 
    ) 
    if (item === -1) {
        throw new ExpressError("Item does not exist", 404);
    }

    items.splice(item, 1);
    return res.json({message: "Deleted"})
})
module.exports = router;