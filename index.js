// const { request, response } = require('express')

const express= require('express')
const request= require('request')
//Syntax of Express
const app= express()
const dotenv=require('dotenv')
dotenv.config()

/*
Middlewares{
    Ask express.js to look for a folder named views
}
*/
app.set("view engine", "ejs")
app.use("/public",express.static('public'))

//Paths
app.get("/",(req,res)=>{
    res.render("homepage")
})
app.get("/result/:id",(req,res)=>{
    const url= `http://www.omdbapi.com/?apikey=ec4b686e&i=${req.params.id}`
    request(url,function(error,response,body){
        if(!error && response.statusCode==200){
            const data= JSON.parse(body)
            // res.render("quickView",{"movieData":data})
            // console.log(data)
            res.render("quickView",{"movieData":data})
        }
        else{
            res.send("Ugh Fuck Off!")
        }
    })
})
app.get("/result",(req,res)=>{
    // console.log(process.env.API_KEY)
    const url= `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.movieName}`
    request(url,function(error,response,body){
        if(!error && response.statusCode==200){
            //Parsing JSON into JS object
            const data= JSON.parse(body)
            // res.send(data)
            // console.log(data)
            res.render("result",{"movieData":data})
        }
        else{
            res.send("Uh oh Error")
        }
    })
})
app.get("/about",(req,res)=>{
    res.render("about")
})
app.get("/contact",(req,res)=>{
    res.render("contact")
})

app.get("*",(request,response)=>{
    response.send("Uhh There was some error")
})

//Creating a server at port 3000
app.listen(process.env.PORT,()=>{
    console.log(`Server has started at port ${process.env.PORT}`)
})
//Random checks
// app.get("/getmovies",(req,res)=>{
//     const url= " http://www.omdbapi.com/?apikey=3af8b4a2&s=Avengers"
//     request(url,function(error,response,body){
//         if(!error && response.statusCode==200){
//             //Parsing JSON into JS object
//             const data= JSON.parse(body)
//             // res.send(data)
//             res.render("homepage",{movie:data})
//         }
//         else{
//             res.send("Uh oh Error")
//         }
//     })
// })

// app.get("/class",(request,response)=>{
//     response.send("You are in class")
// })
// app.get("/class/:name",(request,response)=>{
//     console.log(request.params)
//     response.send(`You are in ${request.params.name} class!`)
// })
