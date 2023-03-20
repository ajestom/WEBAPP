import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, Button, CircularProgress } from '@mui/material';

const Header = ({ onCreatePost, onSearchPosts, isLoading }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleNameChange = (event) => setName(event.target.value);
  const handleMessageChange = (event) => setMessage(event.target.value);
  const handleSearchChange = (event) => setSearchQuery(event.target.value);

  const handleCreatePost = () => {
    onCreatePost({ name, message });
    setName('');
    setMessage('');
  };

  const handleSearchPosts = () => {
    onSearchPosts(searchQuery);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Blog
        </Typography>
        <TextField
          label="Search posts"
          variant="outlined"
          size="small"
          onChange={handleSearchChange}
          value={searchQuery}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchPosts}
          disabled={isLoading}
          sx={{ ml: 1 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Search'}
        </Button>
        <TextField
          label="Your name"
          variant="outlined"
          size="small"
          onChange={handleNameChange}
          value={name}
          sx={{ ml: 1 }}
        />
        <TextField
          label="Message"
          variant="outlined"
          size="small"
          onChange={handleMessageChange}
          value={message}
          sx={{ ml: 1 }}
        />
        <Button variant="contained" onClick={handleCreatePost} sx={{ ml: 1 }}>
          Create Post
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
