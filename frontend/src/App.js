import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, CircularProgress } from '@mui/material';
import Header from './components/Header';
import PostList from './components/PostList';
/* eslint-disable no-unused-vars */

const API_URL =  'http://127.0.0.1:5000/posts'; // replace with your backend API URL

const App = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreatePost = () => {
    const data = {
      name,
      message,
    };

    axios
      .post(API_URL, data)
      .then((response) => {
        setPosts([response.data, ...posts]);
        setName('');
        setMessage('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchPosts = (searchQuery) => {
    setIsLoading(true);

    axios
      .get(`${API_URL}/search?q=${searchQuery}`)
      .then((response) => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(API_URL)
      .then((response) => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Header
        onCreatePost={handleCreatePost}
        onSearchPosts={handleSearchPosts}
        isLoading={isLoading}
        name={name}
        setName={setName}
        message={message}
        setMessage={setMessage}
      />
      <Container sx={{ py: 4 }}>
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <Typography variant="h6" align="center">
            No posts to show. Why not create one?
          </Typography>
        )}
       
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <CircularProgress size={50} />
          </div>
        )}
      </Container>
    </div>
  );
};

export default App;
