import React, { ChangeEvent, FormEvent, useState } from 'react';
import logo from '../../logo.svg';
import '../../App.css';

import Header from '../../components/Header';
import { CreatePostParams, Post } from '../../types';
import {
  useNavigate,
} from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  TextField
} from '@mui/material';
import { postCreatePost } from '../../actions';
import { response } from 'express';
import { AxiosResponse } from 'axios';

const postFormDefault: CreatePostParams = {
  userId: 0,
  body: '',
  title: '',
};

const CreatePost = () => {
  const navigate = useNavigate();
  const [postForm, setPostForm] = useState<CreatePostParams>(postFormDefault);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPostForm({
      ...postForm,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    setLoading(true);
    event.preventDefault();
    postForm.userId = 1;
    postCreatePost(postForm)
      .then((response: AxiosResponse<Post>) => {
        const { data } = response;
        navigate('/');
        alert(`Post created with id ${data.id}!`);
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
            variant="filled"
            onChange={handleInputChange}
            value={postForm.title}
          />
          <TextField
            sx={{ width: '100%' }}
            margin='dense'
            label="Description"
            id="body"
            name="body"
            multiline
            variant="filled"
            rows={4}
            value={postForm.body}
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
            <Button disabled={loading} color='success' onClick={handleSubmit}>Save</Button>
          </ButtonGroup>
        </Box>
      </form>
    </div>
  );
};

export default CreatePost;
