import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {
  Link,
} from "react-router-dom";

interface PostListItemProps {
  title: string;
  body: string;
  id: number;
};

const PostListItem = (props: PostListItemProps) => {
  return (
    <>
      <ListItem
        alignItems="flex-start"
        component={Link}
        to={`post/${props.id}`}
      >
        <ListItemText
          primary={props.title}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.secondary"
              >
                {props.body}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider component="li" />
    </>
  );
};

export default PostListItem;
