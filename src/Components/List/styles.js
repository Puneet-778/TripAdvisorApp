import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      marginBottom:'30px',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    container:{
        // marginTop:'1rem',
        // display:'flex',
        // flexDirection:'column',
        padding:'25px',
    },
    list:{
        height:'70vh',
        overflow:'auto'
    },
    loading: {
       height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
    },

  }));
  
export default useStyles;

// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1), minWidth: 120, marginBottom: '30px',
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
//   loading: {
//     height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
//   },
//   container: {
//     padding: '25px',
//   },
//   marginBottom: {
//     marginBottom: '30px',
//   },
//   list: {
//     height: '75vh', overflow: 'auto',
//   },
// }));

// export default useStyles;