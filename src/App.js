import React,{useState, useEffect} from 'react';

// importing components
import Header from './Components/Header/Header';
import List from './Components/List/List';
import Map from './Components/Map/Map';
import PlaceDetails from './Components/PlaceDetails/PlaceDetails';
import {getPlacesData} from './Components/API/index'

// material UI
import {CssBaseline, Grid} from '@material-ui/core';

function App() {

    //pass places to List component
    const[places, setPlaces] = useState([]);  // fetch places data 
    // const[weatherData, setWeatherData] = useState([]);
    const[filteredPlacesArr, setFilteredPlacesArr] = useState([]);
    const[cordinates, setCordinates] = useState({}); // set current latitute/longitude
    const[bounds, setBounds] = useState({}); // set left-bottom bound and top-right bound on map
    const[loading, setLoading] = useState(false);
    const[type, setType] = useState('hotels');
    const[rating, setRating] = useState(0);
    const [autocomplete, setAutoComplete] = useState(null);

    // runs after first render--> empty dependancy array
    useEffect(()=>{
        setLoading(true);
        navigator.geolocation.getCurrentPosition((geolocationPos)=>{
            // console.log(geolocationPos.coords);
            let lat = geolocationPos.coords.latitude;
            let lng = geolocationPos.coords.longitude;
            // console.log(lat);
            // console.log(lng);
            setCordinates({lat:lat, lng:lng})
        })
        setLoading(false);
    },[])


    //runs everytime type-->(hotel, restaurant, places)/cordinates/bounds changes--> fetch data according to current map
    useEffect(()=>{
           if(bounds.sw && bounds.ne){
           // console.log(cordinates, bounds);
           setLoading(true);

        //    getWeatherData(cordinates.lat, cordinates.lng).then((data)=>{
        //        setWeatherData(data);
        //    });

           getPlacesData(type, bounds).then((res)=>{
               // console.log(res);
               setFilteredPlacesArr([]);
               setPlaces(res.filter((place) => { return place.name && place.num_reviews > 0}));
               setLoading(false);
           })
        }
    },[type, bounds]);


    //runs everytime rating changes
    useEffect(()=>{
        let filteredArr = places.filter((place)=>{
            return place.rating > rating
        });
        setFilteredPlacesArr(filteredArr);
    },[rating]);

    const onLoad = (autoC)=>{
        setAutoComplete(autoC);
      }
  
      const onPlaceChanged = ()=>{
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        
        setCordinates({lat:lat, lng:lng});
    }

    return (
        <>
            <CssBaseline/>
            <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad}/>
            <Grid container spacing={3} style={{width:'100%'}}>
               <Grid item md={4} xs={12}>
                   <List type={type}
                         setType={setType}
                         rating={rating}
                         setRating={setRating}
                         places={filteredPlacesArr.length > 0? filteredPlacesArr: places}
                         loading={loading}/>
               </Grid>
               <Grid item md={8} xs={12}>
                   <Map
                       setCordinates = {setCordinates}
                       setBounds = {setBounds}
                       cordinates = {cordinates}
                       places={filteredPlacesArr.length > 0? filteredPlacesArr: places}
                    //    weatherData={weatherData}
                   />
               </Grid>
            </Grid>
        </>
    )
}

export default App
