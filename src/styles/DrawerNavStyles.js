import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 350;

const styles = makeStyles((theme) => (
  {
    root: {
      display: 'flex',
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '35ch',
      },
      height: '100%',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: 'var(--drawer-header)',
      color: 'var(--text-primary-dark)',
      boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.15)',
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    navLink: {
      textDecoration: 'none',
      color: 'var(--text-primary-dark)',
      '& .navArrow': {
        color: 'rgba(0, 0, 0, 0)',
        transition: 'all .25s',
        transitionTimingFunction: 'ease-in-out',
      },
      '&:hover .navArrow': {
        color: 'var(--text-primary-dark)',
        transform: 'translateX(35%)',
      },
    },
  }
));

export default styles;
