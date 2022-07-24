import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import '../../App.css';

import { Post, UpdatePostResponse } from '../../types';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { deletePost, getPostDetails, putUpdatePost } from '../../actions';
import { AxiosResponse } from 'axios';
import { CreatePostParams } from '../../types';

const formDefault: Post = {
  id: 0,
  userId: 0,
  body: '',
  title: '',
};

const App = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState<Post>(formDefault);
  const [loading, setLoading] = useState<boolean>(false);

  const { postId } = useParams<Record<string, string | undefined>>();

  useEffect(() => {
    if (postId) {
      getPostDetails(parseInt(postId))
        .then((response: AxiosResponse<Post>) => {
          const { data: postDetails } = response;
          setPost(postDetails);
        })
        .catch((err: any) => {
          alert(JSON.stringify(err));
          setPost({
            id: 0,
            userId: 0,
            title: 'No post details found.',
            body: '',
          });
        });
    }
  }, [postId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleUpdate = (event: FormEvent) => {
    setLoading(true);
    event.preventDefault();
    putUpdatePost(parseInt(postId!), post)
      .then((response: AxiosResponse<UpdatePostResponse>) => {
        const { data } = response;
        alert(`Post with id ${data.id} updated!`);
      })
      .catch((err: any) => {
        alert(JSON.stringify(err));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (event: FormEvent) => {
    setLoading(true);
    event.preventDefault();
    deletePost(parseInt(postId!))
      .then((response: AxiosResponse<{}>) => {
        const { data } = response;
        navigate('/');
        alert(`Post with id ${postId} deleted!`);
      })
      .catch((err: any) => {
        alert(JSON.stringify(err));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      {
        post.id === 0
          ? (
            <Typography variant="caption" component="div" gutterBottom>
              Loading post details...
            </Typography>
          )
          : (
            <form>
              <Box
                sx={{
                  padding: 4,
                }}
              >
                <TextField
                  sx={{ width: '100%' }}
                  id="title"
                  name="title"
                  label="Title"
                  variant="outlined"
                  onChange={handleInputChange}
                  value={post.title}
                />
                <TextField
                  sx={{ width: '100%' }}
                  margin='dense'
                  label="Description"
                  id="body"
                  name="body"
                  multiline
                  variant="outlined"
                  rows={4}
                  value={post.body}
                  onChange={handleInputChange}
                />
                <ButtonGroup
                  sx={{
                    marginTop: 4,
                  }}
                  variant="contained"
                  aria-label="outlined primary button group"
                >
                  {
                    loading && <CircularProgress />
                  }
                  <Button onClick={handleUpdate}>Update</Button>
                  <Button onClick={handleDelete} color='error'>Delete</Button>
                </ButtonGroup>
              </Box>
            </form>
          )
      }
    </div>
  );
};

export default App;
