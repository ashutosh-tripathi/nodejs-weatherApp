const request =require('request')


const forecast=({longitude,lattitude},callback)=>{
    const url='http://api.weatherstack.com/current?access_key=0e8ba48df94b4223a38b061d9c85bb16&query='+longitude+','+lattitude+'&units=f'
request({url:url,json:true},(error,response,body)=>{
    if(error==null)
    callback(null,body)
        else
    callback(error,null)
})
}

module.exports={forecast}