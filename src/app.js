const express=require('express')
const forecast=require('./utils/forecast.js')
const geocode=require('./utils/geocode')
const app=express()
const path=require('path')
const hbs=require('hbs')
const bodyParser = require("body-parser");

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname,'../public'))     
                                     
const port=process.env.PORT || 3000
// 
const partialPaths=path.join(__dirname, '../templates/partials')

app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine','hbs')
app.set('views',path.join(__dirname, '../templates/views'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
hbs.registerPartials(partialPaths)



app.get(['','/index'],(req,resp)=>{
    resp.render('index',{title:'index',name:'ashu'},(err,html)=>
    {if(err!=null)
        resp.status('500').send('Error encountered')
     else
        resp.send(html)   


    })
})
app.get('/about',(req,resp)=>{
    resp.render('about',{title:'about',name:'ashu'})
})

app.get('/help',(req,resp)=>{
    resp.render('help',{title:'help',name:'ashu'})
})






app.get('/weather',(req,resp)=>{
    if(!req.query.address)
    return resp.send({error:'Please pass valid address'})
    else
    {
        console.log(req.query)
        finalresposne(req.query.address,(data)=>{console.log(data)
            return resp.send({address:req.query.address,weather:data})});
    
    
}

    })
    

app.get('/products',(req,resp)=>{
    if(!req.query.search)
    resp.send('Error you must provide search term')
    else
    {
    console.log(req.query," ",req.query.search)
    resp.send({
        products:[]
    })
}
})
app.post('/handle',(req,resp)=>{
    console.log(req.body)
    resp.send(req.body)
})

app.get('*',(req, res, next) => {
    res.status(404).render('error',{title:'Error 404'})
   })

app.listen(port,()=>{
    console.log('server started on 3000')
})


const finalresposne=(address,callback)=>
{
geocode.geocode(address,(error,data)=>{
    if(error==null)
    {
    console.log(data)
    forecast.forecast(data,(error,body)=>{
        // console.log(body.current.weather_descriptions[0],". It is currently",body.current.temperature,"but it f
       const forecast=""
        const finalData={
            address:address,
            coordinates:data,
            forecast:body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" but it feels  like "+body.current.feelslike+" degrees out"
        }
        // console.log("forecast data"+finalData)
        callback(finalData)
    })


    }
    else
    console.log(error)
})
}