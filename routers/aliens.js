const express = require('express');
const { route } = require('express/lib/application');
const res = require('express/lib/response');
const { findById } = require('../models/alien');
const router = express.Router();
const Alien = require('../models/alien');

// to read all data from data from database
router.get('/', async(req,res)=>{
    try{
        const aliens = await Alien.find();
        res.json(aliens);
    }catch(err){
        res.send('Error: ' + err)
    }
    
    console.log('get request for all alien');
});

// to read 1 data from database
router.get('/:id', async(req,res)=>{
    try{
        const alien = await Alien.findById(req.params.id);
        res.json(alien);
    }catch(err){
        res.send('Error: ' + err)
    }
    
    console.log('get request for ONE alien');
});

// for add the data in database
router.post('/', async(req,res)=>{
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })
    console.log('post request...')
    try{
        const a1 = await alien.save()
        res.json(a1);
    }catch(err){
        res.send('Error: ' + err);
    }
})

// for update data from the database
router.patch('/:id', async(req,res)=>{
    try{
        const alien = await Alien.findById(req.params.id);
        // alien.name = req.body.name;
        // alien.tech = req.body.tech;
        alien.sub = req.body.sub;

        const a1 = await alien.save();
        res.json(a1);
    }catch(err){
        console.log("Error: " + err)
    }

    console.log('get patch request to update data!');
});

// for delete the item from database
router.delete('/:id', async(req,res)=>{
    try{
        const alien = await Alien.findById(req.params.id);
        const a1 = await alien.remove();
        res.json(a1);
    }catch(err){
        console.log('Error: ' + err);
    }
    console.log('req for delete an item from data base..');
})

module.exports = router;