const express=require('express');
const path=require('path');
const fs=require('fs');
const router=express.Router();

router.get('/restaurants',function(req,res){
    const filePath=path.join(__dirname,'..','data','restaurants.json');

    const fileData=fs.readFileSync(filePath);
    const storedRestaurants=JSON.parse(fileData);

    let order=req.query.order;
    let nextOrder='desc';

    if(order !== 'asc' && order !== 'desc'){
        order='asc';
    }

    if(order === 'desc'){
        nextOrder='asc';
    }

    storedRestaurants.sort(function(resA,resB) {
        if(order =='asc' && resA.name > resB.name){
            return 1;
        } else if(order =='desc' && resB.name > resA.name){
            return 1;
        }
        return -1;
    });

   res.render('Restaurants',{ numberOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants,nextOrder:nextOrder});
});

router.get('/restaurants/:id',function(req,res){
    const restaurantId=req.params.id;

    const filePath=path.join(__dirname,'..','data','restaurants.json');

    const fileData=fs.readFileSync(filePath);
    const storedRestaurants=JSON.parse(fileData);
    
    for( const restaurant of storedRestaurants){
        if(restaurant.id==restaurantId){
            return res.render('restaurant-details',{restaurant/*for name*/: restaurant /*for loop*/});
        }
    }
   res.status(404).render('404');
});

router.get('/recommend',function(req,res){
    res.render('Recomended')
});

router.post('/recommend',function(req,res){
    const restaurant=req.body;
    restaurant.id=uuid.v4();
    
    const filePath=path.join(__dirname,'data','restaurants.json');

    const fileData=fs.readFileSync(filePath);
    const storedRestaurants=JSON.parse(fileData);

    storedRestaurants.push(restaurant);

    fs.writeFileSync(filePath,JSON.stringify(storedRestaurants));

    res.redirect('/confirm');
});

router.get('/confirm',function(req,res){
    res.render('confirm');
});

module.exports=router;