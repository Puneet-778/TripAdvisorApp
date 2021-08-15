import React from 'react'
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating'

import useStyles from './styles'
import mapStyles from './mapStyles';

const Map = ({setCordinates, setBounds, cordinates, places})=>{

    //----------initial testing purpose--------------
    // const defaultProps = {
    //     center: {
    //       lat: 20.5937,
    //       lng: 78.96
    //     },
    //     zoom: 11
    // };
    // const coordinates = {lat : 0, lng : 0};
    // console.log(weatherData);
    const classes = useStyles();

    const isDesktop = useMediaQuery('(min-width:600px)');
    // true--> if width is less than 600px
    // false--> width of device is larger than 600px
    
    return(
        <div className={classes.mapContainer}>
        <GoogleMapReact
            bootstrapURLKeys = {{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
            defaultCenter = {{lat : 0, lng : 0}}
            center = {cordinates}
            defaultZoom = {14}
            margin = {[50, 50, 50, 50]}
            options = {{disableDefaultUI:true, zoomControl:true, styles : mapStyles}}

            //when the map changes coordinates changes bounds(bottom left to top right on map) also changes
            onChange = {(e)=>{
                // console.log(e);
                setCordinates({lat:e.center.lat, lng:e.center.lng});
                setBounds({ne:e.marginBounds.ne, nw:e.marginBounds.nw, se:e.marginBounds.se, sw:e.marginBounds.sw})

            }}  

            // onChildClick = {''} //when we click on a restaurant on map
        >
         {/* displaying places on map */}
            {places?.map((place,idx)=>{
                return(
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={idx}
                    >
                      {!isDesktop ? <LocationOnOutlinedIcon color="primary" fontSize="large"/>:
                                   <Paper elevation={3} className={classes.paper}>
                                       <Typography className={classes.Typography} variant="subtitle2">{place.name}</Typography>
                                       <img
                                           className={classes.pointer}
                                           src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                           alt={place.name}
                                       />
                                       <Rating size="small" value={Number(place.rating)} readOnly/>

                                   </Paper>
                      }
                    </div>
                )
            })}   

              {/*Displaying weather Data */}
              {/* {weatherData?.list?.map((data, idx)=>{
                  return(<div key={idx} lat={data.coord.lat} lng={data.coord.lng}>
                            <img alt={data.weather[0].icon} height={100} src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}></img>
                        </div>
                  )
              })} */}
        </GoogleMapReact>
        </div>
    );
}

export default Map;
