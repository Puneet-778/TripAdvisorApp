import {React, useState} from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import useStyles from './styles';
import PlaceDetails from '../PlaceDetails/PlaceDetails'

const List = ({places, type, rating, setType, setRating, loading})=>{
    // const [type, setType] = useState('hotels');
    // const [rating, setRating] = useState(0);


    // sample data to pass
    // const places = [
    //   { name: "Cool Place" },
    //   { name: "Best Beer" },
    //   { name: "Best Coke" },
    //   { name: "Cool Place" },
    //   { name: "Best Beer" },
    //   { name: "Best Coke" },
    //   { name: "Cool Place" },
    //   { name: "Best Beer" },
    //   { name: "Best Coke" },
    // ];

    const classes = useStyles();

    // selecting what to search for
    const handleType = (e)=>{
        setType(e.target.value);
    }

    // selecting on basis of rating 
    const handleRating = (e)=>{
        setRating(e.target.value);
    }

    return (
      <div className={classes.container}>
        <Typography variant="h6">
          Hotels/Restaurants/Places around you
        </Typography>

        {loading ? <div className={classes.loading}>
          <CircularProgress size="5rem"/>
        </div> : <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={handleType}>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="attractions">Places</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel>Ratings</InputLabel>
            <Select value={rating} onChange={handleRating}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>

          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, idx)=>{
                return(
                    <Grid item key={idx} xs={12}>
                        <PlaceDetails place={place}/>
                    </Grid>
                );
            })}
          </Grid>
        </>
        }

        

      </div>
    );
}

export default List;