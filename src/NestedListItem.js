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
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  nestedLink: {
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.8)',
  },
}));

export default function NestedListItem(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const { setNames, updateCardSetName, subCategory, subCategoryId } = props;
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
            <Link
              className={classes.nestedLink}
              to={`/my-collections/${subCategoryId}/${setName.cardSetId}`}
              key={setName.cardSetId}
            >
              <ListItem
                key={setName.cardSetName}
                className={classes.nested}
                onClick={() => updateCardSetName(setName.cardSetName)}
                button
              >
                <ListItemIcon>
                  <ArrowRightIcon />
                </ListItemIcon>
                <ListItemText primary={setName.cardSetName} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
