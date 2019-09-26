const request = require('request')




const geocode =(address, callback)=>{
       const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZnJhb3VsIiwiYSI6ImNqenh0N3Y4aDBsdGszam80Y3lmaHpwN3IifQ.lWqQNEmctUDs2BuAcLIx4g'

    request({url, json:true},(error, {body}={})=>{
    
        // "const {body}=response" by distructuring it ,this is one way of putting it and the secound ways is that response is an object so we can {body}<= do this
    if (error){
        callback('Unable to connect to location services!', undefined)
    } else if(body.features.length === 0){
        callback('Unable to find location, Try another search',undefined)
    }else{
        callback(undefined,
            { 
            latitude:body.features[0].center[1],    
            longitude:body.features[0].center[0],
            Location:body.features[0].place_name
                
         })
    }
})
}




module.exports = geocode