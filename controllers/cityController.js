const City=require('../models/cityModel');


//Add City

const addCity=async(req,res)=>{
    try{
        const{name,population,country,latitude,longitude}=req.body;
        const city=new City({name,population,country,latitude,longitude});
        await city.save();
        res.status(201).json({message:'City added successfully',city});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

//Update City

const updateCity=async(req,res)=>{
    try{
    const {id}=req.params
    const city= await City.findByIdAndUpdate(id,req.body,{new:true});
    if(!city) return res.status(404).json({message:'City not found'});
        res.json({message:'City Updated successfully',city});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

//Delete City

const deleteCity=async(req,res)=>{
    try{
        const{id}=req.params;
        const city=await City.findByIdAndDelete(id);

      if(!city) {
        return res.status(404).json({message:'City not found'});
      }
        res.json({message:'City Deleted successfully',city});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};


//Get Cities with Pagination, Filtering, Sorting, Searching, Projection


const getCities=async(req,res)=>{
    try{
        const{page=1,limit=10,sort,filter,search,projection}=req.query;

        const query={};
        if(filter){
            const filters=JSON.parse(filter);
            for(const key in filters){
                query[key]=filters[key];
            }
        }
        if(search){
            query.name={$regex:search, $options:'i'};
        }

        const cities=await City.find(query)
        .select(projection ? projection.split(',').join(''):'')
        .sort(sort ? JSON.parse(sort):{})
        .skip((page-1)*limit)
        .limit(parseInt(limit));

        res.json(cities);
    } catch(err){
        res.status(500).json({message:err.message})
    }
};

module.exports={
    addCity,
    updateCity,
    deleteCity,
    getCities
};