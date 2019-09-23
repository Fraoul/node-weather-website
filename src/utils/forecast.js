const request = require('request')




const forecast =(latitude,longitude, callback)=>{

    const url = "https://api.darksky.net/forecast/ee943a6b5ba5ea7d428d1826c5e6057e/" + encodeURIComponent(latitude) +","+ encodeURIComponent(longitude)  

    request({url, json:true},(error, Response)=>{

      const {body}=Response      
        if(error){
           callback('Unable to connect to location services!', undefined)
        }else if (body.code === 400){
            callback('Unable to find location try again with diffrent search',undefined)
        }else { callback(undefined ,body.daily.data[0].summary + 'It is currently '+ body.currently.temperature + ' degrees out. There is a '+ body.currently.precipProbability + '% chance of rain')
         
        
        }
        



    })

}








module.exports = forecast