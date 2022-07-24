import React, {
  useEffect,
  useState,
} from 'react';
import '../../App.css';
import List from '@mui/material/List';


import PostListItem from '../../components/PostListItem';
import { Post } from '../../types';
import { getAllPosts } from '../../actions';
import { AxiosResponse } from 'axios';

const Home = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useEffect(() => {
    getAllPosts()
      .then((response: AxiosResponse<Array<Post>>) => {
        const { data: postsList } = response;
        setPosts(postsList);
      })
      .catch((err: any) => {
        alert(JSON.stringify(err));
      });
  }, []);

  return (
    <div className="App">
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {
          posts.length === 0
            ? <p>No posts found.</p>
            : posts.map((post: Post) => <PostListItem key={post.id} {...post} />)
        }
      </List >
    </div>
  );
};

export default Home;
