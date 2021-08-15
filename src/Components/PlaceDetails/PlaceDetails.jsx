import React from 'react'
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

import useStyles from '../PlaceDetails/styles';

const PlaceDetails = ({place})=>{
    // console.log(props.place);
    const classes = useStyles();
    return (
        <Card elevation={3}>
            <CardMedia
                style={{height : 300}}
                image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>
                <Box display = "flex" justifyContent = "space-between">
                    <Rating value={Number(place.rating)} readOnly/>
                    <Typography gutterBottom variant="subtitle1"> out of {place.num_reviews} reviews</Typography>
                </Box> 

                <Box display = "flex" justifyContent = "space-between">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
                </Box> 

                <Box display = "flex" justifyContent = "space-between">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
                </Box>

                {place?.awards?.map((award, idx)=>{
                    return(
                        <Box my={1} display="flex" justifyContent="space-between" key={idx}>
                            <img src={award.images.small} alt={award.display_name}></img>
                            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                        </Box>
                    );
                })} 

                {place?.cuisine?.map((cuisineObj, idx)=>{
                    return(<Chip key={idx} size="small" label={cuisineObj.name} className={classes.chip}></Chip>);
                })} 

                {place?.address && (
                    <Typography gutterBottom className={classes.subtitle} variant="subtitle2" color="textSecondary">
                        <LocationOnIcon/>
                        {place.address}
                    </Typography>
                )}

                {place?.phone && (
                    <Typography gutterBottom className={classes.subtitle} variant="subtitle2" color="textSecondary">
                        <PhoneIcon/>
                        {place.phone}
                    </Typography>
                )}   
                <CardActions>
                     <Button size="small" color="primary" onClick={()=>{window.open(place.web_url,'_blank')}}>
                         Trip Advisor
                     </Button>
                     <Button size="small" color="primary" onClick={()=>{window.open(place.website,'_blank')}}>
                         Website
                     </Button>
                </CardActions>      
            </CardContent>


        </Card>
    )
}

export default PlaceDetails
