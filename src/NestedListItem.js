import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import NoteIcon from '@material-ui/icons/Note';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedListItem(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const { setNames, updateCardSetName, subCategory } = props;
  return (
    <List>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <NoteIcon />
        </ListItemIcon>
        <ListItemText primary={subCategory} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {setNames.length && setNames.map(setName => (
            <ListItem
              key={setName.cardSetName}
              className={classes.nested}
              onClick={updateCardSetName}
              button
            >
              <ListItemIcon>
                <ArrowRightIcon />
              </ListItemIcon>
              <ListItemText primary={setName.cardSetName} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
