const city = 'bangalore'
var axios = require('axios');

function getLatLng(city) {
   return new Promise((resolve, reject) => {
      axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=1t2s9XysyZmu4vVaQMIKFuUiOwalW98w&location=${city}`).then((response) => {
         let output = response.data;
      if (output){
         resolve(output)
      } else {
         reject(new Error('data not found'))
      }
      })     
   })
}

function getTemp(location) {
   return new Promise((resolve, reject) => {
      axios.get(`https://api.darksky.net/forecast/e0ae82b248901cf03cc3510a779f8063/${location.lat},${location.lng}`).then((response)=> {
         let result = response.data.currently.temperature;
         if (result) {
            resolve(result)
         } else {
            reject(new Error('record not found'))
         }
      })    
   })
}

getLatLng('bangalore').then((data) => {
   console.log(data.results[0].locations[0].latLng)
   return getTemp(data.results[0].locations[0].displayLatLng)
})
.then((temperature) => {
   console.log((temperature - 32)*(5/9))
})
.catch((err) => {
   console.log(err)
})