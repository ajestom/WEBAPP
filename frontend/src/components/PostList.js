import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Card key={post.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {post.message}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
