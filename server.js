const express=require('express');
const dotenv=require('dotenv');
const connectDB=require('./config/db')
const cityRoutes=require('./routes/cityRoutes')

dotenv.config();
connectDB()

const app= express();
app.use(express.json());

app.use('/api',cityRoutes);

const PORT=process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
