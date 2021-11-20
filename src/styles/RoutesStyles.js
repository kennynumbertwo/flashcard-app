import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => (
  {
    root: {
      // display: 'flex',
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '35ch',
      },
      height: '100%',
    },
  }
));

export default styles;
