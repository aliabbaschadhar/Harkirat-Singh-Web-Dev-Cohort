const express = require("express");
const app = express();

const users = [
    {
        name:"John",
        kidneys:[
            {healthy:false},
            {healthy:true},
        ],
    }
]

app.use(express.json()) ; // for middlewares

app.get('/',(req,res)=>{
    const numOfKidneys = users[0].kidneys.length;
    const numOfHealthyKidneys = users[0].kidneys.filter((kidney)=>kidney.healthy===true).length
    const numofUnhealthy = numOfKidneys-numOfHealthyKidneys;
    res.json({numOfKidneys,numOfHealthyKidneys,numofUnhealthy})
})

app.post('/',(req,res)=>{
    //to be able to parse data on the server 
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy:isHealthy,
    })

    res.json({
        msg : "success",
    })
})

//Make the all kidneys healthy --update
app.put("/",(req,res)=>{
    if(healthyKidneys()){
        res.status(403).json({
            msg: "All kidneys are healthy"
        })
    }else{
        users[0].kidneys.forEach((kidney)=>(kidney.healthy=true));
        //if we don't send back the response the postmap will never know that the execution is done or not
        res.json({});
    }
});

//remove the all unhealthy kidneys--delete
// DELETE endpoint to remove unhealthy kidneys
app.delete('/',(req,res)=>{
    // Check if there are any unhealthy kidneys
    if(isThereanyUnhealthyKidney()){
        // Filter out unhealthy kidneys
        users[0].kidneys = users[0].kidneys.filter((kidney)=>kidney.healthy===true);
        // Send success response
        res.json({msg:"Success"})
    }else{
        // Return error response if no unhealthy kidneys exist
        res.status(411).json({
            msg:"You have no bad kidneys"
        })
    }
})

// Helper function to check if there are any unhealthy kidneys
function isThereanyUnhealthyKidney(){
    let atleast = false;
    users[0].kidneys.forEach((kidney)=>{
        if(!kidney.healthy){
            atleast =true;
        }
    })
    return atleast;
}
// Helper function to check if all kidneys are healthy
function healthyKidneys(){
    let allHealthy = true;
    users[0].kidneys.forEach((kidney)=>{
        if(!kidney.healthy){
            allHealthy = false;
        }
    })
    return allHealthy;
}
// Start the server on port 3001
app.listen(3001, () => {
    console.log("Listening on port 3001");
})
