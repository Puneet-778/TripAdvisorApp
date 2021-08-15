import axios from 'axios';

const URL='https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';


  
export const getPlacesData = async(type, bounds) => {
    try{
        // successfull request

        const options = {
            params: {
            //   get these from current map as the map changes these should change to fetch data
            //   in that range i.e, from (bottom left - top right) 
            //   bottom left latitue
            //   bottom left longitude
            //   top right latitude
            //   top right longitude
        
              bl_latitude: bounds.sw.lat,
              tr_latitude: bounds.ne.lat,
              bl_longitude: bounds.sw.lng,
              tr_longitude: bounds.ne.lng,

              // bl_latitude: '11.847676',
              // tr_latitude: '12.838442',
              // bl_longitude: '109.095887',
              // tr_longitude: '109.149359',
            },
            headers: {
              'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_API_KEY,
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
        };
       
        const response = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, options);
        // ES6 destructuring-->alternate
        // const {data:{data}} = await axios.get(URL, options);

        // console.log(response);
        return response.data.data;
    }catch(e){
        // request failed
        console.log(e);
    }
}
export const getWeatherData = async(lat, lng)=>{
  try{
    let options={
      params: {
        lon: lat,
        // type: 'link, accurate',
        lat: lng,
        // units: 'imperial, metric'
      },
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_API_KEY,
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
      }
    }
    const response = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', options);
    console.log(response);
    return response.data;

  }catch(e){

  }
}


