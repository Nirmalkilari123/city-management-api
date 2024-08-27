const mongoose=require('mongoose');


const citySchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true,
    },
    population:{
        type:Number,
        require:true,
    },
    country:{
        type:String,
        require:true,
    },
    latitude:{
        type:Number,
        require:true,
    },
    longitude:{
        type:Number,
        require:true,
    },

});

const city=mongoose.model('city',citySchema);

module.exports=city;