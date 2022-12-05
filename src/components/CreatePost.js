import { useState } from 'react';

import styles from '../styles/home.module.css';
import { addPost } from '../api';
import { NotificationManager } from 'react-notifications';
import { useAuth, usePosts } from '../hooks';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const posts = usePosts();
  const auth = useAuth();
  
  const handleAddPostClick = async () => {
    setAddingPost(true);
  
    const response = await addPost(post);
    if (response.success) {
      setPost('');
      posts.addPostToState(response.data.post);
      NotificationManager.success('Post created successfully','Post Added',2000);
     
    } else {
      NotificationManager.error(response.message,'Failed',2000);
    }
    setAddingPost(false);
  };

  return ( auth.user &&
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? 'Adding post...' : 'Add post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
