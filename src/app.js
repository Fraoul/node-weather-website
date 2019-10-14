const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')

const app = express()
const port = process.env.PORT  || 3000

//  define path for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)


// setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render("index",{
        title:'Weather ',
        name:'Fraoul'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About",
    })  
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Fraoul'
    })
})


app.get('/weather',(req,res)=>{ 
    if(!req.query.address){
        return res.send({
            ERROR:'No Address entered'
        })
    } 
    
    geocode(req.query.address,(error,{latitude,longitude,Location}={})=>{  
        if (error ){
        return res.send({error})
    }

    forecast(latitude, longitude , (error, forecastdata) => {
       if(error){
           return res.send({error})
       }

    res.send({forecast:forecastdata,
       location:Location,
       address:req.query.address
                  })
        
            })
        })
})


app.get("/product",(req,res)=>{
    if(!req.query.search){
        res.send({
            error:'enter search adress'
        })

    }
    console.log(req.query)
    
    res.send({
        products:[]
    })

    
})




app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Fraoul',
        errormsg:'Help article not found'        
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Fraoul',
        errormsg:'page not found'
    })
})


app.listen(port ,()=>{
    console.log('listing on Port ' + port)

})