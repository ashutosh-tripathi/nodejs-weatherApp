const request =require('request')


const geocode=(address, callback)=>{

    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=sk.eyJ1Ijoic3RldmVpc3RoZWRhZGR5IiwiYSI6ImNrZTJjeDdmZjA4OHAydHA2cDJieXd6aHUifQ.j_6PIPP19JxJOWm-tQkToQ&limit=1"
    request({url,json:true},(error,response,body)=>{
        // console.log(body)
        // console.log(body.features[0].center)
        if(error)
        callback(error)
        else
        {
        const lattitude=body.features[0].center[0]
        const longitude=body.features[0].center[1]
        const data={lattitude,longitude}
        
        // console.log(data)
        callback(null,data)
        }
        
    })
    }

module.exports={geocode}    